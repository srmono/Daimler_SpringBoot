Queries to explore relationships between the **Truck** and **Maintenance** tables:

---

### **1. List All Maintenance Records with Truck Details**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model,
    Maintenance.MaintenanceID,
    Maintenance.MaintenanceDate,
    Maintenance.Description,
    Maintenance.Cost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID;
```
- **Description**: Retrieves all maintenance records, including details of the associated trucks, such as their license plate and model.

---

### **2. Total Maintenance Cost for Each Truck**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model,
    SUM(Maintenance.Cost) AS TotalMaintenanceCost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
GROUP BY Truck.TruckID, Truck.LicensePlate, Truck.Model;
```
- **Description**: Calculates the total maintenance cost for each truck by grouping records based on the truck's ID.

---

### **3. Trucks with Maintenance Records in a Specific Date Range**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model,
    Maintenance.MaintenanceDate,
    Maintenance.Description
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
WHERE Maintenance.MaintenanceDate BETWEEN '2025-01-01' AND '2025-01-15';
```
- **Description**: Retrieves details of trucks that had maintenance within a specified date range.

---

### **4. Trucks Without Any Maintenance Records**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model
FROM Truck
LEFT JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
WHERE Maintenance.MaintenanceID IS NULL;
```
- **Description**: Identifies trucks that do not have any associated maintenance records by using a `LEFT JOIN`.

---

### **5. Maintenance History for a Specific Truck**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Maintenance.MaintenanceID,
    Maintenance.MaintenanceDate,
    Maintenance.Description,
    Maintenance.Cost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
WHERE Truck.TruckID = 1; -- Replace 1 with the desired TruckID
```
- **Description**: Displays the full maintenance history for a specific truck, identified by its `TruckID`.

---

### **6. Average Maintenance Cost for Each Truck**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model,
    AVG(Maintenance.Cost) AS AvgMaintenanceCost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
GROUP BY Truck.TruckID, Truck.LicensePlate, Truck.Model;
```
- **Description**: Calculates the average maintenance cost for each truck.

---

### **7. Trucks with the Highest Maintenance Cost**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model,
    SUM(Maintenance.Cost) AS TotalMaintenanceCost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
GROUP BY Truck.TruckID, Truck.LicensePlate, Truck.Model
ORDER BY TotalMaintenanceCost DESC
LIMIT 1;
```
- **Description**: Identifies the truck with the highest total maintenance cost.

---

### **8. List All Maintenance Types and Their Frequency**
**Query**:
```sql
SELECT 
    Maintenance.Description AS MaintenanceType,
    COUNT(*) AS Frequency
FROM Maintenance
GROUP BY Maintenance.Description
ORDER BY Frequency DESC;
```
- **Description**: Lists all types of maintenance performed, along with how many times each type has been recorded.

---

### **9. Maintenance Costs Grouped by Month for Each Truck**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    DATE_FORMAT(Maintenance.MaintenanceDate, '%Y-%m') AS MaintenanceMonth,
    SUM(Maintenance.Cost) AS MonthlyMaintenanceCost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
GROUP BY Truck.TruckID, Truck.LicensePlate, MaintenanceMonth
ORDER BY MaintenanceMonth ASC;
```
- **Description**: Groups maintenance costs by month for each truck to analyze monthly expenses.

---

### **10. Trucks with Maintenance Costs Above a Certain Threshold**
**Query**:
```sql
SELECT 
    Truck.TruckID,
    Truck.LicensePlate,
    Truck.Model,
    SUM(Maintenance.Cost) AS TotalMaintenanceCost
FROM Truck
JOIN Maintenance ON Truck.TruckID = Maintenance.TruckID
GROUP BY Truck.TruckID, Truck.LicensePlate, Truck.Model
HAVING TotalMaintenanceCost > 1000; -- Replace 1000 with your threshold
```
- **Description**: Finds trucks whose total maintenance costs exceed a specified threshold.

---

