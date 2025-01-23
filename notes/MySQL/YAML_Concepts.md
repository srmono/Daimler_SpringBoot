YAML (YAML Ain’t Markup Language) is a human-readable data serialization format commonly used for configuration files, data exchange, and defining structure. Here's an overview of YAML fundamentals:

---

## **1. Basic Syntax**
- **Key-Value Pairs**: Data is stored as `key: value` pairs.
  ```yaml
  name: John Doe
  age: 30
  is_active: true
  ```
- **Case Sensitivity**: Keys are case-sensitive.
- **Whitespace**: Indentation is crucial and uses spaces (not tabs).

---

## **2. Lists**
- Lists are defined using a dash (`-`) followed by a space.
  ```yaml
  fruits:
    - Apple
    - Banana
    - Cherry
  ```
- Inline lists can also be used:
  ```yaml
  fruits: [Apple, Banana, Cherry]
  ```

---

## **3. Nested Data**
- Indentation defines the structure (2 spaces are typical, but consistent use is key).
  ```yaml
  person:
    name: John Doe
    address:
      street: 123 Main St
      city: Metropolis
      country: USA
  ```

---

## **4. Scalars**
YAML supports various scalar types:
- **Strings**:
  - Plain: `greeting: Hello`
  - Double-quoted: `greeting: "Hello"`
  - Single-quoted: `greeting: 'Hello'`
- **Multiline Strings**:
  - Folded (`>`): Joins lines with spaces.
    ```yaml
    description: >
      This is a
      folded block.
    ```
  - Literal (`|`): Preserves line breaks.
    ```yaml
    description: |
      This is a
      literal block.
    ```

- **Numbers**:
  ```yaml
  age: 30
  price: 19.99
  ```
- **Booleans**:
  ```yaml
  is_active: true
  is_admin: false
  ```
- **Nulls**:
  ```yaml
  middle_name: null
  ```

---

## **5. Anchors and Aliases**
- Anchors (`&`) define reusable nodes, and aliases (`*`) reference them.
  ```yaml
  defaults: &defaults
    timeout: 30
    retries: 5

  service1:
    <<: *defaults
    timeout: 60  # Overrides default timeout
  ```

---

## **6. Comments**
- Comments begin with `#` and are ignored by YAML parsers.
  ```yaml
  name: John Doe  # This is the user's name
  ```

---

## **7. Advanced Features**
- **Merge Keys**: Combine multiple mappings.
  ```yaml
  base: &base
    key1: value1
    key2: value2

  extended:
    <<: *base
    key3: value3
  ```
- **Environment Variables**: YAML can reference external values (e.g., in Kubernetes).

---

## **8. Applications**
- **Configuration Files**: Used in tools like Docker Compose, Kubernetes, Ansible, and CI/CD pipelines.
- **Data Serialization**: Exchanging data between systems.

---

