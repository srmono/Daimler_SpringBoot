In Spring Framework, **IOC** stands for **Inversion of Control**, which is a fundamental concept where the control of objects or dependencies is transferred from the programmer to the container (Spring). Instead of creating and managing objects manually, Spring allows the container to manage the lifecycle and dependencies of objects.

### Key Concepts of Spring IoC:

1. **Beans**: In Spring, objects that are managed by the IoC container are called beans. A bean can be any Java object that is configured in the Spring context.
   
2. **ApplicationContext**: The central interface to the Spring IoC container. It is responsible for managing the beans, their lifecycle, and their dependencies.

3. **Dependency Injection (DI)**: One of the core mechanisms in Spring’s IoC. It allows Spring to inject the necessary dependencies into beans. There are three common types of Dependency Injection in Spring:
   - **Constructor Injection**: Dependencies are provided via the constructor.
   - **Setter Injection**: Dependencies are provided via setter methods.
   - **Field Injection**: Dependencies are injected directly into fields (less recommended for maintainability).

4. **Bean Configuration**: Beans can be configured in the Spring context in several ways:
   - **XML Configuration**: Defining beans in an XML file (`applicationContext.xml`).
   - **Annotation-based Configuration**: Using annotations like `@Component`, `@Service`, `@Repository`, etc., to mark a class as a bean.
   - **Java-based Configuration**: Using `@Configuration` and `@Bean` annotations to configure beans via Java classes.

5. **Bean Scope**: Defines the lifecycle of a bean. Common scopes in Spring are:
   - **Singleton**: Only one instance of the bean is created and shared throughout the container.
   - **Prototype**: A new instance of the bean is created each time it is requested.
   - **Request**: A new instance is created for each HTTP request (used in web applications).
   - **Session**: A new instance is created for each HTTP session.

### Example of IoC in Spring:

```java
// Service Interface
public interface CarService {
    void drive();
}

// Service Implementation
@Service
public class CarServiceImpl implements CarService {
    public void drive() {
        System.out.println("Driving the car!");
    }
}

// Controller
@Controller
public class CarController {
    
    private final CarService carService;

    @Autowired // Dependency injection via constructor
    public CarController(CarService carService) {
        this.carService = carService;
    }

    public void performAction() {
        carService.drive(); // Using the injected service
    }
}

// Main application or configuration class
@Configuration
@ComponentScan(basePackages = "com.example") // Scan for @Component and other annotations
public class AppConfig {
    // You can also define beans here using @Bean
}
```

In the example above:
- The `CarServiceImpl` is injected into the `CarController` using constructor injection (`@Autowired`).
- The `@Service` and `@Controller` annotations tell Spring to manage these classes as beans.
- The `@ComponentScan` annotation instructs Spring to scan for these beans automatically.

### Benefits of IoC:
- **Decoupling**: Reduces dependencies between classes, making the system easier to maintain.
- **Testability**: Makes unit testing easier as dependencies can be mocked or substituted.
- **Configuration Flexibility**: Beans can be configured declaratively, reducing boilerplate code.

Spring’s IoC container is highly configurable and provides a robust, flexible environment to manage beans and their dependencies.