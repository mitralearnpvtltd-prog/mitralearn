-- Product Management Curriculum (using Product Marketing course_id: 5ba36598-e728-403e-8263-7900d530eef4)
DELETE FROM lesson_resources WHERE lesson_id IN (SELECT lesson_id FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = '5ba36598-e728-403e-8263-7900d530eef4'));
DELETE FROM course_lessons WHERE module_id IN (SELECT module_id FROM course_modules WHERE course_id = '5ba36598-e728-403e-8263-7900d530eef4');
DELETE FROM course_modules WHERE course_id = '5ba36598-e728-403e-8263-7900d530eef4';

INSERT INTO course_modules (course_id, module_order, title, description) VALUES
('5ba36598-e728-403e-8263-7900d530eef4', 1, 'Introduction to Product Management', 'PM fundamentals and lifecycle'),
('5ba36598-e728-403e-8263-7900d530eef4', 2, 'Market and Customer Analysis', 'Segmentation, targeting and competitive analysis'),
('5ba36598-e728-403e-8263-7900d530eef4', 3, 'Ideation and Validation', 'Idea generation and MVP concepts'),
('5ba36598-e728-403e-8263-7900d530eef4', 4, 'Customer Centric Design and UX', 'User personas and design thinking'),
('5ba36598-e728-403e-8263-7900d530eef4', 5, 'Go To Market Strategy', 'GTM fundamentals and positioning'),
('5ba36598-e728-403e-8263-7900d530eef4', 6, 'Product Engineering and Agile', 'Agile methodology and roadmapping'),
('5ba36598-e728-403e-8263-7900d530eef4', 7, 'Pricing Sales and Distribution', 'Pricing and sales strategies'),
('5ba36598-e728-403e-8263-7900d530eef4', 8, 'Product Launch and Lifecycle Management', 'Launch planning and KPIs'),
('5ba36598-e728-403e-8263-7900d530eef4', 9, 'Product Management Project', 'PM case study project');