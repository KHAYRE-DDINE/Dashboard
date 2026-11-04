# Al Taalim (التعليم) — Security Architecture & Hardening Guide

---

## 1. Authentication & Session Management

- **Protocol**: Stateless JSON Web Tokens (JWT) signed via HMAC-SHA256 (`HS256`).
- **Token Validity**: Defaults to 24 hours (`86,400,000 ms`). Expiration is verified per request by `JwtAuthenticationFilter`.
- **Credential Storage**: Passwords are never stored in plaintext. They are salted and hashed using BCrypt (`BCryptPasswordEncoder`, strength 10).
- **Brute-Force Protection**: Handled via Nginx rate limiting (`limit_req_zone`) and Fail2ban on host.

---

## 2. Authorization & RBAC

- **Roles**:
  - `STUDENT`: Can view enrolled courses, submit assignments, post discussion comments, access library, manage personal profile.
  - `INSTRUCTOR`: Can create courses, publish assignments, grade student submissions, manage classrooms.
  - `ADMIN`: Global administration, system oversight, user suspension.
- **Enforcement**: Defined declaratively via Spring Security filter chains and `@PreAuthorize` method annotations.

---

## 3. Web Application Security Controls

### 3.1 SQL Injection Prevention
All database queries are executed via Spring Data JPA and Hibernate parameterized queries. No raw dynamic string concatenation is used in queries.

### 3.2 Cross-Origin Resource Sharing (CORS)
Restricted via `CorsConfig.java`. In production, only origins configured in `CORS_ALLOWED_ORIGINS` are accepted. Wildcard `*` origins with credentials are explicitly prohibited.

### 3.3 CSRF Policy
Because Al Taalim utilizes stateless JWT headers (`Authorization: Bearer <token>`) rather than ambient browser session cookies, CSRF attacks are fundamentally mitigated by architecture.

### 3.4 Security Response Headers
Injected by Nginx reverse proxy:
- `X-Frame-Options: SAMEORIGIN` (prevents clickjacking)
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## 4. Container & Infrastructure Hardening

1. **Non-Root Execution**: Backend container runs under dedicated unprivileged system user `altaalim` (UID 1000).
2. **Database Isolation**: PostgreSQL container is placed on `altaalim-internal` network (`internal: true`). The database port is inaccessible from the internet.
3. **Memory Limits**: Docker Compose production configuration enforces strict memory and CPU caps to prevent memory leaks from starving the host OS.
4. **Read-Only Actuator**: Only `/actuator/health` and `/actuator/info` are exposed publicly. Sensitive endpoints (env, beans, heapdump) are locked down.
