### **Assignment: Backend Development with Authentication, User Entity, and Exception Handling for Inventory System**

**Objective**:  
Students need to implement a backend system that includes **Basic Authentication**, **User Management**, and an **Inventory System** with proper **exception handling**. The implementation will also cover handling common errors and providing meaningful error messages.

---

### **Entities**:
1. **User**: A user has a `username`, `password`, and `role` (e.g., admin, customer).
2. **Product**: A product has attributes like `id`, `name`, `price`, and `stock`.
3. **Order**: An order has an `id`, `product_id`, `quantity`, and `status` (e.g., "Pending", "Completed").

---

### **Requirements**:

#### 1. **Basic Authentication (Mandatory)**:
   - Implement **Basic Authentication** using `username` and `password` (sent in the **Authorization header** as `Basic <base64(username:password)>`).
   - If credentials are valid, allow access to protected endpoints (e.g., viewing products, creating orders).
   - If credentials are invalid or missing, respond with a **401 Unauthorized** error.

#### 2. **User Management**:
   - Implement a **User entity** with the following attributes: `username`, `password`, and `role`.
   - **Password Storage**: Hash the password before storing it (use `bcrypt` or `hashlib`).
   - Implement the following endpoints for managing users:
     - `POST /users`: Register a new user with `username` and `password`.
     - `GET /users/{id}`: Get user details (e.g., `username`, `role`).
     - `GET /users`: List all users (optional for this assignment).

#### 3. **Inventory System with Exception Handling**:
   - **Product Management**:
     - **Add Product**: Ensure that if any required field (e.g., `price` or `stock`) is missing, the server responds with a **400 Bad Request**.
     - **Get Product**: If the product does not exist, return a **404 Not Found**.
     - **Update Product**: If the product does not exist, return a **404 Not Found**. If updating the stock results in a negative stock value, return a **400 Bad Request**.
     - **Delete Product**: If the product does not exist, return a **404 Not Found**.
     
   - **Order Management**:
     - **Create Order**: If the order quantity exceeds available stock, return a **400 Bad Request**. If the product ID does not exist, return a **404 Not Found**.
     - **Get Order**: If the order does not exist, return a **404 Not Found**.
     - **Update Order Status**: If the status is invalid (not one of "Pending" or "Completed"), return a **400 Bad Request**.

   - **General Server Errors**: Return a **500 Internal Server Error** for any unexpected issues (e.g., database or server errors).

---

### **JWT Authentication (Bonus)**:
   - After a user logs in using Basic Authentication, issue a **JWT**.
   - The JWT should include `username` and `role` and have an expiration time.
   - Include the JWT in the **Authorization header** as `Bearer <token>` for subsequent requests to protected endpoints.
   - Implement middleware to validate the JWT for protected routes (e.g., `/products`, `/orders`).
   - If the JWT is expired or invalid, return a **401 Unauthorized** error.

---

### **Key Endpoints**:

1. **User Management**:
   - `POST /users`: Register a new user.
   - `GET /users/{id}`: Retrieve user details.
   - `GET /users`: List all users (optional).

2. **Authentication**:
   - `POST /login`: Authenticate with Basic Auth and issue a JWT (if bonus is implemented).

3. **Product Management**:
   - `POST /products`: Add a new product (requires authentication).
   - `GET /products`: List products (requires authentication).
   - `GET /products/{id}`: Get product details (requires authentication).
   - `PUT /products/{id}`: Update product details (requires authentication).
   - `DELETE /products/{id}`: Delete a product (requires authentication).

4. **Order Management**:
   - `POST /orders`: Create an order (requires authentication).
   - `GET /orders/{id}`: Get order details (requires authentication).
   - `PUT /orders/{id}/status`: Update order status (requires authentication).

---

### **Exception Handling Guidelines**:

1. **Product Not Found (404)**:
   - If a product is not found, return a **404 Not Found** with a descriptive message.

   Example:
   ```json
   {
     "error": "Product not found",
     "message": "The product with ID {id} does not exist."
   }
   ```

2. **Invalid Input (400)**:
   - If the input is invalid (e.g., missing fields), return a **400 Bad Request**.

   Example:
   ```json
   {
     "error": "Invalid input",
     "message": "Product price is required."
   }
   ```

3. **Out of Stock (400)**:
   - If an order exceeds available stock, return a **400 Bad Request**.

   Example:
   ```json
   {
     "error": "Insufficient stock",
     "message": "There are only 5 units of Product A in stock, but you requested 10."
   }
   ```

4. **Invalid Order Status (400)**:
   - If the order status is invalid, return a **400 Bad Request**.

   Example:
   ```json
   {
     "error": "Invalid status",
     "message": "Order status must be either 'Pending' or 'Completed'."
   }
   ```

5. **General Server Error (500)**:
   - For unexpected errors (e.g., database issues), return a **500 Internal Server Error**.

   Example:
   ```json
   {
     "error": "Internal Server Error",
     "message": "An unexpected error occurred, please try again later."
   }
   ```

---

### **Evaluation Criteria**:

- **Correctness**: Does the system implement **Basic Authentication** and handle common errors properly (e.g., invalid input, missing resources, out-of-stock issues)?
- **Security**: Are **passwords securely stored** (hashed)? Are errors handled securely to avoid exposing sensitive information?
- **Code Quality**: Is the code clear, maintainable, and easy to understand? Are exception handling and authentication properly integrated into the system?
- **JWT (Bonus)**: If implemented, does the system correctly handle **JWT generation, validation, and expiration**?
  
---

### **Submission Requirements**:

1. **Code**: Complete source code with authentication and exception handling.
2. **API Documentation**: Document the API, including error response examples and status codes.
3. **Error Handling Tests**: Provide test cases that demonstrate how the backend handles various errors (e.g., missing products, invalid input).

