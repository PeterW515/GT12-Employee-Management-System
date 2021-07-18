/*Use company db*/
USE company_db;

/*Create seed data for department*/
INSERT INTO department (name)
VALUES ("Accounting"),("Engineering"),("Human Resources");

/*Create seed data for role*/
INSERT INTO role (title, salary, department_id)
VALUES ("Mechanical Engineer",70000,(SELECT id FROM department
WHERE name="Engineering")),
("Electrical Engineer",75000,(SELECT id FROM department
WHERE name="Engineering")),
("Industrial Engineer",68000,(SELECT id FROM department
WHERE name="Engineering")),
("Manager",100000,(SELECT id FROM department
WHERE name="Engineering")),
("Accountant",80000,(SELECT id FROM department
WHERE name="Accounting")),
("Senior Accountant",90000,(SELECT id FROM department
WHERE name="Accounting")),
("Manager",100000,(SELECT id FROM department
WHERE name="Accounting")),
("Associate",50000,(SELECT id FROM department
WHERE name="Human Resources")),
("Director",110000,(SELECT id FROM department
WHERE name="Human Resources"));

/*Create seed data for employee*/
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Tom", "Smith", (SELECT id FROM role WHERE title = 'Manager'
AND department_id = (SELECT id FROM department WHERE name = "Engineering")),null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John", "Appleseed", (SELECT id FROM role WHERE title = 'Manager'
AND department_id = (SELECT id FROM department WHERE name = "Accounting")),null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Sarah", "Johnson", (SELECT id FROM role WHERE title = 'Director'
AND department_id = (SELECT id FROM department WHERE name = "Human Resources")),null);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Sally", "Ward", (SELECT id FROM role WHERE title = 'Mechanical Engineer'),
1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Bob", "Franks", (SELECT id FROM role WHERE title = 'Electrical Engineer'),
1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Colin", "Kane", (SELECT id FROM role WHERE title = 'Industrial Engineer'),
1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Sam", "Flood", (SELECT id FROM role WHERE title = 'Accountant'),
2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Taylor", "Gregory", (SELECT id FROM role WHERE title = 'Senior Accountant'),
2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Sue", "Crane", (SELECT id FROM role WHERE title = 'Associate'),
3);

