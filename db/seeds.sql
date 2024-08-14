INSERT INTO departments (name)
    VALUES
        ('Finance'),
        ('Marketting'),
        ('Management');

INSERT INTO roles (departments_id, salary, name)
    VALUES
        (1, 250000, 'Finance Director'),
        (2, 120000, 'Market Analyst'),
        (3, 40000, 'Maketting Intern'),
        (4, 1000000, 'CEO');

INSERT INTO employees (f_name, l_name, roles_id, manager_id)
    VALUES
        ('Logan', 'Roy', 4, NULL),
        ('Kendall', 'Roy', 1, 1),
        ('Siobhan', 'Roy', 1, 1),
        ('Tom', 'Wambsgans', 2, 1),
        ('Greg', 'Hirsch', 3, 4);



