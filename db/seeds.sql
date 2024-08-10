INSERT INTO departments (name)
    VALUES
        ('Finance'),
        ('Marketting'),
        ('Human Resources'),
        ('Management');

INSERT INTO roles (departments_id, salary, name)
    VALUES
        (1, 50000, 'Accountant'),
        (2, 80000, 'Market Analyst'),
        (3, 30000, 'HR Manager'),
        (4, 100000, 'CEO');

INSERT INTO employees (f_name, l_name, roles_id)
    VALUES
        ('Jonathan', 'Grommesh', 4),
        ('Walter', 'Black', 1),
        ('Steff', 'Curry', 1),
        ('Jake', 'Trask', 2),
        ('Freddie', 'Baby', 3);