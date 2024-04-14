INSERT INTO departments (name) VALUES ('Human Resources'), ('Engineering'), ('Sales');

INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 65000.00, 1), ('Software Engineer', 85000.00, 2), ('Sales Representative', 55000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', 1, NULL), ('John', 'Smith', 2, NULL), ('Alice', 'Johnson', 3, NULL);
