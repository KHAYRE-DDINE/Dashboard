# Al Taalim (التعليم) — Linux VPS Deployment Guide

This guide covers deploying Al Taalim on a fresh Linux VPS (Ubuntu 22.04 or 24.04 LTS) from scratch.

---

## 1. System Requirements

- **Operating System**: Ubuntu 22.04 or 24.04 LTS (x86_64)
- **CPU**: 2 vCPUs minimum (4 vCPUs recommended)
- **RAM**: 4 GB minimum (8 GB recommended for concurrent video/PDF streaming)
- **Disk**: 40 GB SSD / NVMe minimum
- **Network**: Static IPv4 address and configured DNS domain (e.g. `altaalim.edu`)

---

## 2. Server Preparation & Hardening

Log into your server via SSH:
```bash
ssh root@YOUR_SERVER_IP
```

### 2.1 Update System Packages
```bash
apt update && apt upgrade -y
apt install -y curl wget git ufw htop fail2ban unzip
```

### 2.2 Configure Firewall (UFW)
Allow SSH, HTTP, and HTTPS:
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status
```

---

## 3. Install Docker & Docker Compose Plugin

Install the official Docker Engine:
```bash
# Add Docker official GPG key
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Enable and start Docker service
systemctl enable docker
systemctl start docker
```

---

## 4. Deploying Al Taalim Application

### 4.1 Clone Repository
```bash
cd /opt
git clone https://github.com/KHAYRE-DDINE/Dashboard.git altaalim
cd /opt/altaalim
git checkout feature/complete-al-taalim-production
```

### 4.2 Configure Production Environment Variables
Copy template and customize:
```bash
cp .env.example .env
nano .env
```

Generate secure secrets:
```bash
# Generate database password
openssl rand -base64 24

# Generate 256-bit JWT secret
openssl rand -hex 32
```
Set in `.env`:
```ini
SPRING_PROFILES_ACTIVE=prod
APP_URL=https://yourdomain.com
DB_NAME=al_taalim
DB_USER=altaalim_admin
DB_PASSWORD=YOUR_GENERATED_PASSWORD
JWT_SECRET=YOUR_GENERATED_JWT_SECRET
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

### 4.3 Build and Launch Containers
```bash
docker compose -f compose.prod.yaml up -d --build
```

### 4.4 Verify Deployment Status
```bash
# Check running containers
docker compose -f compose.prod.yaml ps

# Inspect logs
docker compose -f compose.prod.yaml logs -f backend
docker compose -f compose.prod.yaml logs -f postgres
docker compose -f compose.prod.yaml logs -f frontend

# Test backend health endpoint
curl -s http://localhost:8080/actuator/health
# Expected: {"status":"UP"}
```

---

## 5. SSL / HTTPS Termination (Let's Encrypt)

To secure `https://yourdomain.com` with free Let's Encrypt SSL certificates, use Certbot:

```bash
apt install -y certbot python3-certbot-nginx
```

If using host Nginx to proxy into Docker:
```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Obtain certificate:
```bash
certbot --nginx -d yourdomain.com
```
Certbot will configure automatic renewal via cron/systemd timer.
