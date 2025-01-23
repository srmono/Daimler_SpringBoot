**Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of objects, which can contain both data (attributes) and methods (functions). The four fundamental principles of OOP are:

### 1. **Encapsulation**
Encapsulation refers to the bundling of data (variables) and methods (functions) that operate on the data into a single unit or class. It also involves restricting access to certain details of an object and only exposing a controlled interface for interaction with it. This is typically done using **access modifiers** like `private`, `protected`, and `public`.

#### Example of Encapsulation:
```java
class Car {
    // Private fields (attributes)
    private String model;
    private int year;
    
    // Constructor to initialize fields
    public Car(String model, int year) {
        this.model = model;
        this.year = year;
    }
    
    // Getter method for model
    public String getModel() {
        return model;
    }
    
    // Setter method for model
    public void setModel(String model) {
        this.model = model;
    }
    
    // Getter method for year
    public int getYear() {
        return year;
    }
    
    // Setter method for year
    public void setYear(int year) {
        this.year = year;
    }
}

public class Main {
    public static void main(String[] args) {
        // Creating an object of Car class
        Car car = new Car("Toyota", 2021);
        
        // Accessing and modifying data using methods (not directly)
        System.out.println("Car Model: " + car.getModel());
        car.setYear(2022);
        System.out.println("Car Year: " + car.getYear());
    }
}
```

**Explanation**:
- The `Car` class has private fields (`model` and `year`) that cannot be accessed directly outside the class.
- It exposes public getter and setter methods to provide controlled access to these private fields.
- **Encapsulation** ensures that the internal state of the object is hidden from the outside world, and the data is accessed through well-defined methods.

### 2. **Inheritance**
Inheritance allows a new class (subclass/child) to inherit properties and methods from an existing class (superclass/parent). This helps in reusing code and establishing a relationship between classes.

#### Example of Inheritance:
```java
// Parent class
class Animal {
    public void sound() {
        System.out.println("Some animal sound");
    }
}

// Child class inheriting from Animal
class Dog extends Animal {
    public void sound() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.sound(); // Outputs: Bark
    }
}
```

**Explanation**:
- The `Dog` class **inherits** the `sound` method from the `Animal` class but **overrides** it with its own implementation.
- The `Dog` class is a **specialized** version of the `Animal` class, which demonstrates the principle of **inheritance**.
- The `sound` method in `Dog` overrides the one in `Animal`, which is an example of **method overriding**.

### 3. **Polymorphism**
Polymorphism allows objects to be treated as instances of their parent class. It is the ability to use a single interface for different data types. There are two types of polymorphism:
- **Compile-time polymorphism (Method Overloading)**: The method is overloaded based on the number or type of parameters.
- **Runtime polymorphism (Method Overriding)**: The method in a subclass overrides the method in a superclass.

#### Example of Polymorphism (Method Overloading and Method Overriding):
```java
// Parent class
class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
}

// Child class
class Circle extends Shape {
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

// Another child class
class Rectangle extends Shape {
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}

// Method Overloading in the same class
class MathOperations {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape shape1 = new Circle();    // Upcasting
        shape1.draw();  // Outputs: Drawing a circle
        
        Shape shape2 = new Rectangle(); // Upcasting
        shape2.draw();  // Outputs: Drawing a rectangle
        
        MathOperations math = new MathOperations();
        System.out.println(math.add(5, 10));        // Outputs: 15 (int version)
        System.out.println(math.add(5.5, 10.5));    // Outputs: 16.0 (double version)
    }
}
```

**Explanation**:
- The `draw()` method is **overridden** in the `Circle` and `Rectangle` classes. This is **runtime polymorphism** because which `draw()` method is called depends on the object type (`Circle` or `Rectangle`) at runtime.
- The `add()` method in `MathOperations` is **overloaded** with different parameter types, which is **compile-time polymorphism**.
- **Polymorphism** enables using the same method name for different types of objects or different parameter types.

### 4. **Abstraction**
Abstraction involves hiding the complex implementation details and showing only the necessary functionality to the user. This is typically achieved using **abstract classes** or **interfaces**.

- **Abstract class**: A class that cannot be instantiated directly but can be extended by subclasses.
- **Interface**: A contract that classes can implement, but it cannot provide implementation details.

#### Example of Abstraction:
```java
// Abstract class
abstract class Animal {
    // Abstract method (no body)
    public abstract void sound();
    
    // Regular method with implementation
    public void sleep() {
        System.out.println("Sleeping");
    }
}

// Subclass (inheriting from Animal)
class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Bark");
    }
}

public class Main {
    public static void main(String[] args) {
        // Animal animal = new Animal(); // Error: Cannot instantiate the abstract class Animal
        Dog dog = new Dog();
        dog.sound();  // Outputs: Bark
        dog.sleep();  // Outputs: Sleeping
    }
}
```

**Explanation**:
- The `Animal` class is **abstract**, meaning it cannot be instantiated directly.
- The `sound()` method is **abstract** and must be implemented by subclasses.
- The `sleep()` method is a regular method, and it provides functionality that is inherited by the `Dog` class.
- **Abstraction** hides the complex implementation of `sleep()` and only requires the subclass to implement the `sound()` method.

---

### Summary of OOP Concepts:
1. **Encapsulation**: Bundling data and methods into a single unit and restricting access to some of the object’s components (using access modifiers).
2. **Inheritance**: A mechanism to create a new class that is based on an existing class, promoting code reuse and hierarchical relationships.
3. **Polymorphism**: The ability to call the same method on different objects, where each object responds in a way specific to its class (method overloading and method overriding).
4. **Abstraction**: Hiding complex details and showing only the essential features. This can be achieved through abstract classes or interfaces.

These concepts are the foundation of **Object-Oriented Programming** and are extensively used in **Java** and **Spring Boot** development to create modular, reusable, and maintainable software.