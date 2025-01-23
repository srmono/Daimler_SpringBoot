MySQL supports various types of queries for interacting with and manipulating data. These queries can be broadly classified into categories based on their purpose:

---

### **1. Data Definition Language (DDL) Queries**
DDL queries are used to define or modify the structure of database objects (e.g., tables, indexes, schemas).

| **Query Type**    | **Purpose**                                                                                  | **Example**                                                                                 |
|--------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **CREATE**         | Creates a new database object, such as a table or schema.                                   | `CREATE TABLE employees (id INT, name VARCHAR(50));`                                        |
| **ALTER**          | Modifies the structure of an existing database object (e.g., adding or dropping columns).   | `ALTER TABLE employees ADD age INT;`                                                       |
| **DROP**           | Deletes a database object completely (e.g., table, database).                               | `DROP TABLE employees;`                                                                     |
| **TRUNCATE**       | Removes all rows from a table, but keeps the structure intact.                              | `TRUNCATE TABLE employees;`                                                                 |

---

### **2. Data Manipulation Language (DML) Queries**
DML queries are used to insert, update, delete, or retrieve data stored in the database.

| **Query Type**    | **Purpose**                                                                                  | **Example**                                                                                 |
|--------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **SELECT**         | Retrieves data from one or more tables.                                                     | `SELECT * FROM employees;`                                                                  |
| **INSERT**         | Adds new rows of data to a table.                                                           | `INSERT INTO employees (id, name) VALUES (1, 'Alice');`                                     |
| **UPDATE**         | Modifies existing data in a table.                                                          | `UPDATE employees SET name = 'Bob' WHERE id = 1;`                                           |
| **DELETE**         | Removes specific rows from a table.                                                         | `DELETE FROM employees WHERE id = 1;`                                                      |

---

### **3. Data Query Language (DQL) Queries**
DQL focuses specifically on querying and retrieving data. It includes the **SELECT** statement.

| **Query Type**    | **Purpose**                                                                                  | **Example**                                                                                 |
|--------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **SELECT**         | Retrieves data from a database, often with filtering, sorting, or grouping.                 | `SELECT name, age FROM employees WHERE age > 30 ORDER BY name;`                             |

*Note*: While DQL is often included under DML, it is sometimes treated as a distinct category.

---

### **4. Transaction Control Language (TCL) Queries**
TCL queries are used to manage transactions, ensuring data integrity and consistency.

| **Query Type**    | **Purpose**                                                                                  | **Example**                                                                                 |
|--------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **COMMIT**         | Saves all changes made during the transaction.                                              | `COMMIT;`                                                                                   |
| **ROLLBACK**       | Reverts changes made during the current transaction.                                         | `ROLLBACK;`                                                                                |
| **SAVEPOINT**      | Sets a point within a transaction that can be rolled back to.                               | `SAVEPOINT sp1;`                                                                            |
| **SET TRANSACTION**| Configures the transaction properties like isolation level.                                  | `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`                                          |

---

### **5. Data Control Language (DCL) Queries**
DCL queries are used to control access to the database, managing permissions and security.

| **Query Type**    | **Purpose**                                                                                  | **Example**                                                                                 |
|--------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **GRANT**          | Grants specific privileges to a user or role.                                               | `GRANT SELECT, INSERT ON employees TO 'user1'@'localhost';`                                 |
| **REVOKE**         | Removes specific privileges from a user or role.                                            | `REVOKE INSERT ON employees FROM 'user1'@'localhost';`                                      |

---

### **6. Utility Queries**
Utility queries provide additional functionality such as database management and analysis.

| **Query Type**    | **Purpose**                                                                                  | **Example**                                                                                 |
|--------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **SHOW**           | Displays metadata about the database or its objects.                                        | `SHOW TABLES;`                                                                              |
| **DESCRIBE**       | Provides details about the structure of a table.                                            | `DESCRIBE employees;`                                                                       |
| **USE**            | Selects a specific database to use for subsequent queries.                                  | `USE my_database;`                                                                          |
| **EXPLAIN**        | Displays how a SELECT query is executed (for query optimization).                           | `EXPLAIN SELECT * FROM employees WHERE age > 30;`                                           |

---

### **Summary**
| **Category** | **Key Queries**                                     | **Purpose**                           |
|--------------|-----------------------------------------------------|---------------------------------------|
| **DDL**      | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`               | Structure management.                |
| **DML**      | `INSERT`, `UPDATE`, `DELETE`, `SELECT`              | Data manipulation.                   |
| **DQL**      | `SELECT`                                            | Data querying.                       |
| **TCL**      | `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `SET TRANSACTION`| Transaction management.              |
| **DCL**      | `GRANT`, `REVOKE`                                   | Access control.                      |
| **Utility**  | `SHOW`, `DESCRIBE`, `USE`, `EXPLAIN`                | Metadata and utility queries.        |

Let me know if you'd like more examples for specific query types!