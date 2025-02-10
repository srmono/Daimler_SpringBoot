TDD (Test-Driven Development) is a software development practice where tests are written before the actual implementation. It follows a **Red-Green-Refactor** cycle:

1. **Red** – Write a failing test that defines the desired functionality.
2. **Green** – Implement the minimal code needed to pass the test.
3. **Refactor** – Improve the code while ensuring the test still passes.

### **Test-Driven Development (TDD) - A Detailed Guide**

#### **What is TDD?**
Test-Driven Development (TDD) is a software development practice where tests are written before writing the actual implementation code. The goal of TDD is to ensure software quality, maintainability, and correctness by focusing on testability from the start.

#### **The TDD Cycle: Red-Green-Refactor**
TDD follows a three-step iterative cycle:

1. **Red** (Write a Failing Test)
   - Define the expected behavior by writing a test before any actual code is implemented.
   - Run the test to ensure it fails (since the feature is not yet implemented).
   
2. **Green** (Make the Test Pass)
   - Implement the simplest possible code to pass the test.
   - Avoid writing extra logic; only do what is required to make the test pass.

3. **Refactor** (Optimize the Code)
   - Improve the implementation while keeping the test passing.
   - Remove code duplication, enhance readability, and optimize performance.

Once refactoring is done, the cycle repeats for the next feature or enhancement.

---
### **TDD in Practice: A Step-by-Step Example**
Let's implement a simple function using TDD in **Python**.

#### **Scenario:**  
We want to create a function `add(a, b)` that returns the sum of two numbers.

#### **Step 1: Write a Failing Test (Red)**
Create a test file `test_math_operations.py`:

```python
import unittest
from math_operations import add  # The function doesn't exist yet

class TestMathOperations(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == "__main__":
    unittest.main()
```
**Why does it fail?**  
Because `add(a, b)` is not yet implemented.

---

#### **Step 2: Write Minimal Code to Pass the Test (Green)**
Now, let's create `math_operations.py` with the simplest implementation:

```python
def add(a, b):
    return a + b  # Just enough to pass the test
```
Run the test:

```sh
python -m unittest test_math_operations.py
```
The test **passes** ✅.

---

#### **Step 3: Refactor (Optimize Code)**
Since our implementation is already optimal, there's no need for changes yet. However, if our function had unnecessary complexity, we would simplify it here.

---

### **Expanding the TDD Approach**
Now, let's extend our function to handle edge cases (e.g., adding negative numbers, floats, and ensuring correct type handling).

#### **Step 1: Add More Tests**
Modify `test_math_operations.py`:

```python
class TestMathOperations(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)  # Edge case: negative number
        self.assertEqual(add(0.5, 0.5), 1.0)  # Edge case: float numbers
        self.assertRaises(TypeError, add, "2", 3)  # Edge case: invalid input
```

#### **Step 2: Modify Code to Pass Tests**
Modify `math_operations.py`:

```python
def add(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Inputs must be numbers")
    return a + b
```

Now all test cases pass successfully! 

| Language  | Testing Framework |
|-----------|------------------|
| Python    | `unittest`, `pytest` |
| JavaScript | `Jest`, `Mocha` |
| Java      | `JUnit` |
| C#        | `xUnit`, `NUnit` |
| Ruby      | `RSpec` |
| Go        | `testing` package |

---

### **Benefits of TDD**
- **Improved Code Quality:** Writing tests first leads to a well-thought-out design and structure.
- **Fewer Bugs:** Since tests are created beforehand, many bugs are caught early.
- **Better Maintainability:** Tests act as documentation for how the code should behave.
- **Confidence in Refactoring:** With a comprehensive test suite, developers can refactor with confidence, knowing that existing functionality is not broken.
- **Encourages Modularity:** Since testable code is often loosely coupled, TDD promotes modular and reusable code.
- Ensures better code coverage.
- Leads to cleaner, modular, and maintainable code.
- Helps catch bugs early.
- Provides a safety net for future refactoring.

### **TDD Best Practices**
- **Write small, incremental tests:** Don't try to implement everything at once.
- **Keep tests independent:** Each test should validate a single piece of functionality.
- **Use meaningful test names:** Clearly describe what the test is checking.
- **Run tests frequently:** Automate test execution to catch issues early.
- **Refactor continuously:** Improve code without changing behavior, ensuring tests still pass.

