**Practical cybersecurity example** in a **Spring Boot application** for a **Fleet Management System**. This example demonstrates **how to secure APIs using OAuth2 and JWT authentication**, preventing unauthorized access to vehicle tracking data.

---

## **🚀 Use Case: Secure Fleet Vehicle API with OAuth2 and JWT**
### **Scenario:**
A **hacker tries to access vehicle tracking data** by calling the API endpoint `/api/vehicles/{id}` without proper authentication. To prevent this, we implement **OAuth2 with JWT**.

---

## **Step 1: Setup Spring Security with OAuth2 & JWT**
### **1️⃣ Add Dependencies**
In `pom.xml`, add the required dependencies:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.11.5</version>
</dependency>
```

---

## **Step 2: Implement JWT Token Generation**
### **2️⃣ Create a JWT Utility Class**
We need a class to generate and validate JWT tokens.

```java
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "your_super_secret_key_for_jwt_which_should_be_very_long";
    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }
}
```

---

## **Step 3: Implement Authentication Controller**
### **3️⃣ Expose an Endpoint for Login**
This API generates a JWT token when a user logs in.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        // Simulate user authentication (Replace with real authentication logic)
        if ("admin".equals(username) && "password".equals(password)) {
            return jwtUtil.generateToken(username);
        }
        return "Invalid credentials";
    }
}
```

✅ **Now, when the user logs in, they receive a JWT token.**  
Example request:
```
POST /api/auth/login
{
    "username": "admin",
    "password": "password"
}
```
**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## **Step 4: Secure the Fleet API**
### **4️⃣ Implement Fleet Vehicle API**
We now create an endpoint `/api/vehicles/{id}` that only **authorized users** can access.

```java
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')") // Secure the API
    public String getVehicleById(@PathVariable String id) {
        return "Vehicle details for ID: " + id;
    }
}
```

---

## **Step 5: Configure Spring Security**
### **5️⃣ Apply JWT Authentication**
Now, we configure **Spring Security** to enforce authentication.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/login").permitAll()  // Public endpoint
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

---

## **Step 6: Implement JWT Filter**
### **6️⃣ Create a JWT Authentication Filter**
We need to validate JWTs on every API request.

```java
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.io.IOException;

public class JwtAuthFilter extends UsernamePasswordAuthenticationFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            String username = jwtUtil.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(token)) {
                    SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));
                }
            }
        }

        chain.doFilter(request, response);
    }
}
```

---

## **Step 7: Test the API**
### **🛠️ Test Unauthorized Access**
🚫 **Without Token:**  
```
GET /api/vehicles/123
```
**Response:** `403 Forbidden`

---

### **✅ Test Authorized Access**
1️⃣ **Login to Get Token:**
```
POST /api/auth/login
{
    "username": "admin",
    "password": "password"
}
```
**Response:**
```json
{
    "token": "eyJhbGciOiJIUz..."
}
```

2️⃣ **Access Vehicle API with Token:**
```
GET /api/vehicles/123
Authorization: Bearer eyJhbGciOiJIUz...
```
**Response:**  
```json
{
    "message": "Vehicle details for ID: 123"
}
```

---

## **🚀 Summary**
✅ **Spring Boot API Secured with JWT Authentication**  
✅ **Unauthorized Users Cannot Access Fleet Data**  
✅ **APIs Require Bearer Token Authentication**  
✅ **JWT Protects Against Unauthorized Data Breach**  