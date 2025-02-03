### **Assignment: Backend Development for a Simple Inventory System with Exception Handling**

**Objective**:  
Students will implement exception handling in their backend system for managing products and orders. This includes handling common errors (e.g., invalid input, missing resources) and returning appropriate responses to the client.

---

### **Exceptions to Handle**:

1. **Product Not Found**: When attempting to retrieve or update a product that does not exist.
2. **Invalid Input**: For creating or updating products/orders, where the data is invalid (e.g., missing fields or incorrect data types).
3. **Out of Stock**: When an order is placed for more products than are available in stock.
4. **General Server Errors**: Any unexpected issues with the database or server.
5. **Invalid Order Status**: When an order status is updated to an invalid value.

---

### **Extended Requirements with Exception Handling**:

1. **Product Management**:
   - **Add a Product**: 
     - If any required field is missing (e.g., price or stock), the server should respond with a **400 Bad Request** and a descriptive error message.
     - **Exception Handling**: Validate the incoming data and return a 400 response for invalid data.
   - **Get Product**: 
     - If the requested product does not exist, return a **404 Not Found**.
   - **Update Product**: 
     - If the product does not exist, return a **404 Not Found**.
     - If updating stock results in negative stock values, return a **400 Bad Request** (e.g., "Cannot set stock to a negative value").
   - **Delete Product**:
     - If the product does not exist, return a **404 Not Found**.

2. **Order Management**:
   - **Create Order**: 
     - If the order quantity exceeds the available stock, return a **400 Bad Request** with a message like "Not enough stock available".
     - If the product ID does not exist, return a **404 Not Found**.
   - **Get Order**: 
     - If the order does not exist, return a **404 Not Found**.
   - **Invalid Order Status Update**: 
     - If the status provided is not valid (e.g., not one of the allowed statuses: "Pending", "Completed"), return a **400 Bad Request**.

3. **Server Errors**:
   - If there is any unexpected issue (e.g., database connection error), return a **500 Internal Server Error** with a general message like "An error occurred, please try again later."

---

### **Exception Handling Guidelines**:

1. **Product Not Found (404)**:
   - **Example**: If a GET request is made for a non-existing product, the server should return:
     ```json
     {
       "error": "Product not found",
       "message": "The product with ID {id} does not exist."
     }
     ```
   - **HTTP Status**: `404 Not Found`

2. **Invalid Input (400)**:
   - **Example**: If the client tries to create a product with a missing required field:
     ```json
     {
       "error": "Invalid input",
       "message": "Product price is required."
     }
     ```
   - **HTTP Status**: `400 Bad Request`

3. **Out of Stock (400)**:
   - **Example**: When creating an order for more products than available:
     ```json
     {
       "error": "Insufficient stock",
       "message": "There are only 5 units of Product A in stock, but you requested 10."
     }
     ```
   - **HTTP Status**: `400 Bad Request`

4. **Invalid Order Status (400)**:
   - **Example**: If a request tries to update the status of an order to an invalid value:
     ```json
     {
       "error": "Invalid status",
       "message": "Order status must be either 'Pending' or 'Completed'."
     }
     ```
   - **HTTP Status**: `400 Bad Request`

5. **General Server Error (500)**:
   - **Example**: If there is a database error or any unexpected issue:
     ```json
     {
       "error": "Internal Server Error",
       "message": "An unexpected error occurred, please try again later."
     }
     ```
   - **HTTP Status**: `500 Internal Server Error`

---

### **Backend Structure with Exception Handling**:

1. **Technologies**:
   - Programming Language: Python (Flask or Django) or Node.js (Express)
   - Database: SQLite, PostgreSQL, or MySQL (SQLite recommended for simplicity)
   - Authentication: Optional
   - API: RESTful API endpoints

---

### **Evaluation Criteria with Exception Handling**:

- **Correctness**: Does the system properly handle errors for each case, including invalid input, missing resources, and order stock limitations?
- **Response Format**: Are the error messages clear, concise, and helpful for the client?
- **Code Quality**: Is exception handling integrated cleanly into the codebase, and is it easy to understand and maintain?
- **Security**: Are exceptions properly handled to avoid exposing sensitive information about the server or database?
- **Auth**: Auth implementation with Basic auth 
- **JWT (Bonus)**: If implemented, does the system correctly handle JWT token generation, validation, and expiration?
  
---

### **Submission Requirements**:

1. **Code**: Complete source code with proper exception handling.
2. **API Documentation**: Update the documentation to include examples of the error responses and status codes.
3. **Error Handling Tests**: Provide some test cases or examples that demonstrate how the backend handles various errors (e.g., missing product, invalid input).

---

Practice with **handling various types of errors** and providing **meaningful error messages** to the client. This also reinforces the importance of robust error handling in a real-world system.