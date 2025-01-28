Spring Security is a powerful and customizable authentication and access-control framework for Java applications, particularly for Spring-based applications like Spring Boot. It provides comprehensive security services, including authentication, authorization, and protection against common security threats like cross-site scripting (XSS) and cross-site request forgery (CSRF).

Here’s a basic guide on how to set up Spring Security in a Spring Boot application:

### 1. Add Spring Security Dependencies

First, add the necessary dependencies to your `pom.xml` file if you're using Maven.

```xml
<dependencies>
    <!-- Spring Boot Starter Web (if not already added) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- Spring Boot Starter Thymeleaf (if you're using Thymeleaf for templates) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>

    <!-- Optional: Spring Boot Starter Data JPA for database support -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Optional: H2 database for in-memory database (for development and testing) -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

If you're using Gradle, the dependencies would look like this:

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'  // If using Thymeleaf
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'   // If using JPA
    runtimeOnly 'com.h2database:h2'  // If using H2 database for dev purposes
}
```

### 2. Create a Simple Security Configuration Class

Create a class for configuring Spring Security. Spring Boot automatically configures a basic setup for Spring Security, but you can customize it by creating a configuration class.

```java
package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Define HTTP security settings
        http
            .authorizeRequests()
                .antMatchers("/", "/home", "/public/**").permitAll() // Allow public access to specific paths
                .anyRequest().authenticated()  // All other requests require authentication
            .and()
            .formLogin() // Enable form-based authentication
                .loginPage("/login")  // Custom login page URL
                .permitAll() // Allow everyone to access login page
            .and()
            .logout() // Enable logout functionality
                .permitAll(); // Allow everyone to log out
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Define the password encoder (you can use BCryptPasswordEncoder or any other encoder)
        return new BCryptPasswordEncoder();
    }
}
```

### 3. Define a UserDetailsService Implementation

To manage authentication and user data, implement the `UserDetailsService` interface, which is used to load user-specific data.

```java
package com.example.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // For demonstration purposes, use a hardcoded user. In production, fetch from database.
        if ("user".equals(username)) {
            return User.builder()
                .username("user")
                .password("$2a$10$9lLKsb4H0EThzpG4dsgOj8dtR.AITnMNp2hUHTv5gq5t9PYBgnbZW")  // Encoded password (bcrypt)
                .roles("USER")
                .build();
        } else if ("admin".equals(username)) {
            return User.builder()
                .username("admin")
                .password("$2a$10$Uokhz8.EVdd7fIpx9VKDAghRxssg/RM2LsJbip2DLctnJcpkqFEie")  // Encoded password (bcrypt)
                .roles("ADMIN")
                .build();
        }
        throw new UsernameNotFoundException("User not found");
    }
}
```

### 4. Create Basic HTML Templates

If you are using Thymeleaf or other templating engines, you can create basic login/logout pages. Here's an example of a login page using Thymeleaf:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form action="#" th:action="@{/login}" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br>
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

### 5. Configure the Application Properties

You may want to configure some security settings in the `application.properties` file.

```properties
# Disable CSRF (Not recommended for production)
spring.security.csrf.enabled=false

# Set custom login page (optional)
spring.security.form-login.login-page=/login
```

### 6. Run the Application

Once you have configured the security, run your Spring Boot application. By default, Spring Security will secure your application with basic HTTP authentication.

- Access `/login` to see the login form.
- Access other pages, and Spring Security will prompt for authentication if the user is not logged in.

### 7. Customize Authentication and Authorization

Spring Security can be further customized by:

- Adding different roles (e.g., `ROLE_USER`, `ROLE_ADMIN`) and applying role-based access control.
- Integrating with databases to load user data instead of hardcoding users.
- Using JWT or OAuth2 for token-based authentication.

#### Example of role-based access control in the `SecurityConfig`:

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
            .antMatchers("/admin/**").hasRole("ADMIN") // Only users with ROLE_ADMIN can access /admin/*
            .antMatchers("/user/**").hasRole("USER") // Only users with ROLE_USER can access /user/*
            .anyRequest().authenticated() // All other requests require authentication
        .and()
        .formLogin()
            .loginPage("/login")
            .permitAll()
        .and()
        .logout()
            .permitAll();
}
```

---

This is a basic setup for integrating Spring Security in your Spring Boot application. Depending on your project needs, you can extend and configure it further, including integrating with a database for user management or using OAuth2 for external authentication.