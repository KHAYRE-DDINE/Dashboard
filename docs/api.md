# Al Taalim (التعليم) — REST API Documentation

Base URL: `/api/v1` (or relative path on configured production domain)  
OpenAPI / Swagger UI: `http://localhost:8080/swagger-ui/index.html` or `/swagger-ui/index.html`

All responses follow a consistent structured JSON format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "timestamp": "2026-10-31T18:00:00Z"
}
```

---

## 1. Authentication Endpoints (`/api/v1/auth`)

### 1.1 Register New Account
- **Method / Path**: `POST /api/v1/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "student@altaalim.edu",
    "password": "Password123!",
    "firstName": "Fatima",
    "lastName": "Zahra",
    "phone": "+212600000000",
    "role": "STUDENT"
  }
  ```
- **Response**: `200 OK` (or `201 Created`) with access token, refresh token, and user profile object.

### 1.2 User Login
- **Method / Path**: `POST /api/v1/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "ahrarkhirdin@gmail.com",
    "password": "Password123!"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1Ni...",
    "refreshToken": "eyJhbGciOiJIUzI1Ni...",
    "tokenType": "Bearer",
    "user": {
      "id": "11111111-1111-1111-1111-111111111111",
      "email": "ahrarkhirdin@gmail.com",
      "firstName": "Khayreddine",
      "lastName": "Ahrar",
      "role": "STUDENT"
    }
  }
  ```

---

## 2. User & Profile Endpoints (`/api/v1/users`)

- `GET /api/v1/users/me` — Authenticated: returns current user details and preferences.
- `GET /api/v1/users/{id}` — Authenticated / Admin: returns user profile by UUID.
- `PATCH /api/v1/users/me` — Authenticated: updates profile attributes (name, bio, title, location, phone).
- `PATCH /api/v1/users/preferences` — Authenticated: updates dark mode, notification toggles, calendar options.
- `PUT /api/v1/users/password` — Authenticated: securely updates password with old password verification.

---

## 3. Courses & Certificates (`/api/v1/courses`)

- `GET /api/v1/courses` — Public: returns list of all active catalog courses.
- `GET /api/v1/courses/{id}` — Public: returns course details and list of lessons.
- `POST /api/v1/courses/{id}/enroll` — Authenticated: enrolls authenticated user into course.
- `POST /api/v1/courses/{id}/progress` — Authenticated: updates completion percentage (`{ "progress": 85 }`).
- `GET /api/v1/courses/{id}/certificate/download` — Authenticated: generates and returns raw binary PDF completion certificate (`application/pdf`).

---

## 4. Classes (`/api/v1/classes`)

- `GET /api/v1/classes` — Authenticated / Public: returns all classes (`?my=true` filters for student's enrolled classes).
- `GET /api/v1/classes/{id}` — Authenticated: returns class details and member count.
- `POST /api/v1/classes/join` — Authenticated: joins a class via 6-character code (`{ "joinCode": "ARAB10" }`).
- `POST /api/v1/classes` — Authenticated / Instructor: creates a new class.
- `DELETE /api/v1/classes/{id}/leave` — Authenticated: leaves an enrolled class.

---

## 5. Assignments (`/api/v1/assignments`)

- `GET /api/v1/assignments` — Authenticated / Public: returns assignments (`?status=pending|completed|overdue`).
- `GET /api/v1/assignments/{id}` — Authenticated: returns assignment with discussion comments, resources, and user submission.
- `POST /api/v1/assignments` — Authenticated / Instructor: creates a new assignment.
- `PUT /api/v1/assignments/{id}` — Authenticated / Instructor: updates assignment metadata.
- `DELETE /api/v1/assignments/{id}` — Authenticated / Instructor: deletes assignment.
- `GET /api/v1/assignments/{id}/comments` — Authenticated: returns discussion comments.
- `POST /api/v1/assignments/{id}/comments` — Authenticated: posts a comment to assignment discussion.
- `POST /api/v1/assignments/{id}/submit` — Authenticated: submits student assignment solution.

---

## 6. Digital Library (`/api/v1/library`)

- `GET /api/v1/library` — Public: lists digital textbooks with optional `?category=...` or `?query=...`.
- `GET /api/v1/library/{id}` — Public: returns book details and table of contents.
- `POST /api/v1/library/{id}/download` — Public: increments download counter.

---

## 7. Calendar Events (`/api/v1/calendar/events`)

- `GET /api/v1/calendar/events` — Authenticated: returns calendar events for user (`?from=...&to=...`).
- `POST /api/v1/calendar/events` — Authenticated: creates a new event.
- `PUT /api/v1/calendar/events/{id}` — Authenticated: updates event times/title.
- `DELETE /api/v1/calendar/events/{id}` — Authenticated: deletes calendar event.

---

## 8. Direct Messaging (`/api/v1/messages`)

- `GET /api/v1/messages` — Authenticated: retrieves messages (`?conversationId=...`).
- `GET /api/v1/messages/conversations` — Authenticated: returns user conversation channels.
- `POST /api/v1/messages` — Authenticated: sends a message (`{ "conversationId": 1, "text": "Hello" }`).

---

## 9. Notifications (`/api/v1/notifications`)

- `GET /api/v1/notifications` — Authenticated: returns unread and recent user notifications.
- `PATCH /api/v1/notifications/{id}/read` — Authenticated: marks single notification as read.
- `PATCH /api/v1/notifications/read-all` — Authenticated: marks all user notifications as read.
- `DELETE /api/v1/notifications/{id}` — Authenticated: dismisses notification.

---

## 10. Global Search (`/api/v1/search`)

- `GET /api/v1/search?q=...` — Public / Authenticated: searches across courses, assignments, classes, and library books.
