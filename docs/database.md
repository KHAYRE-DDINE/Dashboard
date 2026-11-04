# Al Taalim (التعليم) — Database Schema & Data Model

Database Management System: PostgreSQL 16  
Migration Tool: Flyway (`backend/src/main/resources/db/migration/`)

---

## 1. Schema Tables Overview (19 Tables)

| # | Table Name | Description | Key Indexes / Constraints |
|---|------------|-------------|---------------------------|
| 1 | `users` | User accounts (students, instructors, admins) | `email UNIQUE`, `idx_users_email` |
| 2 | `courses` | Course catalog (modules, metadata, hours, instructor) | `FOREIGN KEY (instructor_id) REFERENCES users(id)` |
| 3 | `lessons` | Lessons inside courses (videos, duration, order) | `idx_lessons_course_id`, `ON DELETE CASCADE` |
| 4 | `enrollments` | Student course enrollments & overall progress | `uq_enrollment_user_course (user_id, course_id)` |
| 5 | `lesson_completions` | Individual lesson completion status | `uq_lesson_enrollment (enrollment_id, lesson_id)` |
| 6 | `certificates` | Generated course completion certificates | `certificate_code UNIQUE`, `idx_certificates_code` |
| 7 | `classes` | Cohorts and virtual classrooms | `join_code UNIQUE`, `idx_classes_join_code` |
| 8 | `class_memberships` | Student & instructor class enrollment | `uq_class_user (class_id, user_id)` |
| 9 | `assignments` | Course and class homework/quizzes | `FOREIGN KEY (class_id) REFERENCES classes(id)` |
| 10 | `assignment_submissions` | Student submitted assignment solutions | `uq_assignment_user (assignment_id, user_id)` |
| 11 | `assignment_comments` | Discussion threads on assignments | `idx_assignment_comments_assign (assignment_id)` |
| 12 | `assignment_resources` | Downloadable cheatsheets and files | `FOREIGN KEY (assignment_id) REFERENCES assignments(id)` |
| 13 | `calendar_events` | Academic deadlines and personal calendar | `idx_calendar_user_start (user_id, start_time)` |
| 14 | `library_items` | Digital textbook repository | `idx_library_category (category)` |
| 15 | `conversations` | Messaging channels | `id BIGSERIAL PRIMARY KEY` |
| 16 | `conversation_participants` | Users participating in messaging channels | `uq_conversation_participant (conversation_id, user_id)` |
| 17 | `messages` | Chat messages with optional attachments | `idx_messages_conv_created (conversation_id, created_at)` |
| 18 | `notifications` | Student alerts and system announcements | `idx_notifications_user (user_id, is_read)` |
| 19 | `user_activity_logs` | Daily study hours tracking for analytics | `idx_activity_user_date (user_id, activity_date)` |

---

## 2. Flyway Migration Strategy

- **`V1__init_schema.sql`**: Baseline DDL creating all 19 relational tables, UUID extension, unique constraints, foreign keys with appropriate cascade rules, and query performance indexes.
- **`V2__seed_initial_data.sql`**: Production-ready seeds providing:
  - Demo Student: `ahrarkhirdin@gmail.com` (password: `123456`, BCrypt hashed)
  - Admin: `admin@altaalim.edu`
  - Instructor: `instructor@altaalim.edu`
  - 6 initial courses with curriculum lessons
  - 3 virtual classrooms with verified join codes (`ARAB10`, `PHYS20`, `MATH30`)
  - Initial assignments, discussion comments, resources, digital library books, and notifications.

### Running Migrations Autonomously
Flyway migrations execute automatically at application startup before Hibernate validates entity mappings. This guarantees zero manual SQL scripts are required when deploying a new VPS or restarting containers.
