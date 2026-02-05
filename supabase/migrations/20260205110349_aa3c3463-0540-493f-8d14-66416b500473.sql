-- Python AI Engineer Curriculum (course_id: fa6eb1c4-5d4b-4740-8140-2253c0f1d481)
DELETE FROM lesson_resources WHERE lesson_id IN (SELECT lesson_id FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = 'fa6eb1c4-5d4b-4740-8140-2253c0f1d481'));
DELETE FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = 'fa6eb1c4-5d4b-4740-8140-2253c0f1d481');
DELETE FROM course_modules WHERE course_id = 'fa6eb1c4-5d4b-4740-8140-2253c0f1d481';

INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 1, 'Python Programming Fundamentals', 'Introduction to Python and data types'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 2, 'Python for Data Handling', 'NumPy and Pandas for data analysis'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 3, 'Data Visualization', 'Matplotlib and Seaborn'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 4, 'Statistics & Math for AI', 'Statistical foundations and linear algebra'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 5, 'Machine Learning Fundamentals', 'ML concepts and algorithms'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 6, 'Deep Learning', 'Neural networks and TensorFlow'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 7, 'AI Applications', 'NLP and Computer Vision'),
('fa6eb1c4-5d4b-4740-8140-2253c0f1d481', 8, 'AI Capstone Project', 'End-to-end AI project');

-- AI Engineer Curriculum (course_id: b6f51905-c7df-486a-83a6-36ffda84d8ad)
DELETE FROM lesson_resources WHERE lesson_id IN (SELECT lesson_id FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = 'b6f51905-c7df-486a-83a6-36ffda84d8ad'));
DELETE FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = 'b6f51905-c7df-486a-83a6-36ffda84d8ad');
DELETE FROM course_modules WHERE course_id = 'b6f51905-c7df-486a-83a6-36ffda84d8ad';

INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 1, 'Foundations of AI', 'AI fundamentals and applications'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 2, 'Python for AI Engineering', 'Python basics for AI development'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 3, 'Mathematics for AI', 'Linear algebra and statistics'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 4, 'Data Handling & Analysis', 'Data processing with NumPy and Pandas'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 5, 'Machine Learning Fundamentals', 'ML algorithms and evaluation'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 6, 'Deep Learning Basics', 'Neural networks and frameworks'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 7, 'Natural Language Processing', 'NLP techniques and transformers'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 8, 'Computer Vision Basics', 'Image processing and CNNs'),
('b6f51905-c7df-486a-83a6-36ffda84d8ad', 9, 'Project', 'AI Resume Skill Matcher');