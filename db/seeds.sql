INSERT INTO department (department_name);
VALUES ('Cleaning'), ('Warehouse'), ('Sales')

INSERT INTO  role (title, salary, department_id);
VALUES 
    ('Custodial Manager', 55000.00, 1), 
    ('Overnight Janitor', 42500.00, 1),
    ('Stocker', 45000.00, 2),
    ('Delivery Driver', 50000.00, 2),
    ('Warehouse Manager', 110000.00, 2)
    ('Lead Saleman', 82500.00, 3),
    ('Entry Salesman', 55000.00, 3)

INSERT INTO employee (first_name, last_name, role_id
manager_id)
VALUES
    ('John', 'Apple', 1, NULL),
    ('Mark', 'Jackson', 2, 1),
    ('Jeff', 'Kinel', 2, 1),
    ('Andre', 'Bosco', 3, 7),
    ('Jackson', 'Hyatt', 3, 7),
    ('Brian', 'Thompson', 4, 7),
    ('Clark', 'Park', 5, NULL),
    ('Mike', 'Aston', 6, NULL),
    ('Bradley', 'Martin', 7, 8),
    ('Chad', 'Williams', 7, 8)

