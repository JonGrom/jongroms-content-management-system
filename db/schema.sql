DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INTEGER NOT NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    f_name VARCHAR(30) NOT NULL,
    l_name VARCHAR(30) NOT NULL, 
    roles_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);