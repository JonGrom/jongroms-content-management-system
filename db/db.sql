DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c course_db
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    f_name VARCHAR(30) NOT NULL,
    l_name VARCHAR(30) NOT NULL, 
    role_id INTEGER NOT NULL,
    manager_id INTEGER,

);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
);