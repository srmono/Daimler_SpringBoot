### **Use Case Document: Daimler Truck Fleet Management System**

---

#### **Use Case Name**  
Fleet Management System for Daimler Trucks  

---

#### **Actors**  
1. **Fleet Manager**: Manages trucks, drivers, and maintenance records.  
2. **Driver**: Assigned to specific trucks and operates them.  
3. **Maintenance Personnel**: Logs and updates maintenance records.  

---

#### **Description**  
The Fleet Management System (FMS) is a REST API developed using .NET Core to manage the lifecycle of trucks, drivers, and their maintenance records. The system will facilitate efficient fleet operations by enabling data-driven decision-making, ensuring compliance with maintenance schedules, and tracking resource assignments.

---

#### **Preconditions**  
- A database is available to store truck, driver, and maintenance data.  
- Users (Fleet Manager, Maintenance Personnel) have the necessary credentials to access the system.  

---

#### **Primary Use Cases**

---

### **Use Case 1: Manage Trucks**  
**Description**: Fleet Managers can add, update, view, and delete truck information.  

**Actors**: Fleet Manager  

**Steps**:  
1. The Fleet Manager sends a request to add a new truck (e.g., make, model, year, license plate).  
2. The system validates the input and saves the truck information.  
3. The Fleet Manager retrieves a list of all trucks or a specific truck’s details.  
4. The Fleet Manager updates truck information as needed.  
5. If a truck is no longer in use, the Fleet Manager deletes the truck record.  

**Alternate Flows**:  
- Invalid input: The system returns an error message (e.g., missing fields or invalid data).  
- Attempt to delete a truck with associated maintenance records: The system prevents the deletion and notifies the user.  

---

### **Use Case 2: Manage Drivers**  
**Description**: Fleet Managers can add, update, view, and delete driver details, as well as assign a truck to a driver.  

**Actors**: Fleet Manager  

**Steps**:  
1. The Fleet Manager sends a request to add a new driver (e.g., name, license number, contact information).  
2. The system validates the input and saves the driver information.  
3. The Fleet Manager retrieves a list of all drivers or specific driver details.  
4. The Fleet Manager updates driver information or assigns a driver to a truck.  
5. The Fleet Manager deletes driver records when necessary.  

**Alternate Flows**:  
- A truck is already assigned to another driver: The system prevents the reassignment and provides an error message.  

---

### **Use Case 3: Log and Manage Maintenance Records**  
**Description**: Maintenance Personnel can log, update, view, and delete maintenance records for trucks.  

**Actors**: Maintenance Personnel, Fleet Manager  

**Steps**:  
1. Maintenance Personnel logs a new maintenance record for a truck, including the date, description, and cost.  
2. The system validates the data and associates the record with the specified truck.  
3. The system allows retrieval of maintenance records for a specific truck or across the fleet.  
4. Maintenance Personnel updates the status of a maintenance record (e.g., from "Pending" to "Completed").  
5. The Fleet Manager or Maintenance Personnel deletes maintenance records if necessary.  

**Alternate Flows**:  
- Attempt to log maintenance for a non-existent truck: The system rejects the request with an appropriate error.  

---

#### **Postconditions**  
- The system securely stores and organizes all fleet data.  
- Users can retrieve, update, and delete
- Data integrity is maintained, ensuring no orphaned records exist (e.g., trucks cannot be deleted if they have active maintenance records).  
- All actions and changes are reflected in the database and are accessible through API endpoints.

---

#### **System Requirements**  
1. **Functional Requirements**:  
   - RESTful APIs for CRUD operations on trucks, drivers, and maintenance records.  
   - Validation of input data at both API and database levels.  
   - Role-specific access for Fleet Manager and Maintenance Personnel.  
   
2. **Non-Functional Requirements**:  
   - The system must support high availability and scalability to handle large datasets.  
   - APIs should respond within an acceptable timeframe (<300ms under typical load).  
   - Data security and privacy must be enforced (e.g., secure communication with HTTPS).  

3. **Technical Requirements (Spring Boot Edition)**  
   - Use **Spring Boot** for API development.  
   - Use **Spring Data JPA** for database interaction.  
   - Use **SQL Server** or **MySQL** for the database backend.  
   - Implement proper exception handling using **@ControllerAdvice**.  
   - Use **SLF4J with Logback** for logging mechanisms.  

---

#### **Future Enhancements**  
1. Implement authentication and authorization using **JWT** and **ASP.NET Core Identity**.  
2. Add a dashboard for fleet analytics (e.g., maintenance trends, utilization rates).  
3. Integrate vehicle tracking through GPS for real-time fleet monitoring.  
4. Develop a mobile-friendly UI for end users to interact with the system.  

---

### **Summary**  
This use case provides a detailed overview of the Daimler Truck Fleet Management System’s requirements, features, and workflows. By understanding these scenarios, participants can focus on developing RESTful APIs, ensuring seamless entity relationships, and preparing for future enhancements like authentication and analytics.  

