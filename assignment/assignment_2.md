### **Assignment: Backend Development with Authentication and User Entity**

**Objective**:  
Students will implement **Basic Authentication** for a backend system that includes a **User entity**. JWT authentication will be an optional enhancement for additional points.

---

### **Entities**:
1. **User**: A user has a `username`, `password`, and `role` (e.g., admin, customer).
   
---

### **Requirements**:

1. **Basic Authentication (Mandatory)**:
   - Implement Basic Authentication for the API using **username** and **password**.
   - The server should check the **Authorization header** for a base64-encoded `username:password` string.
   - If the credentials are valid, allow access to protected endpoints (e.g., viewing products, creating orders).
   - If the credentials are invalid or missing, respond with a **401 Unauthorized** error.

2. **User Management**:
   - Implement a simple **User entity** with the following attributes: `username`, `password`, and `role`.
   - The system should allow the creation of users (POST `/users`), retrieval of user information (GET `/users/{id}`), and listing all users (GET `/users`).
   - Passwords should be **hashed** before being stored for security purposes (use libraries like `bcrypt` or `hashlib`).
   - Implement a simple **user registration** endpoint that accepts a `username` and `password` to create a new user.

3. **JWT Authentication (Bonus)**:
   - After successfully logging in using Basic Authentication, the server should issue a **JWT** that the user can use for subsequent requests.
   - The JWT should include the `username` and `role` and have an expiration time.
   - The JWT should be included in the **Authorization header** as `Bearer <token>` for any protected API endpoint.
   - Implement a **middleware** to validate the JWT on every request to protected routes (e.g., `/products`, `/orders`).
   - If the JWT is expired or invalid, return a **401 Unauthorized** error.

---

### **Key Endpoints**:
1. **User Registration**:
   - `POST /users`: Register a new user with `username` and `password`.

2. **User Info**:
   - `GET /users/{id}`: Get details of a specific user (e.g., `username`, `role`).
   - `GET /users`: List all users (optional for this assignment).

3. **Authentication**:
   - `POST /login`: Authenticate with **Basic Auth** (username and password) and issue a JWT (if bonus is implemented).

4. **Protected Routes** (using Basic Auth or JWT):
   - `GET /products`: List all products (requires authentication).
   - `POST /orders`: Create an order (requires authentication).
   
---

### **Evaluation Criteria**:

- **Correctness**: Does the system properly implement Basic Authentication, ensuring only authorized users can access protected endpoints? Is user registration handled correctly?
- **Security**: Are passwords securely stored (hashed)? Is Basic Auth implemented securely? If JWT is used, is it correctly issued and validated?
- **Code Quality**: Is the authentication logic clear, well-structured, and easy to maintain?
- **JWT (Bonus)**: If JWT is implemented, does the system correctly handle token generation, validation, and expiration?

