# Backend Spring Boot Maven Plan

This plan is based on the current project layout:

- `frontend/` is a React dashboard app.
- `frontend/src/Components/api/axios.jsx` points to `http://localhost:3001`.
- `frontend/server.js` runs `json-server` with `frontend/db.json`.
- Auth is currently client-side: the frontend fetches `/users`, compares plain passwords in React, and stores the user id in `localStorage`.
- The main dashboard areas are login/register, profile/settings, courses, assignments, calendar, messages, library, charts, classes, and help.
- `backend/` exists but is empty.

Official Spring reference checked: Spring Boot project page says Boot is for standalone, production-grade Spring applications and recommends Spring Initializr for bootstrapping. As of this plan date, the Spring project page shows Spring Boot `4.1.0`; use Spring Initializr's current stable Maven setup when you generate the project.

## Goal

Replace `json-server` with a real Spring Boot backend that provides:

- Secure authentication and registration.
- User profile and preferences storage.
- Calendar events.
- Course catalog and user course progress.
- Assignments and submissions.
- Messages and notifications.
- Dashboard analytics endpoints.

Start with a clean monolithic REST API. Do not split into microservices yet.

## Recommended Backend Stack

- Java: `21`
- Build: Maven
- Framework: Spring Boot, generated from Spring Initializr
- Database for development: PostgreSQL preferred, H2 acceptable only for quick experiments
- Persistence: Spring Data JPA with Hibernate
- Security: Spring Security with JWT access tokens
- Validation: Jakarta Bean Validation
- Migrations: Flyway
- API docs: springdoc-openapi
- Tests: JUnit 5, Spring Boot Test, MockMvc, Testcontainers later

## Maven Dependencies

Generate the project with these dependencies:

- Spring Web (for REST API)
- Spring Data JPA (for database persistence)
- Spring Security (for authentication and authorization)
- Validation (for bean validation)
- PostgreSQL Driver (for database connectivity)
- Flyway Migration (for database migrations)
- Lombok, optional but useful
- Spring Boot Actuator

Add manually if needed:

- `io.jsonwebtoken:jjwt-api`, `jjwt-impl`, `jjwt-jackson` for JWT
- `org.springdoc:springdoc-openapi-starter-webmvc-ui` for Swagger UI

## Backend Folder Structure

Create the backend inside the existing `backend/` folder:

```text
backend/
  pom.xml
  README.md
  .env.example
  src/
    main/
      java/
        com/dashboard/api/
          DashboardApiApplication.java
          common/
            ApiResponse.java
            ErrorResponse.java
            PageResponse.java
            exception/
              GlobalExceptionHandler.java
              ResourceNotFoundException.java
              BadRequestException.java
              ConflictException.java
            mapper/
              DateMapper.java
          config/
            CorsConfig.java
            OpenApiConfig.java
            SecurityConfig.java
            JwtAuthenticationFilter.java
            JwtService.java
          auth/
            AuthController.java
            AuthService.java
            dto/
              LoginRequest.java
              RegisterRequest.java
              AuthResponse.java
              RefreshTokenRequest.java
          user/
            User.java
            UserRole.java
            UserRepository.java
            UserService.java
            UserController.java
            dto/
              UserDto.java
              UpdateProfileRequest.java
              UpdatePasswordRequest.java
              UserPreferencesDto.java
              UpdatePreferencesRequest.java
          course/
            Course.java
            CourseStatus.java
            Enrollment.java
            CourseRepository.java
            EnrollmentRepository.java
            CourseService.java
            CourseController.java
            dto/
              CourseDto.java
              CourseDetailDto.java
              CreateCourseRequest.java
              UpdateCourseRequest.java
              EnrollmentDto.java
          assignment/
            Assignment.java
            AssignmentStatus.java
            Submission.java
            AssignmentRepository.java
            SubmissionRepository.java
            AssignmentService.java
            AssignmentController.java
            dto/
              AssignmentDto.java
              AssignmentDetailDto.java
              CreateAssignmentRequest.java
              UpdateAssignmentRequest.java
              SubmitAssignmentRequest.java
          calendar/
            CalendarEvent.java
            CalendarEventRepository.java
            CalendarEventService.java
            CalendarEventController.java
            dto/
              CalendarEventDto.java
              CreateCalendarEventRequest.java
              UpdateCalendarEventRequest.java
          message/
            Conversation.java
            Message.java
            ConversationRepository.java
            MessageRepository.java
            MessageService.java
            MessageController.java
            dto/
              ConversationDto.java
              MessageDto.java
              SendMessageRequest.java
          notification/
            Notification.java
            NotificationType.java
            NotificationRepository.java
            NotificationService.java
            NotificationController.java
            dto/
              NotificationDto.java
          dashboard/
            DashboardController.java
            DashboardService.java
            dto/
              DashboardSummaryDto.java
              ProgressChartDto.java
    main/
      resources/
        application.yml
        application-dev.yml
        application-prod.yml
        db/
          migration/
            V1__create_users.sql
            V2__create_courses_and_enrollments.sql
            V3__create_assignments_and_submissions.sql
            V4__create_calendar_events.sql
            V5__create_messages_and_notifications.sql
            V6__seed_demo_data.sql
    test/
      java/
        com/dashboard/api/
          auth/
            AuthControllerTest.java
          user/
            UserControllerTest.java
          course/
            CourseControllerTest.java
          assignment/
            AssignmentControllerTest.java
          calendar/
            CalendarEventControllerTest.java
```

## File By File Responsibilities

### Root Backend Files

`backend/pom.xml`

- Maven project configuration.
- Spring Boot parent.
- Java version.
- Dependencies.
- Maven plugins for tests and packaging.

`backend/README.md`

- How to run the backend.
- Required environment variables.
- Database setup.
- API base URL.
- Useful commands: `mvn spring-boot:run`, `mvn test`, `mvn clean package`.

`backend/.env.example`

- Example values only.
- Include `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `FRONTEND_ORIGIN`.
- Never commit real secrets.

### Application Entry

`DashboardApiApplication.java`

- Main Spring Boot class.
- Only contains `SpringApplication.run(...)`.

### Common Package

`ApiResponse.java`

- Optional wrapper for simple success responses.
- Fields: `message`, `data`, `timestamp`.

`ErrorResponse.java`

- Standard API error body.
- Fields: `status`, `message`, `path`, `timestamp`, `validationErrors`.

`PageResponse.java`

- Standard pagination response.
- Fields: `content`, `page`, `size`, `totalElements`, `totalPages`.

`GlobalExceptionHandler.java`

- Handles validation errors, not found errors, bad requests, conflicts, and unexpected errors.
- Keeps frontend error handling predictable.

`ResourceNotFoundException.java`

- Throw when a requested entity does not exist.

`BadRequestException.java`

- Throw when request data is invalid beyond field validation.

`ConflictException.java`

- Throw for duplicate email, duplicate enrollment, etc.

`DateMapper.java`

- Converts between entity date/time fields and API DTO strings if needed.

### Config Package

`CorsConfig.java`

- Allow frontend origin, probably `http://localhost:3000` in development.
- Allow methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`.
- Allow headers: `Authorization`, `Content-Type`.

`SecurityConfig.java`

- Disables server sessions for JWT auth.
- Allows public routes:
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `POST /api/auth/refresh`
  - `/swagger-ui/**`
  - `/v3/api-docs/**`
- Protects all dashboard API routes.
- Configures password encoder with BCrypt.

`JwtAuthenticationFilter.java`

- Reads `Authorization: Bearer <token>`.
- Validates token.
- Loads authenticated user into Spring Security context.

`JwtService.java`

- Creates access tokens.
- Validates tokens.
- Extracts user id/email/role claims.

`OpenApiConfig.java`

- Swagger title, description, version.
- JWT bearer security scheme.

### Auth Package

`AuthController.java`

- REST endpoints:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/refresh`
  - `POST /api/auth/logout`, optional if using refresh tokens
  - `POST /api/auth/forgot-password`, later
  - `POST /api/auth/reset-password`, later

`AuthService.java`

- Validates credentials.
- Hashes passwords on registration.
- Prevents duplicate email.
- Returns JWT and current user DTO.

`LoginRequest.java`

- Fields: `email`, `password`.
- Validation: email required, password required.

`RegisterRequest.java`

- Fields: `email`, `password`, `firstName`, `lastName`, `role`.
- Validation: valid email, password minimum 8, required names.

`AuthResponse.java`

- Fields: `accessToken`, `refreshToken`, `tokenType`, `expiresIn`, `user`.

`RefreshTokenRequest.java`

- Field: `refreshToken`.

### User Package

`User.java`

- JPA entity for platform users.
- Fields:
  - `id`
  - `email`
  - `passwordHash`
  - `firstName`
  - `lastName`
  - `phone`
  - `bio`
  - `language`
  - `role`
  - preference fields or JSON preferences
  - `createdAt`
  - `updatedAt`
- Do not expose `passwordHash` in API responses.

`UserRole.java`

- Enum: `STUDENT`, `TEACHER`, `PARENT`, `ADMIN`.
- Your frontend has learner, teacher, and parent signup flows, so keep the backend ready for these roles.

`UserRepository.java`

- Extends `JpaRepository<User, UUID>`.
- Methods:
  - `Optional<User> findByEmail(String email)`
  - `boolean existsByEmail(String email)`

`UserService.java`

- Gets current user profile.
- Updates profile.
- Updates preferences.
- Changes password after checking the current password.
- Deletes account.

`UserController.java`

- REST endpoints:
  - `GET /api/users/me`
  - `PATCH /api/users/me`
  - `PATCH /api/users/me/preferences`
  - `PATCH /api/users/me/password`
  - `DELETE /api/users/me`

`UserDto.java`

- Public user fields only.
- No password field.

`UpdateProfileRequest.java`

- Fields: `firstName`, `lastName`, `phone`, `bio`, `language`.

`UpdatePasswordRequest.java`

- Fields: `currentPassword`, `newPassword`, `confirmPassword`.

`UserPreferencesDto.java`

- Fields matching the frontend settings:
  - notification preferences
  - appearance
  - privacy preferences
  - course preferences, like downloaded certificates and restored archived courses

`UpdatePreferencesRequest.java`

- Same shape as `UserPreferencesDto`, all fields optional for partial updates.

### Course Package

`Course.java`

- JPA entity for courses.
- Fields: `id`, `title`, `subject`, `description`, `imageUrl`, `totalHours`, `lessons`, `createdAt`, `updatedAt`.

`CourseStatus.java`

- Enum: `CURRENT`, `COMPLETED`, `ARCHIVED`.

`Enrollment.java`

- Joins users to courses.
- Fields: `id`, `user`, `course`, `status`, `progress`, `grade`, `completedOn`, `archivedOn`, `archiveReason`.

`CourseRepository.java`

- Course queries by subject, title, etc.

`EnrollmentRepository.java`

- Queries user's current/completed/archived courses.

`CourseService.java`

- Lists courses.
- Lists current/completed/archived courses for current user.
- Enrolls user in a course.
- Updates progress.
- Restores archived course.
- Marks certificate downloaded.

`CourseController.java`

- REST endpoints:
  - `GET /api/courses`
  - `GET /api/courses/{id}`
  - `GET /api/me/courses`
  - `GET /api/me/courses/current`
  - `GET /api/me/courses/completed`
  - `GET /api/me/courses/archived`
  - `POST /api/courses/{id}/enroll`
  - `PATCH /api/me/courses/{courseId}/progress`
  - `POST /api/me/courses/{courseId}/restore`
  - `POST /api/me/courses/{courseId}/certificate-downloads`

`CourseDto.java`

- List view fields used by the frontend course cards.

`CourseDetailDto.java`

- Course detail plus lessons/resources later.

`CreateCourseRequest.java`

- Admin/teacher payload for creating courses.

`UpdateCourseRequest.java`

- Admin/teacher payload for editing courses.

`EnrollmentDto.java`

- User-specific course fields: `status`, `progress`, `grade`, certificate state.

### Assignment Package

`Assignment.java`

- JPA entity.
- Fields: `id`, `course`, `title`, `subject`, `description`, `status`, `dueAt`, `teacher`, `createdAt`, `updatedAt`.

`AssignmentStatus.java`

- Enum: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `OVERDUE`.

`Submission.java`

- User assignment submission.
- Fields: `id`, `assignment`, `student`, `content`, `fileUrl`, `submittedAt`, `grade`, `feedback`.

`AssignmentRepository.java`

- Queries assignments by user, course, status, due date.

`SubmissionRepository.java`

- Queries submissions by assignment and user.

`AssignmentService.java`

- Lists assignments for current user.
- Filters by status.
- Gets assignment details.
- Creates or updates submission.

`AssignmentController.java`

- REST endpoints:
  - `GET /api/me/assignments`
  - `GET /api/me/assignments/{id}`
  - `GET /api/me/assignments/{id}/resources`
  - `POST /api/me/assignments/{id}/submissions`
  - `PATCH /api/me/assignments/{id}/submissions`

`AssignmentDto.java`

- Fields used by assignment table/cards.

`AssignmentDetailDto.java`

- Full description, learning content, resources, submission state.

`CreateAssignmentRequest.java`

- Teacher/admin payload.

`UpdateAssignmentRequest.java`

- Teacher/admin update payload.

`SubmitAssignmentRequest.java`

- Student submission payload.

### Calendar Package

`CalendarEvent.java`

- JPA entity.
- Fields: `id`, `user`, `title`, `description`, `startAt`, `endAt`, `color`, `createdAt`, `updatedAt`.

`CalendarEventRepository.java`

- Queries events by current user and date range.

`CalendarEventService.java`

- Lists events.
- Creates events.
- Updates events.
- Deletes events.
- Enforces valid date ranges.

`CalendarEventController.java`

- REST endpoints:
  - `GET /api/me/calendar-events?from=&to=`
  - `POST /api/me/calendar-events`
  - `PATCH /api/me/calendar-events/{id}`
  - `DELETE /api/me/calendar-events/{id}`

`CalendarEventDto.java`

- Fields compatible with `react-big-calendar`: `id`, `title`, `start`, `end`, `color`, `description`.

`CreateCalendarEventRequest.java`

- Fields: `title`, `description`, `start`, `end`, `color`.

`UpdateCalendarEventRequest.java`

- Same fields, optional for partial update.

### Message Package

`Conversation.java`

- JPA entity representing a chat thread.
- Fields: `id`, `title`, `createdAt`, `updatedAt`.
- Later add participants with a join table.

`Message.java`

- JPA entity.
- Fields: `id`, `conversation`, `sender`, `body`, `readAt`, `createdAt`.

`ConversationRepository.java`

- Finds conversations for current user.

`MessageRepository.java`

- Finds messages by conversation ordered by date.

`MessageService.java`

- Lists conversations.
- Loads chat history.
- Sends messages.
- Marks messages as read.

`MessageController.java`

- REST endpoints:
  - `GET /api/me/conversations`
  - `GET /api/me/conversations/{id}/messages`
  - `POST /api/me/conversations/{id}/messages`
  - `PATCH /api/me/conversations/{id}/read`

`ConversationDto.java`

- Contact/chat list fields: name, last message, time, unread count, online flag later.

`MessageDto.java`

- Message fields: sender, text, time, read state.

`SendMessageRequest.java`

- Field: `body`.

### Notification Package

`Notification.java`

- JPA entity.
- Fields: `id`, `user`, `type`, `title`, `body`, `readAt`, `createdAt`.

`NotificationType.java`

- Enum: `COURSE`, `ASSIGNMENT`, `MESSAGE`, `SYSTEM`.

`NotificationRepository.java`

- Queries current user's notifications.

`NotificationService.java`

- Lists notifications.
- Marks one/all as read.
- Creates notifications after important actions.

`NotificationController.java`

- REST endpoints:
  - `GET /api/me/notifications`
  - `PATCH /api/me/notifications/{id}/read`
  - `PATCH /api/me/notifications/read-all`

`NotificationDto.java`

- Fields for the header notification dropdown.

### Dashboard Package

`DashboardController.java`

- REST endpoints:
  - `GET /api/me/dashboard/summary`
  - `GET /api/me/dashboard/progress`

`DashboardService.java`

- Aggregates data for dashboard cards and charts.
- Keeps React components from calculating everything manually.

`DashboardSummaryDto.java`

- Counts: active courses, assignments due, completed assignments, unread messages, upcoming events.

`ProgressChartDto.java`

- Data for charts page.

### Resources

`application.yml`

- Shared Spring config.
- App name.
- Active profile default.
- JPA settings that are safe for all profiles.

`application-dev.yml`

- Local database URL.
- CORS origin `http://localhost:3000`.
- Logging level.
- Flyway enabled.

`application-prod.yml`

- Production config through environment variables only.
- No hardcoded passwords or secrets.

`V1__create_users.sql`

- Create `users` table.
- Include unique email index.

`V2__create_courses_and_enrollments.sql`

- Create `courses` and `enrollments`.

`V3__create_assignments_and_submissions.sql`

- Create `assignments` and `submissions`.

`V4__create_calendar_events.sql`

- Create `calendar_events`.

`V5__create_messages_and_notifications.sql`

- Create `conversations`, `conversation_participants`, `messages`, `notifications`.

`V6__seed_demo_data.sql`

- Seed demo courses, assignments, calendar events, and one demo user.
- Use a BCrypt password hash, never plain text.

## Suggested API Contract For Frontend Migration

Change frontend base URL from:

```js
baseURL: "http://localhost:3001"
```

to:

```js
baseURL: "http://localhost:8080/api"
```

Then migrate endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me
PATCH  /api/users/me
PATCH  /api/users/me/preferences
PATCH  /api/users/me/password
DELETE /api/users/me

GET    /api/me/courses/current
GET    /api/me/courses/completed
GET    /api/me/courses/archived
POST   /api/courses/{id}/enroll
POST   /api/me/courses/{courseId}/restore
POST   /api/me/courses/{courseId}/certificate-downloads

GET    /api/me/assignments
GET    /api/me/assignments/{id}
POST   /api/me/assignments/{id}/submissions

GET    /api/me/calendar-events
POST   /api/me/calendar-events
PATCH  /api/me/calendar-events/{id}
DELETE /api/me/calendar-events/{id}

GET    /api/me/conversations
GET    /api/me/conversations/{id}/messages
POST   /api/me/conversations/{id}/messages

GET    /api/me/notifications
PATCH  /api/me/notifications/{id}/read

GET    /api/me/dashboard/summary
GET    /api/me/dashboard/progress
```

## Implementation Order

1. Generate Spring Boot Maven project inside `backend/`.
2. Configure PostgreSQL, Flyway, CORS, and Swagger.
3. Build auth first: register, login, JWT, `/api/users/me`.
4. Update frontend `AuthContext.jsx` to stop fetching all users and comparing passwords.
5. Build profile and preferences endpoints.
6. Move calendar events from `users.preferences.calendarEvents` into the `calendar_events` table.
7. Move courses from `frontend/src/lib/courseCatalog.js` into backend seed data.
8. Build assignments endpoints and replace hardcoded assignment data.
9. Build messages and notifications.
10. Build dashboard summary/chart endpoints.
11. Add tests for every controller.
12. Remove `frontend/server.js` and `frontend/db.json` after the frontend fully uses Spring Boot.

## Important Frontend Changes

`frontend/src/Components/api/axios.jsx`

- Set base URL to `http://localhost:8080/api`.
- Add request interceptor to attach JWT:

```js
config.headers.Authorization = `Bearer ${token}`;
```

`AuthContext.jsx`

- Replace `getUser()` from `GET /users` with `GET /users/me`.
- Replace client-side login with `POST /auth/login`.
- Replace register with `POST /auth/register`.
- Store `accessToken`, not only user id.
- Do not store or handle plain passwords after sending login/register requests.

`ProtectRouteLog.jsx` and `ProtectRouteDash.jsx`

- Check for a valid auth token and current user instead of only `localStorage.getItem("user")`.

`Settings.jsx`

- Replace password comparison in React with `PATCH /users/me/password`.
- Backend must verify current password.

`Calendar.jsx`

- Replace patching `preferences.calendarEvents` with dedicated calendar event endpoints.

`courseCatalog.js`

- Keep it temporarily as fallback demo data.
- Later replace it with calls to backend course endpoints.

## Database Design Notes

Use UUID primary keys for all user-owned entities.

Core relationships:

- One user has many enrollments.
- One course has many enrollments.
- One course has many assignments.
- One user has many submissions.
- One user has many calendar events.
- One conversation has many messages.
- Many users can participate in many conversations.
- One user has many notifications.

Avoid storing large nested preference objects forever. It is okay for the first version, but calendar events, course state, certificates, messages, and assignments should become real tables.

## Security Rules

- Never return password hashes to the frontend.
- Never compare passwords in React.
- Hash passwords with BCrypt.
- Use JWT access tokens with short expiration.
- Consider refresh tokens after basic auth works.
- Validate every request DTO.
- Users can only access their own profile, calendar events, assignments, messages, and notifications.
- Teacher/admin routes should require roles.

## First Milestone Definition

The first backend milestone is complete when:

- `POST /api/auth/register` creates a user with hashed password.
- `POST /api/auth/login` returns JWT plus user profile.
- `GET /api/users/me` returns the authenticated user.
- `PATCH /api/users/me` updates profile fields.
- `PATCH /api/users/me/preferences` updates settings.
- React can log in, register, refresh current user, and open the dashboard without `json-server`.

After this milestone, continue feature by feature.

## Suggested Commands

From project root:

```bash
cd backend
mvn spring-boot:run
```

Run tests:

```bash
cd backend
mvn test
```

Package:

```bash
cd backend
mvn clean package
```

## Final Guidance

Build the backend around the frontend workflows, not around generic CRUD only. The dashboard is student-centered, so start every protected endpoint from the current authenticated user: `/api/me/...`.

Keep `json-server` running only until each React page has a real backend endpoint. Replace one page at a time: auth, settings, calendar, courses, assignments, messages, then analytics.
