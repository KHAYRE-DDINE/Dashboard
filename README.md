# Al Taalim (التعليم) — Educational Platform

[![Java 21](https://img.shields.io/badge/Java-21%20LTS-orange.svg)](https://adoptium.net/)
[![Spring Boot 3.3.5](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React 18](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Al Taalim (التعليم)** is a complete, production-ready, full-stack educational dashboard and learning management platform designed for universities, schools, instructors, and independent students.

Built as a high-performance modular monolith suitable for single Linux VPS deployment or containerized clusters, Al Taalim features rich interactive course management, automated PDF certificate generation, virtual classrooms, dynamic assignment submission and discussion tracking, academic calendar scheduling, digital library access, and direct messaging.

---

## 🌟 Key Features

- **Interactive Student Dashboard**: Real-time study analytics, weekly learning curves with Recharts, upcoming assignment deadlines, and active course progress.
- **Course & Lesson Curriculum**: Full course catalog with multi-lesson video tracking, real-time completion state, and archived/completed course tabs.
- **Dynamic Certificate Engine**: Generates official, tamper-evident binary PDF certificates of completion with unique verification codes using OpenPDF.
- **Virtual Classrooms**: Join live cohorts with unique 6-character access codes (`ARAB10`, `PHYS20`, `MATH30`), member directories, and room schedules.
- **Assignments & Submissions**: Filter assignments by status (pending, completed, overdue), attach file submissions, download instructor cheat sheets, and engage in threaded discussion comments.
- **Digital Library**: Browse digital textbooks across Mathematics, Physics, Arabic Literature, and Computer Science with interactive table-of-contents readers.
- **Academic Calendar**: Month/Week/Day scheduler for exams and deadlines powered by React Big Calendar.
- **Direct Messaging**: Channel-based and direct peer-to-instructor communications with file attachment previews.
- **Security & RBAC**: Stateless HMAC-SHA256 JWT authentication, BCrypt password hashing, and role-based permissions (STUDENT, INSTRUCTOR, ADMIN).

---

## 🏗️ Architecture

```
Al Taalim (Single VPS Monolith Architecture)
├── Edge & Reverse Proxy: Nginx 1.27 Alpine (SSL termination, SPA routing, gzip, caching)
├── Backend API: Spring Boot 3.3.5 + Java 21 LTS (Modular monolith, RESTful API on /api/v1)
├── Frontend UI: React 18, Tailwind CSS, Framer Motion, Recharts, React Big Calendar
└── Persistence: PostgreSQL 16 Alpine with Flyway database migration
```

---

## 🚀 Quick Start (Development with Docker)

### Prerequisites
- [Docker Engine & Docker Compose Plugin](https://docs.docker.com/engine/install/)

### 1. Clone & Configure
```bash
git clone https://github.com/KHAYRE-DDINE/Dashboard.git
cd Dashboard
git checkout feature/complete-al-taalim-production
cp .env.example .env
```

### 2. Start Services
```bash
docker compose up -d --build
```

### 3. Access Application
- **Frontend Web UI**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
- **OpenAPI / Swagger UI**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **Actuator Health Check**: [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)

### Demo Student Credentials
- **Email**: `ahrarkhirdin@gmail.com`
- **Password**: `123456`

---

## 🚢 Production VPS Deployment

For step-by-step instructions on deploying Al Taalim on a fresh Ubuntu VPS with Let's Encrypt SSL and automated backups, refer to our comprehensive documentation:

- 📘 [Linux VPS Deployment Guide](docs/deployment-vps.md)
- 🗄️ [Database Schema & Flyway Migrations](docs/database.md)
- 📡 [REST API Documentation](docs/api.md)
- 🔐 [Security & Hardening Architecture](docs/security.md)
- 💾 [Backup & Disaster Recovery Procedures](docs/backup-restore.md)
- ✅ [Production Launch Readiness Checklist](docs/production-checklist.md)

---

## 🧪 Testing

### Frontend Automated Tests (Jest & React Testing Library)
```bash
cd frontend
npm test -- --watchAll=false
```

### Backend Automated Tests (JUnit 5 & Mockito)
```bash
cd backend
./mvnw test
# Or inside Docker:
docker run --rm -v "${PWD}/backend:/app" -w /app maven:3.9-eclipse-temurin-21 mvn test
```

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
