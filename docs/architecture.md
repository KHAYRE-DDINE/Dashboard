# Al Taalim (التعليم) — Target Architecture & System Design

## 1. System Topology Overview

Al Taalim is engineered as a modern, maintainable modular monolith designed for cost-effective, high-reliability deployment on a single Linux VPS (Ubuntu 22.04/24.04 LTS).

```mermaid
flowchart TD
    subgraph Client ["Client Devices (Browser / Mobile Web)"]
        User["Learners & Instructors"]
    end

    subgraph Host ["Linux VPS (Docker Engine)"]
        subgraph WebLayer ["Edge & Web Server (Reverse Proxy)"]
            Nginx["Nginx 1.27 (Reverse Proxy & SPA Static Host)"]
        end

        subgraph AppLayer ["Application Layer"]
            SpringBoot["Al Taalim Backend (Spring Boot 3.3.5 / Java 21)"]
        end

        subgraph StorageLayer ["Persistence & Storage Layer"]
            Postgres[("PostgreSQL 16 Engine")]
            VolData[("Named Volume: altaalim_postgres_data")]
        end
    end

    User -->|HTTPS :443 / HTTP :80| Nginx
    Nginx -->|Static Assets /*| Nginx
    Nginx -->|REST API Proxy /api/v1/*| SpringBoot
    Nginx -->|Health Checks /actuator/*| SpringBoot
    SpringBoot -->|JDBC Connection Pool (HikariCP)| Postgres
    Postgres --- VolData
```

---

## 2. Component Breakdown

### 2.1 Frontend (`frontend/`)
- **Technology**: React 18, React Router v6, Tailwind CSS, Framer Motion, Recharts, React Big Calendar, Axios.
- **Role**: Single Page Application (SPA) offering interactive student dashboard, course catalogs, video lessons, dynamic assignment trackers, interactive discussion comments, digital library, and real-time styled notifications.
- **Packaging**: Multi-stage Docker build producing an optimized static asset bundle served via Nginx with client-side SPA routing (`try_files $uri $uri/ /index.html;`) and gzip compression.

### 2.2 Backend (`backend/`)
- **Technology**: Java 21 LTS, Spring Boot 3.3.5, Spring Security 6, Spring Data JPA, Hibernate, Flyway Migration, JJWT 0.12.6, OpenPDF 1.3.40, Springdoc OpenAPI 2.6.0.
- **Packaging**: Multi-stage Docker build packaging a slim standalone JAR running on `eclipse-temurin:21-jre-alpine` under a restricted non-root user (`altaalim`).
- **Endpoints**: Unified RESTful API prefixed with `/api/v1/` and backwards-compatible route mappings.

### 2.3 Database (`postgres`)
- **Technology**: PostgreSQL 16 Alpine.
- **Migration & Schema Management**: Managed strictly through Flyway (`V1__init_schema.sql`, `V2__seed_initial_data.sql`).
- **Persistence**: Relational ACID storage backed by a Docker named volume (`altaalim_postgres_data`) isolated on internal network bridge.

---

## 3. Modular Package Organization

The backend is organized into bounded feature modules under `dashboard.*`:

```
backend/src/main/java/dashboard/
├── auth/            # JWT authentication, login, registration, token refresh
├── user/            # User profile, role-based access, appearance/settings
├── course/          # Courses, lessons, enrollments, completions, PDF certificates
├── classroom/       # Classes, join codes, memberships, room schedules
├── assignment/      # Assignments, submissions, resources, discussion comments
├── calendar/        # Student academic calendar, schedules, event filters
├── dashboard/       # Aggregated dashboard metrics, weekly study charts
├── library/         # Digital textbooks, reading materials, table of contents
├── message/         # Direct messaging, conversations, participant channels
├── notification/   # User alerts, grade notifications, system achievements
├── search/          # Global search across courses, assignments, library
├── config/          # Spring Security, JWT filter, CORS, OpenAPI documentation
└── common/          # Global exception handlers, API responses, base DTOs
```

---

## 4. Security & Network Model

1. **Stateless Authentication**: All client sessions authenticate via HMAC-SHA256 JWT tokens. No server-side session stickiness is required, enabling zero-downtime container updates.
2. **Network Segregation**: 
   - `altaalim-internal` network has `internal: true`. The PostgreSQL database port is never exposed directly to the public internet.
   - `altaalim-web` network connects the reverse proxy to the backend container.
3. **Transport Encryption**: All client traffic terminates with TLS 1.3 via Let's Encrypt certificates managed automatically or via Certbot.
4. **Credential Isolation**: All secrets (database credentials, JWT keys) are injected solely via environment variables or Docker secret files at runtime; never hardcoded in source control.
