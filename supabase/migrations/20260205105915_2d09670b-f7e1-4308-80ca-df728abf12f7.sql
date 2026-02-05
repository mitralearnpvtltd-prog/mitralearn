-- Full Stack Developer Curriculum (course_id: 662b6923-f657-4402-87ee-07f8c1fb5943)
-- Clear existing curriculum for this course
DELETE FROM lesson_resources WHERE lesson_id IN (SELECT lesson_id FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = '662b6923-f657-4402-87ee-07f8c1fb5943'));
DELETE FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = '662b6923-f657-4402-87ee-07f8c1fb5943');
DELETE FROM course_modules WHERE course_id = '662b6923-f657-4402-87ee-07f8c1fb5943';

-- Module 1: Web Fundamentals
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 1, 'Web Fundamentals', 'Learn how the internet works and HTML basics');

-- Module 2: CSS & Responsive Design
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 2, 'CSS & Responsive Design', 'Master CSS styling and responsive layouts');

-- Module 3: JavaScript Programming
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 3, 'JavaScript Programming', 'Learn JavaScript fundamentals and DOM manipulation');

-- Module 4: Frontend Development
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 4, 'Frontend Development', 'Build modern UIs with React');

-- Module 5: Backend Development
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 5, 'Backend Development', 'Server-side development with Node.js and Express');

-- Module 6: Databases
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 6, 'Databases', 'Database management with MongoDB');

-- Module 7: Full Stack Integration
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 7, 'Full Stack Integration', 'Combine frontend and backend with MERN stack');

-- Module 8: Tools & Deployment
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 8, 'Tools & Deployment', 'Version control and deployment strategies');

-- Module 9: Projects & Portfolio
INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('662b6923-f657-4402-87ee-07f8c1fb5943', 9, 'Projects & Portfolio', 'Build your portfolio with full stack projects');