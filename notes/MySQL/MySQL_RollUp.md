The **ROLLUP** operation in MySQL is an extension of the `GROUP BY` clause that allows you to generate summary reports with subtotals and grand totals. It is typically used for creating hierarchical reports where you need to see aggregated data at different levels.

Here’s a step-by-step example of how to use **ROLLUP** in MySQL.

### 1. **Setting Up the Database**
Let’s assume we have a table called `sales_data` that records sales transactions in a store. The structure of the table will include:

- `region` (the geographical region)
- `product_category` (the category of the product)
- `sales_amount` (the sales amount for the product)

Here’s the SQL to create and insert data into the table:

```sql
-- Create the table
CREATE TABLE sales_data (
    region VARCHAR(50),
    product_category VARCHAR(50),
    sales_amount DECIMAL(10, 2)
);

-- Insert some data into the table
INSERT INTO sales_data (region, product_category, sales_amount) VALUES
('North', 'Electronics', 1000.00),
('North', 'Clothing', 500.00),
('North', 'Furniture', 1500.00),
('South', 'Electronics', 1200.00),
('South', 'Clothing', 700.00),
('East', 'Electronics', 1300.00),
('East', 'Clothing', 400.00),
('East', 'Furniture', 800.00);
```

Now the `sales_data` table has records of sales across different regions and product categories.

### 2. **Using `GROUP BY` Without ROLLUP**

First, let’s try a simple `GROUP BY` query to get the total sales for each `region` and `product_category`.

```sql
SELECT region, product_category, SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY region, product_category;
```

This query groups the data by both `region` and `product_category`, and calculates the total sales for each group. It will output something like:

| region | product_category | total_sales |
|--------|------------------|-------------|
| North  | Electronics      | 1000.00     |
| North  | Clothing         | 500.00      |
| North  | Furniture        | 1500.00     |
| South  | Electronics      | 1200.00     |
| South  | Clothing         | 700.00      |
| East   | Electronics      | 1300.00     |
| East   | Clothing         | 400.00      |
| East   | Furniture        | 800.00      |

### 3. **Using `GROUP BY` with `ROLLUP`**

Now, let’s use **ROLLUP** to add subtotals for each region and a grand total at the end.

```sql
SELECT region, product_category, SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY region, product_category WITH ROLLUP;
```

What happens here:
- **ROLLUP** will add a subtotal for each `region`.
- It will also add a grand total for all regions and product categories.

The output will be:

| region | product_category | total_sales |
|--------|------------------|-------------|
| North  | Electronics      | 1000.00     |
| North  | Clothing         | 500.00      |
| North  | Furniture        | 1500.00     |
| North  | NULL             | 3000.00     | -- Subtotal for North
| South  | Electronics      | 1200.00     |
| South  | Clothing         | 700.00      |
| South  | NULL             | 1900.00     | -- Subtotal for South
| East   | Electronics      | 1300.00     |
| East   | Clothing         | 400.00      |
| East   | Furniture        | 800.00      |
| East   | NULL             | 2500.00     | -- Subtotal for East
| NULL   | NULL             | 7400.00     | -- Grand Total

### Explanation of the Output:
- **Subtotal for each region**: For example, in the row where `region = North` and `product_category = NULL`, the `total_sales` value is the sum of all sales for the North region (1000 + 500 + 1500 = 3000).
- **Grand Total**: The row where both `region = NULL` and `product_category = NULL` represents the total sales for all regions and product categories (1000 + 500 + 1500 + 1200 + 700 + 1300 + 400 + 800 = 7400).

### 4. **Filtering NULL Values**

You might want to filter out the subtotals and grand total from your result set. To do this, you can use `HAVING` to exclude rows where either `region` or `product_category` is `NULL`.

```sql
SELECT region, product_category, SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY region, product_category WITH ROLLUP
HAVING region IS NOT NULL AND product_category IS NOT NULL;
```

This query will give you the detailed sales for each region and product category, excluding the subtotals and grand totals.

### 5. **Customizing ROLLUP**

You can use **GROUPING()** to identify which rows represent subtotals or grand totals. The `GROUPING()` function returns `1` if a column is grouped by `ROLLUP`, and `0` if it's part of the result set.

Example with `GROUPING()`:

```sql
SELECT 
    region,
    product_category,
    SUM(sales_amount) AS total_sales,
    GROUPING(region) AS region_group,
    GROUPING(product_category) AS category_group
FROM sales_data
GROUP BY region, product_category WITH ROLLUP;
```

The output will include two additional columns, `region_group` and `category_group`, which show `1` for rows where the value is part of the rollup (i.e., subtotals or grand total) and `0` otherwise.

---

### Summary of ROLLUP Usage:
- **`ROLLUP`** adds subtotals and a grand total to your query results.
- It aggregates data at multiple levels and is useful for reporting.
- Use `HAVING` to filter out subtotals and grand totals if needed.
- **`GROUPING()`** can help identify rollup rows.

This is how you can practically use `ROLLUP` in MySQL to create hierarchical reports with subtotals and grand totals.