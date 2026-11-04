-- V3__comprehensive_real_data.sql
-- Comprehensive Real Educational Seed Data for Al Taalim (التعليم)
-- Covers: Users, Courses, Lessons, Enrollments, Lesson Completions, Certificates,
-- Classes, Memberships, Assignments, Submissions, Comments, Resources, Calendar Events,
-- Digital Library, Conversations, Messages, Notifications, and Activity Logs.

-- ============================================================================
-- 1. REAL INSTRUCTORS & PEER STUDENTS
-- ============================================================================
-- Password for all seed users is: 123456 (BCrypt cost factor 10)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, bio, location, title, language, avatar, role, is_dark_mode, is_verified, preferences)
VALUES 
-- Additional Faculty Instructors
(
    'c3333333-3333-3333-3333-333333333333',
    'alex.rivera@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Prof. Alex',
    'Rivera',
    '+1 206-555-0142',
    'Professor of Computer Systems & Distributed Algorithms. Author of Advanced Distributed Caching & Sharding Architectures.',
    'Seattle, WA',
    'Professor of Computer Systems',
    'English',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    'INSTRUCTOR',
    false,
    true,
    '{}'::jsonb
),
(
    'c4444444-4444-4444-4444-444444444444',
    'fatima.noor@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Dr. Fatima',
    'Noor',
    '+212 522-894100',
    'Senior Lecturer in Applied Mathematics, Multivariable Calculus, and Elliptic Curve Cryptography.',
    'Casablanca, Morocco',
    'Senior Mathematics Lecturer',
    'English',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    'INSTRUCTOR',
    false,
    true,
    '{}'::jsonb
),
(
    'c5555555-5555-5555-5555-555555555555',
    'sara.hassan@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Dr. Sara',
    'Hassan',
    '+20 2-33458900',
    'Head of Classical Arabic Literature, Morphology (الصرف), and Syntactic Eloquence (البلاغة).',
    'Cairo, Egypt',
    'Chair of Arabic Linguistics',
    'Arabic',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    'INSTRUCTOR',
    false,
    true,
    '{}'::jsonb
),
(
    'c6666666-6666-6666-6666-666666666666',
    'mourad.hajji@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Eng. Mourad',
    'Hajji',
    '+212 661-332211',
    'Principal DevOps Engineer & Cloud Solutions Architect. Kubernetes certified trainer.',
    'Rabat, Morocco',
    'Cloud Systems Specialist',
    'French',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
    'INSTRUCTOR',
    true,
    true,
    '{}'::jsonb
),
(
    'c7777777-7777-7777-7777-777777777777',
    'ahmed.ali@altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Prof. Ahmed',
    'Ali',
    '+971 4-3678900',
    'Professor of Theoretical Physics & Classical Mechanics. Researcher in Nonlinear Dynamics.',
    'Dubai, UAE',
    'Professor of Physics',
    'English',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
    'INSTRUCTOR',
    false,
    true,
    '{}'::jsonb
),
-- Peer Students (matching UI avatars and peer discussions)
(
    'd1111111-1111-1111-1111-111111111111',
    'khalid.walid@student.altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Khalid',
    'Al Walid',
    '+212 612-345678',
    'Computer Science sophomore passionate about low-level systems programming, Rust, and containerization.',
    'Fes, Morocco',
    'Computer Science Student',
    'Arabic',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80',
    'STUDENT',
    false,
    true,
    '{}'::jsonb
),
(
    'd2222222-2222-2222-2222-222222222222',
    'amal.hamdalah@student.altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Amal',
    'Hamdalah',
    '+212 663-987654',
    'Mathematics and Data Science major. Special interest in discrete algorithms, combinatorics, and machine learning.',
    'Tangier, Morocco',
    'Mathematics Student',
    'English',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    'STUDENT',
    true,
    true,
    '{}'::jsonb
),
(
    'd3333333-3333-3333-3333-333333333333',
    'jamal.monim@student.altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Jamal',
    'Monim',
    '+212 622-114477',
    'Engineering student concentrating on cloud infrastructure, distributed databases, and automated testing.',
    'Marrakech, Morocco',
    'Engineering Student',
    'French',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
    'STUDENT',
    false,
    true,
    '{}'::jsonb
),
(
    'd4444444-4444-4444-4444-444444444444',
    'felecia.rower@student.altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Felecia',
    'Rower',
    '+44 20-7946-0912',
    'Web technologies student focused on accessibility, semantic HTML, and responsive CSS token systems.',
    'London, UK',
    'UI/UX Design Student',
    'English',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
    'STUDENT',
    false,
    true,
    '{}'::jsonb
),
(
    'd5555555-5555-5555-5555-555555555555',
    'calvin.moore@student.altaalim.com',
    '$2a$10$RziOXOTN/3dR2FOapw8G1.XXx8.Q7VLJ1Y26/wP7T29S..IKkyov2',
    'Calvin',
    'Moore',
    '+1 312-555-0188',
    'Full-stack enthusiast interested in microservice gateways, API design, and asynchronous message brokers.',
    'Chicago, IL',
    'Software Student',
    'English',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
    'STUDENT',
    false,
    true,
    '{}'::jsonb
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- 2. EXPANDED ACADEMIC COURSES (Covering Full Curriculum)
-- ============================================================================
INSERT INTO courses (id, subject, title, description, total_hours, icon, category, color, bg_soft, text_soft, instructor_id)
VALUES 
(
    7,
    'Calculus & Linear Algebra Foundations',
    'Advanced Mathematics & Matrix Analysis',
    'Rigorous study of limits, multivariable differentiation, vector spaces, linear transformations, and eigenvalues with engineering applications.',
    60,
    '📐',
    'current',
    'bg-blue-500',
    'bg-blue-50',
    'text-blue-700',
    'c4444444-4444-4444-4444-444444444444'
),
(
    8,
    'Classical Mechanics & Thermodynamics',
    'Foundational Physics & Energy Systems',
    'Exploring Newtonian dynamics, Lagrangian formulations, harmonic oscillators, thermodynamics laws, and electromagnetic wave fundamentals.',
    45,
    '⚛️',
    'current',
    'bg-indigo-500',
    'bg-indigo-50',
    'text-indigo-700',
    'c7777777-7777-7777-7777-777777777777'
),
(
    9,
    'Arabic Grammar & Classical Eloquence',
    'Arabic Linguistics & Literature (النحو والبلاغة)',
    'Comprehensive mastery of Arabic syntax (النحو), morphology (الصرف), prosody (العروض), and rhetoric in classical texts and poetry.',
    40,
    '📚',
    'current',
    'bg-emerald-500',
    'bg-emerald-50',
    'text-emerald-700',
    'c5555555-5555-5555-5555-555555555555'
),
(
    10,
    'Cybersecurity & Network Defense',
    'Applied Cryptography & Infrastructure Security',
    'Core principles of asymmetric cryptography, TLS handshakes, threat modeling, penetration testing, and zero-trust authentication models.',
    35,
    '🛡️',
    'archived',
    'bg-slate-700',
    'bg-slate-100',
    'text-slate-800',
    'c6666666-6666-6666-6666-666666666666'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    total_hours = EXCLUDED.total_hours;

SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses));

-- ============================================================================
-- 3. LESSONS FOR NEW COURSES
-- ============================================================================
INSERT INTO lessons (course_id, title, duration, order_index, video_url, content)
VALUES 
-- Course 7: Mathematics
(7, 'Lesson 1: Fundamental Limits & Continuity Theorems', '25:10', 1, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Rigorous epsilon-delta definitions of limits, squeeze theorem, and piecewise continuity in multidimensional analysis.'),
(7, 'Lesson 2: Partial Derivatives & Gradient Vectors', '28:30', 2, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Multivariable functions, directional derivatives, tangent hyperplanes, and gradient vectors.'),
(7, 'Lesson 3: Vector Spaces, Subspaces & Linear Independence', '31:45', 3, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Axiomatic definition of vector spaces, span, basis, dimension, and rank-nullity theorem.'),
(7, 'Lesson 4: Eigenvalues, Eigenvectors & Diagonalization', '34:20', 4, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Characteristic polynomial, eigenspaces, geometric multiplicity, and matrix diagonalization with symmetric matrices.'),

-- Course 8: Physics
(8, 'Lesson 1: Vectors, Kinematics & 3D Projectile Motion', '22:15', 1, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Position, velocity, and acceleration vectors in Cartesian and polar coordinate systems.'),
(8, 'Lesson 2: Newton''s Laws of Motion & Friction Dynamics', '26:40', 2, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Inertial frames of reference, static and kinetic friction, tension, and centripetal acceleration.'),
(8, 'Lesson 3: Conservation of Energy & Momentum in Collisions', '29:00', 3, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Conservative forces, potential energy wells, elastic and inelastic collisions in center-of-mass frame.'),
(8, 'Lesson 4: First & Second Laws of Thermodynamics (Carnot Cycle)', '33:10', 4, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Heat engines, internal energy, entropy, reversible processes, and maximum theoretical efficiency.'),

-- Course 9: Arabic
(9, 'Lesson 1: Syntax Foundations (أقسام الكلم وعلامات الإعراب)', '20:15', 1, 'https://www.w3schools.com/html/mov_bbb.mp4', 'The three parts of speech: noun, verb, particle. Primary and secondary inflection marks in classical Arabic.'),
(9, 'Lesson 2: Nominal & Verbal Sentences (الجملة الاسمية والفعلية)', '24:50', 2, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Mubtada and Khabar varieties, verb-subject concordance, and object complements.'),
(9, 'Lesson 3: Rhetorical Devices: Metaphor & Simile (التشبيه والاستعارة)', '27:30', 3, 'https://www.w3schools.com/html/mov_bbb.mp4', 'Classical eloquence principles from Balagha: elements of simile, explicit and implicit metaphors.'),

-- Course 10: Cybersecurity
(10, 'Lesson 1: Symmetric & Asymmetric Cryptographic Primitives', '24:00', 1, 'https://www.w3schools.com/html/mov_bbb.mp4', 'AES block cipher modes, RSA key generation, modular arithmetic, and Diffie-Hellman key exchange.'),
(10, 'Lesson 2: Public Key Infrastructure & TLS 1.3 Handshake', '28:15', 2, 'https://www.w3schools.com/html/mov_bbb.mp4', 'X.509 digital certificates, Certificate Authorities, cipher suites, and forward secrecy.');

-- ============================================================================
-- 4. ENROLLMENTS & LESSON COMPLETIONS FOR DEMO STUDENT
-- ============================================================================
INSERT INTO enrollments (id, user_id, course_id, progress, grade, is_archived, completed_at)
VALUES 
(7, 'b3397b2d-daf5-4cec-864c-abd284807b82', 7, 75, NULL, false, NULL),
(8, 'b3397b2d-daf5-4cec-864c-abd284807b82', 8, 50, NULL, false, NULL),
(9, 'b3397b2d-daf5-4cec-864c-abd284807b82', 9, 100, 'A', false, '2026-09-01 11:30:00+00'),
(10, 'b3397b2d-daf5-4cec-864c-abd284807b82', 10, 100, 'A-', true, '2026-07-15 16:00:00+00')
ON CONFLICT (user_id, course_id) DO UPDATE SET
    progress = EXCLUDED.progress,
    grade = EXCLUDED.grade;

SELECT setval('enrollments_id_seq', (SELECT MAX(id) FROM enrollments));

-- Lesson Completions for Verified Student Progress
INSERT INTO lesson_completions (enrollment_id, lesson_id, completed_at)
SELECT e.id, l.id, CURRENT_TIMESTAMP - INTERVAL '2 day'
FROM enrollments e
JOIN lessons l ON l.course_id = e.course_id
WHERE e.user_id = 'b3397b2d-daf5-4cec-864c-abd284807b82'
  AND (e.progress = 100 OR l.order_index <= 2)
ON CONFLICT (enrollment_id, lesson_id) DO NOTHING;

-- Certificate for Completed Arabic Course
INSERT INTO certificates (id, user_id, course_id, enrollment_id, certificate_code, student_name, course_title, grade, issued_at)
VALUES 
(
    'e3333333-3333-3333-3333-333333333333',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    9,
    9,
    'ALT-ARB-2026-55210',
    'Khayreddine Ahrar',
    'Arabic Linguistics & Literature (النحو والبلاغة)',
    'A',
    '2026-09-01 11:30:00+00'
)
ON CONFLICT (certificate_code) DO NOTHING;

-- ============================================================================
-- 5. CLASSES & CLASS MEMBERSHIPS (Matching Virtual Classroom UI)
-- ============================================================================
INSERT INTO classes (id, title, subject, instructor, instructor_id, join_code, room, time, date, status)
VALUES 
(
    4,
    'Classical Arabic Literature & Rhetoric (البلاغة)',
    'arabic',
    'Dr. Sara Hassan',
    'c5555555-5555-5555-5555-555555555555',
    'ARAB10',
    'Andalus Seminar Room',
    '11:00 - 12:30',
    'Sunday & Tuesday',
    'Active'
),
(
    5,
    'Classical Mechanics & Thermodynamics Colloquium',
    'physics',
    'Prof. Ahmed Ali',
    'c7777777-7777-7777-7777-777777777777',
    'PHYS20',
    'Newton Hall 4-B',
    '09:00 - 10:30',
    'Monday & Thursday',
    'Active'
),
(
    6,
    'Multivariable Calculus & Linear Analysis',
    'math',
    'Dr. Fatima Noor',
    'c4444444-4444-4444-4444-444444444444',
    'MATH30',
    'Euler Lecture Theatre',
    '15:00 - 16:30',
    'Wednesday & Saturday',
    'Active'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    instructor = EXCLUDED.instructor,
    join_code = EXCLUDED.join_code;

SELECT setval('classes_id_seq', (SELECT MAX(id) FROM classes));

-- Class Memberships for Demo Student and Peers
INSERT INTO class_memberships (class_id, user_id, role)
VALUES 
(4, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'STUDENT'),
(5, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'STUDENT'),
(6, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'STUDENT'),
(4, 'd1111111-1111-1111-1111-111111111111', 'STUDENT'),
(4, 'd2222222-2222-2222-2222-222222222222', 'STUDENT'),
(5, 'd1111111-1111-1111-1111-111111111111', 'STUDENT'),
(5, 'd3333333-3333-3333-3333-333333333333', 'STUDENT'),
(6, 'd2222222-2222-2222-2222-222222222222', 'STUDENT'),
(6, 'd5555555-5555-5555-5555-555555555555', 'STUDENT')
ON CONFLICT (class_id, user_id) DO NOTHING;

-- ============================================================================
-- 6. ASSIGNMENTS, SUBMISSIONS, COMMENTS & RESOURCES
-- ============================================================================
INSERT INTO assignments (id, title, subject, description, status, due_date, due_time, color, teacher, class_id, created_by)
VALUES 
(
    5,
    'Mathematics',
    'Algebraic Analysis & Matrix Decomposition',
    'Solve eigenvalue problems for 3x3 Hermitian matrices, compute Singular Value Decomposition (SVD), and prove matrix invertibility conditions.',
    'pending',
    'Nov 10',
    '23:59',
    'bg-blue-100 text-blue-700',
    'Dr. Fatima Noor',
    6,
    'c4444444-4444-4444-4444-444444444444'
),
(
    6,
    'Physics',
    'Kinematics & Harmonic Motion Problem Set',
    'Derive the differential equation for damped harmonic oscillators and calculate the resonance frequency under varying damping coefficients.',
    'completed',
    'Oct 28',
    '18:00',
    'bg-emerald-100 text-emerald-700',
    'Prof. Ahmed Ali',
    5,
    'c7777777-7777-7777-7777-777777777777'
),
(
    7,
    'Arabic',
    'Classical Arabic Syntactic Parsing (إعراب معلقة امرئ القيس)',
    'Provide complete syntactic parsing for the first ten verses of the Muallaqah, identifying all nominal objects and conditional clauses.',
    'completed',
    'Oct 24',
    '14:00',
    'bg-emerald-100 text-emerald-700',
    'Dr. Sara Hassan',
    4,
    'c5555555-5555-5555-5555-555555555555'
),
(
    8,
    'Full-Stack Engineering',
    'End-to-End Test Automation with JUnit 5 & Mockito',
    'Write unit and integration tests covering JWT authentication, Spring Data JPA repositories, and REST controller mock request responses.',
    'pending',
    'Nov 14',
    '23:59',
    'bg-indigo-100 text-indigo-700',
    'Dr. Sarah Jenkins',
    1,
    'c2222222-2222-2222-2222-222222222222'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    subject = EXCLUDED.subject,
    description = EXCLUDED.description,
    status = EXCLUDED.status;

SELECT setval('assignments_id_seq', (SELECT MAX(id) FROM assignments));

-- Real Assignment Submissions for Student Khayreddine
INSERT INTO assignment_submissions (assignment_id, user_id, content, file_url, grade, feedback, status)
VALUES 
(
    1,
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Implemented stateless JWT authentication filter in Spring Security with 256-bit HMAC-SHA signing, custom user details service, and Flyway schema migration.',
    'https://github.com/altaalim/assignments/tree/main/jwt-auth',
    '98/100',
    'Exceptional implementation. Clean filter chain configuration and thorough exception handling.',
    'graded'
),
(
    2,
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Constructed self-balancing Red-Black Tree in Java with verified O(log n) insertion, deletion, and rotation tests. Implemented Dijkstra algorithm for weighted graph shortest paths.',
    'https://github.com/altaalim/assignments/tree/main/data-structures',
    '95/100',
    'Excellent solution. Time-complexity proofs and test assertions are well structured.',
    'graded'
),
(
    6,
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Derived damped harmonic oscillator equation and plotted analytical vs numerical Euler-Cromer integration curves showing Q-factor resonance shifts.',
    'https://altaalim.edu/uploads/assignments/khayreddine-physics-harmonic.pdf',
    '94/100',
    'Great graphical analysis and mathematical derivation.',
    'graded'
),
(
    7,
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'إعراب شامل ومعلل لأبيات معلقة امرئ القيس مع تحديد مواضع التقديم والتأخير وأدوات التشبيه البلاغية.',
    'https://altaalim.edu/uploads/assignments/khayreddine-arabic-parsing.pdf',
    '99/100',
    'إعراب دقيق ومتقن وتحليل بلاغي متميز. أحسنت!',
    'graded'
)
ON CONFLICT (assignment_id, user_id) DO UPDATE SET
    grade = EXCLUDED.grade,
    feedback = EXCLUDED.feedback,
    status = EXCLUDED.status;

-- Assignment Comments (Discussion Threads)
INSERT INTO assignment_comments (assignment_id, user_id, author_name, author_avatar, text)
VALUES 
(5, 'c4444444-4444-4444-4444-444444444444', 'Dr. Fatima Noor', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'For question 3 on SVD decomposition, remember that the singular values are the square roots of the eigenvalues of A^* A.'),
(5, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'Khayreddine Ahrar', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Thank you Dr. Fatima, that clarified the geometric interpretation as well.'),
(6, 'c7777777-7777-7777-7777-777777777777', 'Prof. Ahmed Ali', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', 'Be sure to state whether your system is underdamped, critically damped, or overdamped in question 2.'),
(8, 'c2222222-2222-2222-2222-222222222222', 'Dr. Sarah Jenkins', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Use @WebMvcTest for controller slices and keep service logic decoupled with @MockBean.');

-- Assignment Downloadable Resources
INSERT INTO assignment_resources (assignment_id, title, subject, type, size, url, description, image_url)
VALUES 
(5, 'Algebraic Formulas & Matrix Theorems Cheat Sheet', 'Mathematics', 'pdf', '2.4 MB', 'https://altaalim.edu/resources/algebra-formulas.pdf', 'Complete reference of eigenvalue properties, vector spaces, and determinants.', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop'),
(6, 'Kinematics & Harmonic Motion Formula Guide', 'Physics', 'pdf', '3.1 MB', 'https://altaalim.edu/resources/kinematics-guide.pdf', 'Kinematics equations, harmonic oscillation formulas, and friction dynamics.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop'),
(7, 'Classical Arabic Morphology & Syntax Summary (ملخص النحو والصرف)', 'Arabic', 'pdf', '4.5 MB', 'https://altaalim.edu/resources/arabic-grammar-summary.pdf', 'الجداول الإعرابية وقواعد النحو والصرف مع شواهد شعرية فصيحة.', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80'),
(8, 'JUnit 5 & Mockito Testing Architecture Handbook', 'Full-Stack Engineering', 'pdf', '2.8 MB', 'https://altaalim.edu/resources/testing-handbook.pdf', 'Best practices for writing maintainable Spring Boot test suites and MockMvc assertions.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop');

-- ============================================================================
-- 7. ACADEMIC CALENDAR EVENTS
-- ============================================================================
INSERT INTO calendar_events (id, user_id, title, description, start_time, end_time, color, event_type, reference_id)
VALUES 
(
    'f1111111-1111-1111-1111-111111111111',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Live Lecture: Advanced System Design & Distributed Caching',
    'Interactive lecture exploring consistent hashing, Redis clustering, and distributed locks.',
    '2026-11-03 10:00:00+00',
    '2026-11-03 11:30:00+00',
    '#4F46E5',
    'lecture',
    2
),
(
    'f2222222-2222-2222-2222-222222222222',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Office Hours with Dr. Sarah Jenkins',
    'Weekly 1-on-1 advising on Full-Stack capstone architecture and Docker deployment.',
    '2026-11-04 14:00:00+00',
    '2026-11-04 15:00:00+00',
    '#10B981',
    'office-hours',
    1
),
(
    'f3333333-3333-3333-3333-333333333333',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Midterm Exam: Multivariable Calculus & Linear Analysis',
    'Covers limits, directional derivatives, gradient vectors, and eigenvalue matrix transformations.',
    '2026-11-06 09:00:00+00',
    '2026-11-06 12:00:00+00',
    '#EF4444',
    'exam',
    6
),
(
    'f4444444-4444-4444-4444-444444444444',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'DevOps Workshop: Kubernetes Cluster Orchestration & Helm',
    'Hands-on lab deploying containerized microservices to Kubernetes clusters.',
    '2026-11-07 16:00:00+00',
    '2026-11-07 18:00:00+00',
    '#F59E0B',
    'workshop',
    3
),
(
    'f5555555-5555-5555-5555-555555555555',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Classical Arabic Poetry Recitation & Seminar (الأدب العربي)',
    'Colloquium analyzing classical poetic metrics, metaphors, and rhetoric in historical texts.',
    '2026-11-10 11:00:00+00',
    '2026-11-10 12:30:00+00',
    '#8B5CF6',
    'lecture',
    4
),
(
    'f6666666-6666-6666-6666-666666666666',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Assignment Submission Deadline: Algebraic Analysis & SVD',
    'Final deadline for submitting eigenvalue and singular value decomposition problem solutions.',
    '2026-11-10 23:59:00+00',
    '2026-11-10 23:59:00+00',
    '#DC2626',
    'deadline',
    5
),
(
    'f7777777-7777-7777-7777-777777777777',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Physics Laboratory: Harmonic Oscillators & Resonance',
    'Experimental validation of damped oscillations and frequency response curves in Newton Hall.',
    '2026-11-12 09:00:00+00',
    '2026-11-12 11:30:00+00',
    '#0EA5E9',
    'workshop',
    5
),
(
    'f8888888-8888-8888-8888-888888888888',
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Al Taalim Annual Hackathon & Innovation Showcase',
    '48-hour student hackathon presenting cutting-edge educational AI and full-stack solutions.',
    '2026-11-20 09:00:00+00',
    '2026-11-22 18:00:00+00',
    '#EC4899',
    'custom',
    NULL
)
ON CONFLICT (id) DO NOTHING;

-- Synchronize Student Preferences with Real Calendar Events for Frontend State
UPDATE users
SET preferences = jsonb_set(
    preferences,
    '{calendarEvents}',
    '[
        {"id": "f1111111-1111-1111-1111-111111111111", "title": "Live Lecture: System Design & Caching", "start": "2026-11-03T10:00:00Z", "end": "2026-11-03T11:30:00Z", "color": "#4F46E5", "description": "Interactive lecture exploring consistent hashing, Redis clustering, and distributed locks."},
        {"id": "f2222222-2222-2222-2222-222222222222", "title": "Office Hours: Dr. Sarah Jenkins", "start": "2026-11-04T14:00:00Z", "end": "2026-11-04T15:00:00Z", "color": "#10B981", "description": "Weekly 1-on-1 advising on Full-Stack capstone architecture and Docker deployment."},
        {"id": "f3333333-3333-3333-3333-333333333333", "title": "Midterm Exam: Multivariable Calculus", "start": "2026-11-06T09:00:00Z", "end": "2026-11-06T12:00:00Z", "color": "#EF4444", "description": "Covers limits, directional derivatives, gradient vectors, and eigenvalue matrix transformations."},
        {"id": "f4444444-4444-4444-4444-444444444444", "title": "DevOps Workshop: Kubernetes & Helm", "start": "2026-11-07T16:00:00Z", "end": "2026-11-07T18:00:00Z", "color": "#F59E0B", "description": "Hands-on lab deploying containerized microservices to Kubernetes clusters."},
        {"id": "f5555555-5555-5555-5555-555555555555", "title": "Classical Arabic Literature Colloquium", "start": "2026-11-10T11:00:00Z", "end": "2026-11-10T12:30:00Z", "color": "#8B5CF6", "description": "Colloquium analyzing classical poetic metrics, metaphors, and rhetoric in historical texts."},
        {"id": "f6666666-6666-6666-6666-666666666666", "title": "Deadline: Algebraic Analysis & SVD", "start": "2026-11-10T23:59:00Z", "end": "2026-11-10T23:59:00Z", "color": "#DC2626", "description": "Final deadline for submitting eigenvalue and singular value decomposition problem solutions."},
        {"id": "f7777777-7777-7777-7777-777777777777", "title": "Physics Lab: Harmonic Oscillators", "start": "2026-11-12T09:00:00Z", "end": "2026-11-12T11:30:00Z", "color": "#0EA5E9", "description": "Experimental validation of damped oscillations and frequency response curves in Newton Hall."},
        {"id": "f8888888-8888-8888-8888-888888888888", "title": "Al Taalim Annual Hackathon", "start": "2026-11-20T09:00:00Z", "end": "2026-11-22T18:00:00Z", "color": "#EC4899", "description": "48-hour student hackathon presenting cutting-edge educational AI and full-stack solutions."}
    ]'::jsonb,
    true
)
WHERE id = 'b3397b2d-daf5-4cec-864c-abd284807b82';

-- ============================================================================
-- 8. EXPANDED DIGITAL LIBRARY (10 Total Rich Textbooks & Papers)
-- ============================================================================
INSERT INTO library_items (id, title, author, category, format, size, image_url, color, description, toc, download_count)
VALUES 
(
    5,
    'Calculus: Early Transcendentals (9th Edition)',
    'James Stewart',
    'Mathematics',
    'PDF',
    '28.5 MB',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    'bg-blue-50 text-blue-700',
    'The gold standard in university calculus education. Features limits, derivatives, integration techniques, and multivariable theorems with engineering applications.',
    '["Chapter 1: Functions and Limits", "Chapter 2: Derivatives and Chain Rule", "Chapter 3: Applications of Differentiation", "Chapter 4: Integrals and Fundamental Theorem", "Chapter 5: Multivariable Calculus and Vectors"]'::jsonb,
    142
),
(
    6,
    'The Feynman Lectures on Physics: Volume 1',
    'Dr. Richard Feynman',
    'Physics',
    'PDF',
    '19.4 MB',
    'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
    'bg-indigo-50 text-indigo-700',
    'The legendary physics lectures exploring Newtonian mechanics, radiation, energy conservation, thermodynamics, and the atomic hypothesis.',
    '["Chapter 1: Atoms in Motion", "Chapter 2: Basic Physics Principles", "Chapter 3: The Relation of Physics to Other Sciences", "Chapter 4: Conservation of Energy", "Chapter 5: Theory of Gravitation"]'::jsonb,
    215
),
(
    7,
    'Modern Arabic Literature & Classical Poetics (دراسات في الأدب العربي)',
    'Taha Hussein',
    'Arabic',
    'EPUB',
    '5.2 MB',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    'bg-emerald-50 text-emerald-700',
    'An essential critical analysis of pre-Islamic and classical Arabic prose, poetry metrics, and historical literary transformations.',
    '["الباب الأول: نشأة الشعر الجاهلي وأوزانه", "الباب الثاني: عصر النهضة الأدبية وتطور النثر", "الباب الثالث: البلاغة والإعجاز البياني", "الباب الرابع: دراسة نقدية لنماذج شعرية مختارة"]'::jsonb,
    98
),
(
    8,
    'The Muqaddimah: An Introduction to History',
    'Ibn Khaldun',
    'History & Philosophy',
    'PDF',
    '12.8 MB',
    'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    'bg-amber-50 text-amber-700',
    'Foundational masterpiece of sociology, political philosophy, and historical historiography analyzing human civilization and social cohesion (Asabiyyah).',
    '["Prologue: The Purpose of Historical Science", "Chapter 1: Human Civilization in General", "Chapter 2: Bedouin and Sedentary Societies", "Chapter 3: Dynasties, the Caliphate, and Royal Authority", "Chapter 4: The Arts, Crafts, and Sciences"]'::jsonb,
    184
),
(
    9,
    'Deep Learning: Adaptive Systems & Neural Networks',
    'Ian Goodfellow & Yoshua Bengio',
    'Artificial Intelligence',
    'PDF',
    '16.7 MB',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    'bg-purple-50 text-purple-700',
    'The definitive academic textbook covering mathematical foundations, deep feedforward networks, regularization, convolutional architectures, and generative models.',
    '["Part I: Applied Math and Machine Learning Basics", "Part II: Deep Networks: Modern Practices", "Part III: Deep Learning Research: Autoencoders and GANs"]'::jsonb,
    310
),
(
    10,
    'Site Reliability Engineering: How Google Runs Production Systems',
    'Betsy Beyer, Chris Jones, Niall Murphy',
    'DevOps & Cloud',
    'PDF',
    '7.9 MB',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    'bg-cyan-50 text-cyan-700',
    'Insights into the architecture, organizational culture, monitoring pipelines, and incident management of planetary-scale software systems.',
    '["Part I: Introduction to SRE", "Part II: Principles of Reliability & SLIs/SLOs", "Part III: Practices: Monitoring, Automation, and Incident Response"]'::jsonb,
    167
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    author = EXCLUDED.author,
    category = EXCLUDED.category,
    description = EXCLUDED.description;

SELECT setval('library_items_id_seq', (SELECT MAX(id) FROM library_items));

-- ============================================================================
-- 9. CONVERSATIONS & CHAT THREADS (Real Student-Faculty Interactions)
-- ============================================================================
INSERT INTO conversations (id, title, is_group)
VALUES 
(3, 'Khalid Al Walid (DevOps Study Partner)', false),
(4, 'Dr. Fatima Noor (Mathematics Office Hours)', false),
(5, 'Al Taalim Full-Stack Capstone Study Group', true)
ON CONFLICT (id) DO NOTHING;

SELECT setval('conversations_id_seq', (SELECT MAX(id) FROM conversations));

INSERT INTO conversation_participants (conversation_id, user_id)
VALUES 
(3, 'b3397b2d-daf5-4cec-864c-abd284807b82'),
(3, 'd1111111-1111-1111-1111-111111111111'),
(4, 'b3397b2d-daf5-4cec-864c-abd284807b82'),
(4, 'c4444444-4444-4444-4444-444444444444'),
(5, 'b3397b2d-daf5-4cec-864c-abd284807b82'),
(5, 'c2222222-2222-2222-2222-222222222222'),
(5, 'd1111111-1111-1111-1111-111111111111'),
(5, 'd2222222-2222-2222-2222-222222222222'),
(5, 'd5555555-5555-5555-5555-555555555555')
ON CONFLICT (conversation_id, user_id) DO NOTHING;

-- Threaded Messages
INSERT INTO messages (conversation_id, sender_id, sender_name, sender_avatar, text, is_read, created_at)
VALUES 
-- Thread 3: Khalid Al Walid
(3, 'd1111111-1111-1111-1111-111111111111', 'Khalid Al Walid', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Salam Khayreddine! Did you manage to test the Nginx reverse proxy with Docker Compose?', true, CURRENT_TIMESTAMP - INTERVAL '3 hour'),
(3, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'Khayreddine Ahrar', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500', 'Wa alaykum assalam Khalid! Yes, both compose.yaml and compose.prod.yaml are configured and validated. The health check runs cleanly.', true, CURRENT_TIMESTAMP - INTERVAL '2 hour'),
(3, 'd1111111-1111-1111-1111-111111111111', 'Khalid Al Walid', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', 'Awesome! Let''s sync up during the DevOps workshop on Friday to deploy the Kubernetes ingress controller.', false, CURRENT_TIMESTAMP - INTERVAL '30 minute'),

-- Thread 4: Dr. Fatima Noor
(4, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'Khayreddine Ahrar', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500', 'Good morning Dr. Fatima. For the midterm exam on Friday, will multivariable optimization include Lagrange multipliers?', true, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(4, 'c4444444-4444-4444-4444-444444444444', 'Dr. Fatima Noor', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Yes Khayreddine, there will be one question on constrained optimization with two equality constraints. Review chapter 5 examples 3 and 4.', true, CURRENT_TIMESTAMP - INTERVAL '20 hour'),

-- Thread 5: Capstone Group
(5, 'c2222222-2222-2222-2222-222222222222', 'Dr. Sarah Jenkins', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Welcome to the Capstone Project discussion! Remember that all database entities must have complete Flyway versioning.', true, CURRENT_TIMESTAMP - INTERVAL '2 day'),
(5, 'd2222222-2222-2222-2222-222222222222', 'Amal Hamdalah', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'I have drafted the entity relationship diagram for course enrollments and certificate verification.', true, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(5, 'b3397b2d-daf5-4cec-864c-abd284807b82', 'Khayreddine Ahrar', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500', 'The schema migrations V1 and V2 are running successfully on PostgreSQL 16 Alpine. We are ready for live testing.', false, CURRENT_TIMESTAMP - INTERVAL '1 hour');

-- ============================================================================
-- 10. REAL SYSTEM & ACADEMIC NOTIFICATIONS
-- ============================================================================
INSERT INTO notifications (user_id, title, body, icon, icon_bg, icon_color, is_read, link)
VALUES 
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Assignment Graded: 99/100 (Arabic Syntactic Parsing)',
    'Dr. Sara Hassan reviewed and graded your parsing of the Muallaqah with top academic honors.',
    'award',
    'bg-emerald-100',
    'text-emerald-600',
    false,
    '/dashboard/assignments'
),
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Midterm Exam Schedule Finalized',
    'Multivariable Calculus & Linear Analysis examination is confirmed for Friday, Nov 6 at 09:00 AM.',
    'calendar',
    'bg-blue-100',
    'text-blue-600',
    false,
    '/dashboard/calendar'
),
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Official Certificate Issued: Arabic Linguistics',
    'Congratulations! Your verified certificate ALT-ARB-2026-55210 is now available for download.',
    'award',
    'bg-amber-100',
    'text-amber-600',
    false,
    '/dashboard/account'
),
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'New Book Added to Library: Deep Learning',
    'Ian Goodfellow and Yoshua Bengio''s textbook is now available in PDF in the AI section.',
    'book',
    'bg-purple-100',
    'text-purple-600',
    true,
    '/dashboard/library'
),
(
    'b3397b2d-daf5-4cec-864c-abd284807b82',
    'Virtual Classroom Reminder: Classical Mechanics',
    'Prof. Ahmed Ali''s live lecture begins in 1 hour in Newton Hall 4-B.',
    'alert',
    'bg-indigo-100',
    'text-indigo-600',
    true,
    '/dashboard/classes'
);

-- ============================================================================
-- 11. RICH USER ACTIVITY LOGS (Powers Dashboard Analytics & KPI Charts)
-- ============================================================================
INSERT INTO user_activity_logs (user_id, activity_type, hours_spent, activity_date)
VALUES 
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 4.5, CURRENT_DATE - INTERVAL '14 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'ASSIGNMENT_PRACTICE', 3.0, CURRENT_DATE - INTERVAL '13 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'LAB_WORK', 5.0, CURRENT_DATE - INTERVAL '12 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 3.2, CURRENT_DATE - INTERVAL '11 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'QUIZ_ATTEMPT', 2.0, CURRENT_DATE - INTERVAL '10 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'COURSE_STUDY', 4.0, CURRENT_DATE - INTERVAL '9 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'ASSIGNMENT_PRACTICE', 3.5, CURRENT_DATE - INTERVAL '8 day'),
('b3397b2d-daf5-4cec-864c-abd284807b82', 'LAB_WORK', 6.0, CURRENT_DATE - INTERVAL '7 day');
