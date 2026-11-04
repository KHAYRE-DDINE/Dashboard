# Al Taalim (التعليم) — Database Backup & Disaster Recovery Guide

---

## 1. Automated PostgreSQL Backup Script

Create a backup script at `/opt/altaalim/scripts/backup-db.sh`:

```bash
#!/usr/bin/env bash
set -eo pipefail

BACKUP_DIR="/var/backups/altaalim"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/altaalim_db_${TIMESTAMP}.sql.gz"
CONTAINER_NAME="altaalim-postgres-prod"

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting Al Taalim PostgreSQL database backup..."

# Execute compressed pg_dump directly from container
docker exec -t "${CONTAINER_NAME}" pg_dump -U "${DB_USER:-altaalim_admin}" -d "${DB_NAME:-al_taalim}" \
  --clean --if-exists --no-owner --no-privileges | gzip -9 > "${BACKUP_FILE}"

# Verify file was created and is non-empty
if [ -s "${BACKUP_FILE}" ]; then
  FILE_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
  echo "[$(date)] Backup completed successfully: ${BACKUP_FILE} (${FILE_SIZE})"
else
  echo "[$(date)] ERROR: Backup file is empty or missing!" >&2
  exit 1
fi

# Retention policy: Delete local backups older than 14 days
find "${BACKUP_DIR}" -type f -name "altaalim_db_*.sql.gz" -mtime +14 -delete
echo "[$(date)] Retention cleanup completed."
```

Make executable:
```bash
chmod +x /opt/altaalim/scripts/backup-db.sh
```

---

## 2. Scheduling Daily Backups (Cron)

Edit server root crontab:
```bash
crontab -e
```
Add entry to run backup every day at 02:00 AM UTC:
```cron
0 2 * * * /opt/altaalim/scripts/backup-db.sh >> /var/log/altaalim_backup.log 2>&1
```

---

## 3. Database Restoration Procedure

To restore from a backup file (e.g. disaster recovery, test restore):

```bash
# 1. Stop backend container to avoid active writes during restore
docker compose -f /opt/altaalim/compose.prod.yaml stop backend

# 2. Extract and pipe SQL dump into postgres container
gunzip -c /var/backups/altaalim/altaalim_db_YYYYMMDD_HHMMSS.sql.gz | \
  docker exec -i altaalim-postgres-prod psql -U altaalim_admin -d al_taalim

# 3. Restart backend service
docker compose -f /opt/altaalim/compose.prod.yaml start backend

# 4. Verify system health
curl -s http://localhost:8080/actuator/health
```
