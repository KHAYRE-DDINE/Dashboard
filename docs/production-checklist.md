# Al Taalim (التعليم) — Production Launch Readiness Checklist

Use this checklist before and immediately following deployment to your Linux VPS.

---

## 1. Pre-Deployment Configuration
- [ ] Working branch `feature/complete-al-taalim-production` reviewed and approved.
- [ ] Root `.env` created from `.env.example`.
- [ ] High-entropy passwords generated for PostgreSQL (`DB_PASSWORD`).
- [ ] High-entropy 256-bit secret generated for JWT (`JWT_SECRET`).
- [ ] `APP_URL` configured to the actual production domain (e.g. `https://altaalim.edu`).
- [ ] `CORS_ALLOWED_ORIGINS` locked to approved domains.
- [ ] Firewall (UFW) active on host: ports 22, 80, 443 open; port 5432 closed.

---

## 2. Infrastructure & Containers
- [ ] Docker Engine and Docker Compose Plugin installed and active.
- [ ] `docker compose -f compose.prod.yaml build` completes without errors.
- [ ] Containers started: `docker compose -f compose.prod.yaml up -d`.
- [ ] All 3 containers report `healthy` in `docker compose -f compose.prod.yaml ps`.
- [ ] Flyway migrations executed successfully: `V1__init_schema.sql` and `V2__seed_initial_data.sql`.
- [ ] PostgreSQL volume `altaalim_postgres_data` mapped to persistent storage.

---

## 3. Functionality & Smoke Verification
- [ ] Landing page loads at root URL.
- [ ] Login succeeds with seeded student (`ahrarkhirdin@gmail.com` / `123456`).
- [ ] Navigation sidebar displays: Home, Courses, Assignments, Classes, Analytics, Calendar, Messages, Library, Account.
- [ ] Course catalog displays seeded courses with accurate progress metrics.
- [ ] Course certificate PDF downloads and renders correctly.
- [ ] Classes page allows joining a classroom with join code (`ARAB10`).
- [ ] Assignment submission functions and discussion comments persist.
- [ ] Digital library books load and display table of contents.
- [ ] Dark/Light mode toggle persists in user preferences across page refreshes.
- [ ] Terms and Privacy Policy pages load properly without 404s.

---

## 4. Security & Disaster Recovery
- [ ] HTTPS / TLS active with valid certificate and auto-renewal.
- [ ] Database backup cron script (`backup-db.sh`) tested and verified.
- [ ] Actuator endpoints verified: only `/actuator/health` and `/actuator/info` accessible.
- [ ] No plaintext secrets present in git history or client-side JavaScript bundles.
