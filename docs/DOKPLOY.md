# Dokploy beta and production

Both environments use independent services, credentials, database volumes and application settings. Application source is intentionally unconnected: connect GitHub in Dokploy, select the repository and branch, then deploy. Autodeploy is off so an unverified push does not release production.

The environment variables already provisioned in Dokploy include database connections and generated application secrets. Keep those values. Set only the blank external integration settings you need. Never put runtime secrets in GitHub source files or Docker build arguments.

Choose `/` as the GitHub Build Path. Dockerfile paths below are relative to the repository root; Docker Context Path is the service directory. Deploy database services before backend applications, and deploy frontends after their backends are healthy. Build one application at a time on this VPS.

Organization: **Personal Projects**. Project: **Dashboard**. Environments: `beta`, `production`.

| Service | Dockerfile | Docker context | Internal port |
| --- | --- | --- | --- |
| Backend | `backend/Dockerfile.dokploy` | `backend` | 8080 |
| Frontend | `frontend/Dockerfile.dokploy` | `frontend` | 80 |
| Database | PostgreSQL 16.13 image | — | 5432 |

Each frontend uses its own Dokploy-generated URL. `BACKEND_URL` on the frontend points to that environment's private backend service. The Nginx template proxies `/api/` and preserves the original HTTPS forwarding header. Database credentials, JWT signing secret and uploads volume are independent between environments. The backend mounts persistent storage at `/app/uploads`.

Fill the SMTP variables in each backend if sending email. HTTPS origins and private database addresses are populated by the setup. PostgreSQL schema migrations run on startup with the migration owner; runtime database queries use a restricted login. Keep both credential pairs as configured.
