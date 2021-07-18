/*Create database*/
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

/*Use database*/
USE company_db;

/*Create department table*/
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

/*Create role table*/
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(11,2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id)
        REFERENCES department(id)
);

/*Create employee table*/
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT fk_role
    FOREIGN KEY (role_id)
        REFERENCES role(id),
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
);

