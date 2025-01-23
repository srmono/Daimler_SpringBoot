When working with tables in MySQL, you frequently use a variety of queries to **create**, **modify**, **inspect**, and **manage** tables and their data. Here's a comprehensive guide to the most common **table-related queries** in MySQL:

---

### **1. Creating Tables**
Use the `CREATE TABLE` statement to define a new table with its columns, data types, and constraints.

#### Basic Syntax:
```sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
);
```

#### Example:
```sql
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept_id INT,
    salary DECIMAL(10, 2),
    hire_date DATE
);
```

---

### **2. Viewing Table Structure**
To inspect the structure of a table, use `DESCRIBE` or `SHOW COLUMNS`.

#### Example:
```sql
DESCRIBE employees;
-- or
SHOW COLUMNS FROM employees;
```

**Result**:
| Field     | Type          | Null | Key | Default | Extra          |
|-----------|---------------|------|-----|---------|----------------|
| id        | int           | NO   | PRI | NULL    | auto_increment |
| name      | varchar(50)   | NO   |     | NULL    |                |
| dept_id   | int           | YES  |     | NULL    |                |
| salary    | decimal(10,2) | YES  |     | NULL    |                |
| hire_date | date          | YES  |     | NULL    |                |

---

### **3. Modifying Tables**
Use the `ALTER TABLE` statement to change an existing table's structure.

#### Add a Column:
```sql
ALTER TABLE employees ADD age INT;
```

#### Modify a Column:
```sql
ALTER TABLE employees MODIFY salary DECIMAL(12, 2);
```

#### Rename a Column:
```sql
ALTER TABLE employees CHANGE name full_name VARCHAR(100);
```

#### Drop a Column:
```sql
ALTER TABLE employees DROP COLUMN age;
```

---

### **4. Renaming Tables**
Use the `RENAME` statement to change a table's name.

#### Example:
```sql
RENAME TABLE employees TO staff;
```

---

### **5. Dropping Tables**
The `DROP TABLE` statement removes a table and all its data permanently.

#### Example:
```sql
DROP TABLE employees;
```

---

### **6. Truncating Tables**
The `TRUNCATE TABLE` statement deletes all rows from a table but retains its structure.

#### Example:
```sql
TRUNCATE TABLE employees;
```

---

### **7. Copying Tables**
To create a new table with the same structure as an existing table:

#### Copy Structure Only:
```sql
CREATE TABLE new_employees LIKE employees;
```

#### Copy Structure and Data:
```sql
CREATE TABLE new_employees AS SELECT * FROM employees;
```

---

### **8. Inserting Data into Tables**
Insert rows of data using the `INSERT INTO` statement.

#### Insert a Single Row:
```sql
INSERT INTO employees (name, dept_id, salary, hire_date)
VALUES ('Alice', 101, 50000.00, '2023-01-15');
```

#### Insert Multiple Rows:
```sql
INSERT INTO employees (name, dept_id, salary, hire_date)
VALUES
('Bob', 102, 60000.00, '2022-05-10'),
('Charlie', 103, 70000.00, '2021-09-20');
```

---

### **9. Retrieving Data from Tables**
Use the `SELECT` statement to fetch data.

#### Basic Query:
```sql
SELECT * FROM employees;
```

#### Filter Data:
```sql
SELECT name, salary FROM employees WHERE salary > 60000;
```

#### Sort Results:
```sql
SELECT * FROM employees ORDER BY hire_date DESC;
```

#### Aggregate Data:
```sql
SELECT dept_id, COUNT(*) AS num_employees FROM employees GROUP BY dept_id;
```

---

### **10. Updating Table Data**
Modify existing rows with the `UPDATE` statement.

#### Example:
```sql
UPDATE employees
SET salary = salary * 1.1
WHERE dept_id = 101;
```

---

### **11. Deleting Data from Tables**
Remove rows from a table with the `DELETE` statement.

#### Example:
```sql
DELETE FROM employees WHERE dept_id = 103;
```

---

### **12. Adding Constraints**
You can add constraints while creating or modifying tables.

#### Examples:
- **Primary Key**:
  ```sql
  ALTER TABLE employees ADD PRIMARY KEY (id);
  ```

- **Foreign Key**:
  ```sql
  ALTER TABLE employees
  ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(id);
  ```

- **Unique Key**:
  ```sql
  ALTER TABLE employees ADD UNIQUE (name);
  ```

---

### Summary of Commands:
| **Action**               | **Query Example**                                         |
|--------------------------|----------------------------------------------------------|
| Create a table           | `CREATE TABLE table_name (...)`                          |
| View structure           | `DESCRIBE table_name` or `SHOW COLUMNS FROM table_name`  |
| Add a column             | `ALTER TABLE table_name ADD column_name data_type`       |
| Modify a column          | `ALTER TABLE table_name MODIFY column_name data_type`    |
| Drop a column            | `ALTER TABLE table_name DROP COLUMN column_name`         |
| Rename a table           | `RENAME TABLE old_name TO new_name`                      |
| Delete all rows          | `TRUNCATE TABLE table_name`                              |
| Drop a table             | `DROP TABLE table_name`                                  |
| Copy structure only      | `CREATE TABLE new_table LIKE existing_table`             |
| Copy structure + data    | `CREATE TABLE new_table AS SELECT * FROM existing_table` |
| Insert data              | `INSERT INTO table_name (...) VALUES (...)`              |
| Update data              | `UPDATE table_name SET column=value WHERE condition`     |
| Delete rows              | `DELETE FROM table_name WHERE condition`                |

