SELECT * FROM roles LEFT JOIN employees ON roles.id = employees.roles_id;
SELECT * FROM departments LEFT JOIN roles ON departments.id = roles.departments_id;