INSERT INTO departments (name) VALUES ('Human Resources');
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Sales');

INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 65000.00, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 85000.00, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Representative', 55000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 2, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Johnson', 3, NULL);