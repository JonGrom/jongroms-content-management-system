-- SELECT * FROM roles LEFT JOIN employees ON roles.id = employees.roles_id;
-- SELECT * FROM departments LEFT JOIN roles ON departments.id = roles.departments_id LEFT JOIN ;

-- SELECT * FROM employees JOIN roles ON employees.roles_id = roles.id JOIN departments ON roles.departments_id = departments.id;

-- SELECT employees.id, f_name AS First_Name , l_name AS Last_Name, roles.name AS Title, departments.name AS Department, salary AS Salary FROM employees JOIN roles ON employees.roles_id = roles.id JOIN departments ON roles.departments_id = departments.id;

-- SELECT employees.id, f_name AS First_Name , l_name AS Last_Name, roles.name AS Title, departments.name AS Department, salary AS Salary FROM employees JOIN roles ON employees.roles_id = roles.id JOIN departments ON roles.departments_id = departments.id;

-- SELECT roles.id, roles.name AS Role, departments.name AS Department FROM roles JOIN departments ON roles.departments_id = departments.id;

-- UPDATE employees SET role_id = X WHERE id = 

UPDATE employees SET roles_id = 6 WHERE employees.id = 2;

SELECT * FROM roles;

SELECT * FROM employees;