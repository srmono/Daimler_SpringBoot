In Spring Boot, environment variables and application properties are widely used to configure your application. Let's break down your questions step by step:

### 1. **Using Environment Variables in Spring Boot**

You can use environment variables in Spring Boot by defining them in your `application.properties` or `application.yml` files and then injecting them into your Java classes.

**Define in `application.properties` or `application.yml`:**
```properties
# In application.properties
myapp.datasource.url=${DATABASE_URL}
myapp.datasource.username=${DATABASE_USERNAME}
myapp.datasource.password=${DATABASE_PASSWORD}
```

You can set the actual environment variables `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` in your system or in the deployment environment (e.g., on a cloud service like AWS, Azure, etc.).

**Setting environment variables:**
In Linux or macOS:
```bash
export DATABASE_URL=jdbc:mysql://localhost:3306/mydb
export DATABASE_USERNAME=root
export DATABASE_PASSWORD=password123
```

In Windows:
```bash
set DATABASE_URL=jdbc:mysql://localhost:3306/mydb
set DATABASE_USERNAME=root
set DATABASE_PASSWORD=password123
```

Spring Boot will automatically inject these environment variables into the application properties, and you can use them in your configuration classes.

### 2. **Global Properties in `application.properties`**

Global properties can be defined in your `application.properties` or `application.yml` file. These properties can be used across your application by referencing them in Java classes or other configuration files.

**Define Global Properties:**
```properties
# application.properties

# Global Property for API version
api.version=1.0.0

# Another example: App name
app.name=MySpringBootApp
```

**Use Global Properties in Java:**

You can inject these properties using `@Value` annotation or use `@ConfigurationProperties` for more structured access.

- **Using `@Value` Annotation:**
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    @Value("${api.version}")
    private String apiVersion;

    @Value("${app.name}")
    private String appName;

    public void printDetails() {
        System.out.println("API Version: " + apiVersion);
        System.out.println("App Name: " + appName);
    }
}
```

- **Using `@ConfigurationProperties`:**
```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "myapp")
public class MyAppConfig {

    private String datasourceUrl;
    private String datasourceUsername;
    private String datasourcePassword;

    // Getters and Setters

    public String getDatasourceUrl() {
        return datasourceUrl;
    }

    public void setDatasourceUrl(String datasourceUrl) {
        this.datasourceUrl = datasourceUrl;
    }

    public String getDatasourceUsername() {
        return datasourceUsername;
    }

    public void setDatasourceUsername(String datasourceUsername) {
        this.datasourceUsername = datasourceUsername;
    }

    public String getDatasourcePassword() {
        return datasourcePassword;
    }

    public void setDatasourcePassword(String datasourcePassword) {
        this.datasourcePassword = datasourcePassword;
    }
}
```

In this case, Spring will bind the properties prefixed with `myapp` in the application properties file to the fields in your `MyAppConfig` class.

### 3. **Securing Passwords Without Storing in `application.properties`**

Storing sensitive data, like passwords, directly in `application.properties` or `application.yml` is not recommended for security reasons. Here are a few ways to handle this securely:

**Option 1: Use Environment Variables**
- Store sensitive properties as environment variables. This keeps them out of version control and away from being stored in plain text.
  
**Option 2: Use `Spring Cloud Config` (External Configuration Service)**
- You can use Spring Cloud Config to externalize your configuration into a central repository, allowing you to securely store and manage sensitive information.
  
**Option 3: Encrypt Passwords in Properties Files**
- You can encrypt sensitive data and then decrypt it at runtime. Spring provides support for encrypting and decrypting properties using the `JCE` encryption and tools like `Spring Cloud Vault`.

For example, using `Spring Cloud Vault` for password storage:
```yaml
spring:
  cloud:
    vault:
      uri: https://your-vault-server:8200
      authentication: TOKEN
      token: YOUR_VAULT_TOKEN
```

You can then retrieve secrets directly from Vault in your Spring Boot application, ensuring passwords are never stored directly in your `application.properties`.

**Option 4: Use `@ConfigurationProperties` with JCE Encryption**
- You could also configure a `@ConfigurationProperties` bean to read encrypted values and decrypt them at runtime using Spring’s `JCE` encryption support.

### 4. **Other Suggestions**

**Use Profiles for Different Environments:**
- Spring Boot supports different profiles for different environments (e.g., `dev`, `test`, `prod`). You can define separate properties for each profile:

```properties
# application-dev.properties
server.port=8081
database.url=jdbc:mysql://localhost:3306/dev_db
```

You can specify the active profile using:
```properties
spring.profiles.active=dev
```

**Use Logging Configuration:**
- Make sure to log the necessary information without exposing sensitive data like passwords.
  
**Avoid Hardcoding URLs or Credentials:**
- Use properties files or environment variables to configure URLs, database credentials, or API keys, rather than hardcoding them into your codebase.

**Health and Metrics Endpoints:**
- Ensure you configure `/actuator/health` and `/actuator/metrics` endpoints properly to prevent exposing unnecessary application details.

By following these practices, you can keep your Spring Boot application secure and maintainable.