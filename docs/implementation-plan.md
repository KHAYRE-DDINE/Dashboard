# 📋 Al Taalim (التعليم) — Production Implementation Plan & Audit

**Project:** Al Taalim (formerly Al Rihla Academy / Interactive Student Dashboard)  
**Target Environment:** Dockerized Linux VPS (Ubuntu LTS) with PostgreSQL & Caddy/Nginx Reverse Proxy  
**Branch:** `feature/complete-al-taalim-production`  
**Date:** October 31, 2026  

---

## 1. Executive Summary & Audit Classification

| Module / Component | Current State | Target State | Priority |
| :--- | :--- | :--- | :---: |
| **Branding & UI Identity** | Named "Al Rihla Academy"; fragmented logos. | Rebranded to **Al Taalim (التعليم)** across all views, metadata, and certificates. | **P1** |
| **Backend Core** | Skeleton Java classes; non-existent Spring Boot 4.1.0 in `pom.xml`; MySQL placeholder; stubs for controllers/services. | Spring Boot 3.3.5 / Java 21 LTS modular monolith with Spring Web, Security, Data JPA, Actuator, Flyway. | **P0** |
| **Database & Persistence** | Static `db.json` with JSON Server; client-side plain password checks; untracked MySQL url. | Production PostgreSQL 16 database, Flyway automated versioned migrations, relational schema, seed fixtures. | **P0** |
| **Authentication & AuthZ** | `localStorage` plain-text password match; dead OAuth links; missing OTP backend; broken forgot-password. | Spring Security with stateless JWT (or secure cookies), BCrypt password hashing, role-based access control (STUDENT, INSTRUCTOR, ADMIN). | **P0** |
| **Courses & Player** | Hardcoded client course catalog with JSON Server fallback; `.txt` fake certificate download. | Complete Course catalog, Lesson playlist, completion tracking, real PDF certificate generation & download. | **P1** |
| **Assignments** | Works with local JSON server; `/comments` and `/resources` endpoints missing from `db.json`. | PostgreSQL-backed Assignments, submissions, file attachments, and discussions. | **P1** |
| **Classes** | Navigation commented out; `teacher` vs `instructor` property mismatch; mock join code. | Restored navigation, unified teacher model, real class join codes with server validation, student enrollment. | **P1** |
| **Calendar** | `react-big-calendar` restricted to `eventMoment.year() === 2026`. | Full multi-year support, user event persistence, assignment deadline overlays. | **P2** |
| **Analytics & KPIs** | 100% hardcoded static numbers. | Real backend SQL aggregation computing active courses, study hours, completion rates, and weekly progress. | **P2** |
| **Digital Library** | Mock PDF download simulation. | Real file downloads, upload metadata, category filtering, search. | **P2** |
| **Messaging & Notifications** | Hardcoded contacts; all messages forced into Contact 1; no real-time delivery. | Real conversation/message entities, user association, unread count, WebSocket/REST integration. | **P2** |
| **Settings & Account** | Base64 avatar saved in JSON; client-side toggles. | Profile editing, secure avatar upload, password changes with current password verification, account deletion. | **P2** |
| **Docker & VPS Readiness** | Incomplete `docker-compose.yml`; outdated `backend/Dockerfile`. | Multi-stage Dockerfiles (Frontend + Backend), production `compose.prod.yaml`, reverse proxy with HTTPS, health checks, automated backups. | **P0** |
| **Testing & CI/CD** | 0 test files (`npm test` exits 1); 0 backend tests. | JUnit 5 + MockMvc backend test suite, React Testing Library frontend tests, GitHub Actions CI workflow. | **P1** |

---

## 2. Implementation Roadmap & Milestones

### Phase 1: Rebranding & Baseline Cleanliness
1. Rebrand user-facing text, page titles, headers, manifests, emails, and documentation from "Al Rihla Academy" to **Al Taalim (التعليم)**.
2. Clean up dead links and clarify terms/privacy draft pages.

### Phase 2: Production Backend & Database Architecture
1. Fix `backend/pom.xml`: Set Spring Boot `3.3.5`, Java `21`, PostgreSQL driver, Flyway, JJWT `0.12.6`, Springdoc OpenAPI, Actuator, Spring Boot Starter Validation.
2. Implement relational domain entities in `dashboard.*`:
   - `User`, `UserRole`, `UserPreferences`
   - `Course`, `Lesson`, `Enrollment`, `Certificate`
   - `Assignment`, `Submission`, `AssignmentResource`, `Comment`
   - `Classroom`, `ClassMembership`
   - `CalendarEvent`
   - `LibraryItem`
   - `Conversation`, `Message`
   - `Notification`
3. Create Flyway migrations (`V1__init_schema.sql`, `V2__seed_initial_data.sql`).
4. Implement Spring Security:
   - JWT utility & Filter (`JwtService`, `JwtAuthenticationFilter`)
   - BCrypt password encoder
   - `AuthController` & `AuthService` (`/api/v1/auth/login`, `/api/v1/auth/register`, `/api/v1/auth/me`)
   - Role-based authorization & Resource ownership checks.

### Phase 3: Module APIs & Frontend Integration
1. Implement controllers, services, repositories, and DTOs:
   - `/api/v1/courses/**` (Catalog, Enrollment, Lesson Completion, PDF Certificate)
   - `/api/v1/assignments/**` (CRUD, status toggle, comments, resources)
   - `/api/v1/classes/**` (Listing, join by code, class members)
   - `/api/v1/calendar/**` (Events CRUD, multi-year)
   - `/api/v1/analytics/**` (Real aggregated dashboard stats & chart datasets)
   - `/api/v1/library/**` (Books, real file download/preview)
   - `/api/v1/messages/**` (Conversations, message history, message sending)
   - `/api/v1/notifications/**` (User-specific notifications, mark read)
   - `/api/v1/users/**` & `/api/v1/settings/**` (Profile update, avatar, password update, delete)
2. Update frontend Axios client ([`axios.jsx`](file:///c:/Users/Khayreddine/Desktop/Personal%20Projects/Dashboard/frontend/src/Components/api/axios.jsx)) to communicate with `/api/v1` using JWT bearer tokens and environment-based baseURL.
3. Replace JSON-server dependencies and mock fallbacks across React components.

### Phase 4: Dockerization & VPS Deployment
1. Write multi-stage `backend/Dockerfile` with Maven build and lightweight JRE 21 runtime.
2. Write multi-stage `frontend/Dockerfile` with Nginx production server and SPA routing fallback.
3. Write production `compose.prod.yaml` connecting:
   - `reverse-proxy` (Nginx/Caddy with TLS and security headers)
   - `al-taalim-frontend`
   - `al-taalim-backend`
   - `al-taalim-db` (PostgreSQL 16 with persistent volume)
4. Add `.env.example`, database backup script (`scripts/backup-db.sh`), and restore guide.

### Phase 5: Automated Testing & Verification
1. Backend Unit & Integration Tests (Spring Boot Test, MockMvc, JPA repository tests).
2. Frontend automated component tests (Authentication, Navigation, Forms).
3. Docker build and compose smoke test verification.
4. Comprehensive deployment and operational documentation.
