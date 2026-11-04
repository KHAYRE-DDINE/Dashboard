-- V2__seed_initial_data.sql
-- Initial production seed data for Al Taalim (التعليم)

-- 1. Initial Users
-- Password for all seed users is: 123456 (BCrypt encrypted)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, bio, location, title, language, avatar, role, is_dark_mode, is_verified, preferences)
VALUES 
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'ahrarkhirdin@gmail.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Khayreddine',
    'Ahrar',
    '+212 637-625661',
    'Full-Stack Software Engineer specializing in modern React web applications, scalable Node.js microservices, and high-performance UI systems.',
    'Casablanca, Morocco',
    'Full-Stack Software Engineer • UI/UX Specialist',
    'English',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    'STUDENT',
    true,
    true,
    '{"appearance": "dark", "privacy": {"showProgress": false, "allowMessages": true, "profileVisible": true}, "notifications": {"newCourse": true, "promotions": false, "weeklyDigest": false, "assignmentDue": true, "systemUpdates": true, "messageReceived": true}}'::jsonb
),
(
    'a1111111-1111-1111-1111-111111111111',
    'admin@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Administrator',
    'Al Taalim',
    '+212 600-000000',
    'Lead Platform Administrator at Al Taalim (التعليم) Educational Systems.',
    'Rabat, Morocco',
    'Chief Academic Officer',
    'English',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    'ADMIN',
    true,
    true,
    '{}'::jsonb
),
(
    'c2222222-2222-2222-2222-222222222222',
    'sarah.jenkins@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Dr. Sarah',
    'Jenkins',
    '+1 415-555-0199',
    'Senior Computer Science Instructor & Distributed Systems Architect.',
    'San Francisco, CA',
    'Senior Faculty Instructor',
    'English',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
    'INSTRUCTOR',
    false,
    true,
    '{}'::jsonb
);

-- 2. Initial Courses
INSERT INTO courses (id, subject, title, description, total_hours, icon, category, color, bg_soft, text_soft, instructor_id)
VALUES 
(
    1,
    'Full-Stack React & Node.js Architecture',
    'Modern Full-Stack Development',
    'Mastering React 18, Custom Hooks, Node.js Express APIs, RESTful Architecture, and Tailwind CSS design systems.',
    48,
    '💻',
    'current',
    'bg-indigo-500',
    'bg-indigo-50',
    'text-indigo-700',
    'c2222222-2222-2222-2222-222222222222'
),
(
    2,
    'Data Structures & System Design',
    'Computer Science Fundamentals',
    'Comprehensive study of trees, graphs, dynamic programming, space-time complexity analysis, and system architecture.',
    60,
    '🧠',
    'current',
    'bg-emerald-500',
    'bg-emerald-50',
    'text-emerald-700',
    'c2222222-2222-2222-2222-222222222222'
),
(
    3,
    'Cloud Services & DevOps Pipeline',
    'Cloud & Containerization',
    'Deploying cloud applications with Docker containers, CI/CD automation pipelines, Nginx reverse proxy, and AWS.',
    36,
    '☁️',
    'current',
    'bg-sky-500',
    'bg-sky-50',
    'text-sky-700',
    'c2222222-2222-2222-2222-222222222222'
),
(
    4,
    'AI & Machine Learning Foundations',
    'Artificial Intelligence Engineering',
    'Building predictive ML models using Python, Pandas, Scikit-learn, Neural Networks, and PyTorch frameworks.',
    50,
    '🤖',
    'completed',
    'bg-purple-500',
    'bg-purple-50',
    'text-purple-700',
    'c2222222-2222-2222-2222-222222222222'
),
(
    5,
    'Advanced UI/UX & Accessible Web Design',
    'Design Systems & Accessibility',
    'Crafting responsive accessibility-first UI design components, dark theme tokens, glassmorphism, and micro-interactions.',
    30,
    '🎨',
    'completed',
    'bg-rose-500',
    'bg-rose-50',
    'text-rose-700',
    'c2222222-2222-2222-2222-222222222222'
),
(
    6,
    'Legacy Web Foundations (HTML4/jQuery)',
    'Historical Web Standards',
    'Understanding early web architecture, DOM manipulation with jQuery, and backward compatibility standards.',
    20,
    '📜',
    'archived',
    'bg-amber-500',
    'bg-amber-50',
    'text-amber-700',
    'c2222222-2222-2222-2222-222222222222'
);

SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses));

-- 3. Course Lessons
INSERT INTO lessons (course_id, title, duration, order_index, video_url)
VALUES 
(1, 'Lesson 1: React 18 Concurrent Rendering & State Batching', '18:45', 1, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(1, 'Lesson 2: Custom React Hooks & State Optimization', '24:30', 2, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(1, 'Lesson 3: RESTful API Integration with Axios & Interceptors', '20:15', 3, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(1, 'Lesson 4: Tailwind CSS Dark Theme & Modern Micro-interactions', '15:20', 4, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(2, 'Lesson 1: Asymptotic Big-O Analysis & Space-Time Tradeoffs', '22:10', 1, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(2, 'Lesson 2: Balanced Trees (AVL & Red-Black) Implementation', '28:40', 2, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(2, 'Lesson 3: Graph Traversal: BFS, DFS & Dijkstra Shortest Path', '32:00', 3, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(3, 'Lesson 1: Docker Containers, Images & Layer Optimization', '19:10', 1, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(3, 'Lesson 2: Multi-Stage Dockerfiles for Production Builds', '25:00', 2, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(3, 'Lesson 3: Reverse Proxy Architecture with Nginx & SSL/TLS', '21:30', 3, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(4, 'Lesson 1: Linear Regression & Gradient Descent Optimization', '26:45', 1, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(4, 'Lesson 2: Classification with Support Vector Machines', '30:10', 2, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(5, 'Lesson 1: WCAG 2.1 AA Compliance & Color Contrast Systems', '16:20', 1, 'https://www.w3schools.com/html/mov_bbb.mp4'),
(6, 'Lesson 1: Document Object Model & Historical Event Loops', '14:15', 1, 'https://www.w3schools.com/html/mov_bbb.mp4');

-- 4. Initial Enrollments for Demo Student
INSERT INTO enrollments (id, user_id, course_id, progress, grade, is_archived, completed_at)
VALUES 
(1, 'b3397b2d-daf5-4cec-864c-abd284807b82', 1, 85, NULL, false, NULL),
(2, 'b3397b2d-daf5-4cec-864c-abd284807b82', 2, 68, NULL, false, NULL),
(3, 'b3397b2d-daf5-4cec-864c-abd284807b82', 3, 52, NULL, false, NULL),
(4, 'b3397b2d-daf5-4cec-864c-abd284807b82', 4, 100, 'A+', false, '2026-08-15 10:00:00+00'),
(5, 'b3397b2d-daf5-4cec-864c-abd284807b82', 5, 100, 'A', false, '2026-08-20 14:00:00+00'),
(6, 'b3397b2d-daf5-4cec-864c-abd284807b82', 6, 100, 'B+', true, '2026-06-10 12:00:00+00');

SELECT setval('enrollments_id_seq', (SELECT MAX(id) FROM enrollments));

-- 5. Certificates for Completed Courses
INSERT INTO certificates (id, user_id, course_id, enrollment_id, certificate_code, student_name, course_title, grade, issued_at)
VALUES 
(
    'e1111111-1111-1111-1111-111111111111',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    4,
    4,
    'ALT-AI-2026-98421',
    'Khayreddine Ahrar',
    'Artificial Intelligence Engineering',
    'A+',
    '2026-08-15 10:00:00+00'
),
(
    'e2222222-2222-2222-2222-222222222222',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    5,
    5,
    'ALT-UI-2026-73195',
    'Khayreddine Ahrar',
    'Design Systems & Accessibility',
    'A',
    '2026-08-20 14:00:00+00'
);

-- 6. Initial Classes
INSERT INTO classes (id, title, subject, instructor, instructor_id, join_code, room, time, date, status)
VALUES 
(
    1,
    'Full-Stack Architecture & Microservices Workshop',
    'Computer Science',
    'Dr. Sarah Jenkins',
    'c2222222-2222-2222-2222-222222222222',
    'AL-FULL-101',
    'Virtual Hall A-1',
    '14:00 - 15:30',
    'Monday & Wednesday',
    'Active'
),
(
    2,
    'Advanced System Design: Distributed Caching & Sharding',
    'System Architecture',
    'Prof. Alex Rivera',
    'c2222222-2222-2222-2222-222222222222',
    'AL-SYS-202',
    'Virtual Lab B-3',
    '10:00 - 11:30',
    'Tuesday & Thursday',
    'Active'
),
(
    3,
    'Cloud Native Infrastructure: Kubernetes & Multi-Stage Containers',
    'DevOps',
    'Eng. Mourad Hajji',
    'c2222222-2222-2222-2222-222222222222',
    'AL-CLD-303',
    'Virtual Cluster C-2',
    '16:00 - 17:30',
    'Friday',
    'Active'
);

SELECT setval('classes_id_seq', (SELECT MAX(id) FROM classes));

-- Class Memberships for Demo Student
INSERT INTO class_memberships (class_id, user_id, role)
VALUES 
(1, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'STUDENT'),
(2, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'STUDENT'),
(3, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'STUDENT');

-- 7. Initial Assignments
INSERT INTO assignments (id, title, subject, description, status, due_date, due_time, color, teacher, class_id, created_by)
VALUES 
(
    1,
    'Full-Stack Engineering',
    'RESTful API Integration & JWT Authentication',
    'Implement stateless authentication filters, token rotation, and reactive route protection with error boundary handling.',
    'pending',
    'Aug 26',
    '23:59',
    'bg-blue-100 text-blue-700',
    'Dr. Sarah Jenkins',
    1,
    'c2222222-2222-2222-2222-222222222222'
),
(
    2,
    'Data Structures',
    'Binary Search Tree & Graph Traversal Implementation',
    'Construct balanced binary search tree with self-balancing rotation algorithms and analyze depth-first search complexity.',
    'completed',
    'Aug 22',
    '18:00',
    'bg-emerald-100 text-emerald-700',
    'Prof. Alex Rivera',
    2,
    'c2222222-2222-2222-2222-222222222222'
),
(
    3,
    'Cloud & DevOps',
    'Docker Multi-Stage Container Setup & Nginx Config',
    'Write optimized Dockerfiles leveraging alpine base images, container health checks, and secure reverse proxy routing.',
    'pending',
    'Aug 28',
    '20:00',
    'bg-indigo-100 text-indigo-700',
    'Eng. Mourad Hajji',
    3,
    'c2222222-2222-2222-2222-222222222222'
),
(
    4,
    'Database Systems',
    'PostgreSQL Query Optimization & Indexing Strategies',
    'Analyze query execution plans using EXPLAIN ANALYZE, composite B-tree indexing, and partitioning mechanisms.',
    'overdue',
    'Aug 10',
    '23:59',
    'bg-amber-100 text-amber-700',
    'Dr. Sarah Jenkins',
    1,
    'c2222222-2222-2222-2222-222222222222'
);

SELECT setval('assignments_id_seq', (SELECT MAX(id) FROM assignments));

-- Assignment Comments
INSERT INTO assignment_comments (assignment_id, author_name, author_avatar, text)
VALUES 
(1, 'Khalid Al Walid', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Hello instructor, should we use Argon2id or standard BCrypt for password hashing in the unit tests?'),
(1, 'Dr. Sarah Jenkins', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'BCrypt with cost factor 10 or 12 is completely acceptable. Focus primarily on constant-time comparison and proper token invalidation.'),
(2, 'Amal Hamdalah', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'Make sure your Red-Black tree rebalancing cases handle both left-rotate and right-rotate double rotations.');

-- Assignment Resources
INSERT INTO assignment_resources (assignment_id, title, subject, type, size, url, description, image_url)
VALUES 
(1, 'JWT Best Practices & Security Specification (RFC 7519)', 'Full-Stack Engineering', 'pdf', '1.8 MB', 'https://tools.ietf.org/html/rfc7519', 'Official specification and security guidelines for JSON Web Tokens.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'),
(2, 'Tree Data Structures & Graph Algorithms Reference Manual', 'Data Structures', 'pdf', '4.2 MB', 'https://example.com/tree-reference.pdf', 'Complete pseudocode, invariant proofs, and asymptotic complexity charts.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'),
(3, 'Docker Multi-Stage Build & Alpine Security Hardening Guide', 'Cloud & DevOps', 'pdf', '2.5 MB', 'https://example.com/docker-guide.pdf', 'Best practices for reducing image attack surfaces and optimizing layer caching.', 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&auto=format&fit=crop&q=80');

-- 8. Initial Digital Library Items
INSERT INTO library_items (id, title, author, category, format, size, image_url, color, description, toc)
VALUES 
(
    1,
    'Clean Code: A Handbook of Agile Software Craftsmanship',
    'Robert C. Martin',
    'Software Engineering',
    'PDF',
    '4.8 MB',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=80',
    'bg-indigo-50 text-indigo-700',
    'Essential principles, practices, and patterns for writing clean, readable, maintainable software.',
    '["Chapter 1: Clean Code", "Chapter 2: Meaningful Names", "Chapter 3: Functions & SOLID", "Chapter 4: Unit Testing & Refactoring"]'::jsonb
),
(
    2,
    'Designing Data-Intensive Applications',
    'Martin Kleppmann',
    'System Architecture',
    'PDF',
    '8.2 MB',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    'bg-sky-50 text-sky-700',
    'The definitive guide to data systems architecture, scalability, consistency, and distributed computing.',
    '["Chapter 1: Reliable Data Systems", "Chapter 2: Data Models & Query Languages", "Chapter 3: Storage Engine Mechanics", "Chapter 4: Distributed Replication"]'::jsonb
),
(
    3,
    'You Don''t Know JS Yet: Scope & Closures',
    'Kyle Simpson',
    'JavaScript',
    'EPUB',
    '3.1 MB',
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=80',
    'bg-amber-50 text-amber-700',
    'Deep dive into JavaScript lexical scope, closure mechanics, module patterns, and execution contexts.',
    '["Chapter 1: What is Scope?", "Chapter 2: Lexical Scope Mechanics", "Chapter 3: Function vs Block Scope", "Chapter 4: Closures & Modules"]'::jsonb
),
(
    4,
    'Grokking Algorithms: An Illustrated Guide',
    'Aditya Bhargava',
    'Computer Science',
    'PDF',
    '6.5 MB',
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=80',
    'bg-emerald-50 text-emerald-700',
    'A fully illustrated, intuitive guide that teaches essential algorithms and problem-solving strategies.',
    '["Chapter 1: Binary Search & Big O", "Chapter 2: Selection & Quicksort", "Chapter 3: Hash Tables & Graphs", "Chapter 4: Dynamic Programming"]'::jsonb
);

SELECT setval('library_items_id_seq', (SELECT MAX(id) FROM library_items));

-- 9. Initial Notifications
INSERT INTO notifications (user_id, title, body, icon, icon_bg, icon_color, is_read, link)
VALUES 
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Code Review Approved: CI/CD Pipeline',
    'Your pull request for RESTful API Integration passed all unit tests with 98% code coverage.',
    'check',
    'bg-emerald-100',
    'text-emerald-600',
    false,
    '/dashboard/assignments'
),
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Assignment Graded: 98/100',
    'Binary Search Tree & Graph Traversal received top grade. Outstanding solution!',
    'award',
    'bg-indigo-100',
    'text-indigo-600',
    false,
    '/dashboard/assignments'
),
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'New Course Material Available',
    'Dr. Sarah Jenkins uploaded supplementary notes on Distributed Caching & Nginx Load Balancing.',
    'book',
    'bg-blue-100',
    'text-blue-600',
    true,
    '/dashboard/library'
);

-- 10. Initial Conversations & Messages
INSERT INTO conversations (id, title, is_group)
VALUES 
(1, 'Dr. Sarah Jenkins (Senior Instructor)', false),
(2, 'Amal Hamdalah (Study Partner)', false);

SELECT setval('conversations_id_seq', (SELECT MAX(id) FROM conversations));

INSERT INTO conversation_participants (conversation_id, user_id)
VALUES 
(1, 'b3397b2d-daf5-4cec-864c-abd284807b82'),
(1, 'c2222222-2222-2222-2222-222222222222'),
(2, 'b3397b2d-daf5-4cec-864c-abd284807b82'),
(2, 'a1111111-1111-1111-1111-111111111111');

INSERT INTO messages (conversation_id, sender_id, sender_name, sender_avatar, text, is_read)
VALUES 
(1, 'c2222222-2222-2222-2222-222222222222', 'Dr. Sarah Jenkins', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Great work on the dark mode theme implementation! The contrast looks crisp and compliant with WCAG 2.1.', true),
(1, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'Khayreddine Ahrar', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500', 'Thank you Dr. Sarah! I am now connecting the Spring Boot backend with PostgreSQL migrations.', false);

-- 11. Initial Learning Activity Logs (for Analytics & KPI charts)
INSERT INTO user_activity_logs (user_id, activity_type, hours_spent, activity_date)
VALUES 
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 3.5, CURRENT_DATE - INTERVAL '6 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'ASSIGNMENT_PRACTICE', 4.0, CURRENT_DATE - INTERVAL '5 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 2.8, CURRENT_DATE - INTERVAL '4 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'LAB_WORK', 5.2, CURRENT_DATE - INTERVAL '3 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'ASSIGNMENT_PRACTICE', 3.8, CURRENT_DATE - INTERVAL '2 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 6.0, CURRENT_DATE - INTERVAL '1 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 3.0, CURRENT_DATE);
