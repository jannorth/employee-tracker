USE employees;

INSERT INTO department (name) 
VALUES ('Human Resources'), ('Legal'), ('Finance'), ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Kat', 'Stewart', 1, NULL),
  ('Richard', 'Davies', 2, 1),
  ('Linda', 'Cropper', 3, NULL),
  ('John', 'Waters', 4, 3),
  ('Eddie', 'Perfect', 5, NULL),
  ('Deborah', 'Mailman', 6, 5),
  ('Asher', 'Keddie', 7, NULL),
  ('Matthew', 'Le Nevez', 8, 7);