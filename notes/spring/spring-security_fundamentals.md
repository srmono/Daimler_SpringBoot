Spring Security is a powerful and customizable authentication and access control framework that helps developers secure their Spring-based applications. It provides a comprehensive set of features to protect against common security vulnerabilities and manage authentication and authorization. Below, I outline the key fundamentals of Spring Security.

### Key Fundamentals of Spring Security

1. **Authentication vs. Authorization**:
   - **Authentication** is the process of verifying who the user is (e.g., via login forms, HTTP Basic authentication, JWT, OAuth, etc.).
   - **Authorization** is the process of determining whether the authenticated user has the necessary permissions to access a given resource (e.g., checking roles or specific permissions).

2. **Authentication Manager**:
   - The `AuthenticationManager` is responsible for authenticating users. Spring Security provides different ways to configure how a user is authenticated (e.g., using `DaoAuthenticationProvider`, LDAP, or custom `UserDetailsService`).
   - The authentication process typically involves a login form, where a user provides a username and password, which are then validated by Spring Security.

3. **Authentication and Principal**:
   - **Principal** represents the currently authenticated user.
   - After successful authentication, Spring Security creates an `Authentication` object, which contains details of the authenticated user (including their roles, credentials, and other information).

4. **UserDetailsService**:
   - `UserDetailsService` is an interface that loads user-specific data (usually from a database) during the authentication process.
   - By implementing this interface, you can provide a custom way of retrieving user information and credentials for authentication.
   - Typically, the `loadUserByUsername()` method of `UserDetailsService` is used to load user details by username.

5. **UserDetails and GrantedAuthority**:
   - `UserDetails` represents the authenticated user's details such as username, password, roles, and any other information necessary for authentication.
   - `GrantedAuthority` represents a permission or role that is granted to a user (e.g., `ROLE_USER`, `ROLE_ADMIN`).

6. **Authorization**:
   - Authorization refers to determining if a user has access to a particular resource or action.
   - You can control authorization by using HTTP security, URL patterns, method-level security, or annotations.
   - Spring Security offers role-based access control, where users are assigned specific roles, and access to resources is granted based on these roles.

7. **HTTP Security**:
   - Spring Security allows you to configure security rules for HTTP requests. The configuration includes defining which paths are secured and how the security should be applied (e.g., requiring authentication or defining roles for specific URLs).
   - This is typically done using the `HttpSecurity` object in the `configure(HttpSecurity http)` method of `WebSecurityConfigurerAdapter`.

   Example:
   ```java
   http
       .authorizeRequests()
           .antMatchers("/public/**").permitAll()  // Allow all to access /public/**
           .antMatchers("/admin/**").hasRole("ADMIN")  // Only users with ROLE_ADMIN can access /admin/**
           .anyRequest().authenticated()  // All other requests require authentication
       .and()
       .formLogin().permitAll()  // Enable form login
       .and()
       .logout().permitAll();  // Enable logout
   ```

8. **Filters in Spring Security**:
   - Filters are central to Spring Security's functionality. They intercept HTTP requests and apply security-related logic.
   - Common filters include:
     - `UsernamePasswordAuthenticationFilter`: Handles login requests by reading the username and password.
     - `BasicAuthenticationFilter`: Handles HTTP Basic Authentication.
     - `CsrfFilter`: Manages Cross-Site Request Forgery (CSRF) protection.
     - `SecurityContextPersistenceFilter`: Manages the security context (holds user authentication details across requests).

9. **Security Context**:
   - The **SecurityContext** stores the security-related information (such as authentication details) for the current user throughout the session or request.
   - The `SecurityContextHolder` is used to access and manage the `SecurityContext`. For example, you can get the currently authenticated user by calling `SecurityContextHolder.getContext().getAuthentication()`.

10. **CSRF (Cross-Site Request Forgery) Protection**:
    - CSRF is a common vulnerability that allows malicious websites to perform actions on behalf of an authenticated user.
    - Spring Security provides automatic protection against CSRF attacks by default, where each state-changing HTTP request (such as POST, PUT, DELETE) requires a CSRF token.
    - You can disable CSRF protection if needed (though it's not recommended for production).

    Example of disabling CSRF:
    ```java
    http.csrf().disable();
    ```

11. **Session Management**:
    - Spring Security allows you to control session behavior, such as managing concurrent sessions, invalidating sessions after a timeout, etc.
    - You can configure session management policies, including preventing session fixation attacks and specifying session timeouts.

    Example:
    ```java
    http
        .sessionManagement()
        .maximumSessions(1)  // Only allow one session per user
        .expiredUrl("/session-expired");
    ```

12. **Method-Level Security**:
    - You can secure methods in your service layer using annotations like `@PreAuthorize`, `@Secured`, and `@RolesAllowed`.
    - These annotations allow you to apply authorization checks directly to methods, based on roles or permissions.

    Example:
    ```java
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(User user) {
        // Only accessible to users with the 'ADMIN' role
    }
    ```

13. **OAuth 2.0 and JWT Authentication**:
    - Spring Security also supports advanced authentication mechanisms such as **OAuth 2.0** and **JWT (JSON Web Tokens)**.
    - OAuth 2.0 is often used for integrating with external authentication providers (e.g., Google, Facebook).
    - JWT is commonly used for token-based authentication, where a token is issued after the user logs in and sent along with every request to authorize the user.

14. **Password Encoding**:
    - Spring Security recommends encoding passwords using a `PasswordEncoder` (e.g., `BCryptPasswordEncoder`, `Argon2PasswordEncoder`).
    - Passwords should never be stored in plain text but rather in an encrypted format.

    Example of using `BCryptPasswordEncoder`:
    ```java
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    ```

15. **Custom Authentication and Authorization**:
    - Spring Security is highly extensible, allowing developers to create custom authentication mechanisms, filters, and access control logic.
    - You can create your own custom authentication providers, user details services, and security filters to implement more complex or tailored security requirements.

---

### Summary of Key Concepts

1. **Authentication** is the process of verifying who the user is.
2. **Authorization** is the process of determining what actions the authenticated user can perform.
3. **SecurityContext** holds authentication information across requests.
4. **HTTP Security** helps configure access control for HTTP requests.
5. **CSRF Protection** and other common security vulnerabilities are handled by default.
6. **Password Encoding** should be used to securely store user passwords.
7. **Session Management** can help control user sessions and prevent issues like session fixation.
8. **Method-Level Security** allows fine-grained control of user access at the method level.
9. **OAuth 2.0 and JWT** provide token-based authentication mechanisms.
10. Spring Security is highly customizable for more advanced or tailored security configurations.

By understanding these fundamentals, you can leverage Spring Security to protect your Spring Boot applications and implement robust authentication and authorization mechanisms.