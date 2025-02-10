### **SonarQube Integration with .NET on Windows – Step-by-Step Guide 🚀**  

SonarQube helps detect **security vulnerabilities, code smells, and bugs** in your **.NET** applications by performing **static code analysis**.  

✅ **Find security vulnerabilities (SQL Injection, XSS, Hardcoded Secrets)**  
✅ **Ensure coding best practices (Clean Code, OWASP Compliance)**  
✅ **Automate security testing in CI/CD pipelines**  

---

## **1️⃣ Install SonarQube on Windows**
### **🔹 Option 1: Run SonarQube Using Docker (Recommended)**
If you have **Docker Desktop installed**, run:  
```powershell
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```
📌 **Access SonarQube UI at:** `http://localhost:9000` (default credentials: `admin/admin`)  

---

### **🔹 Option 2: Install SonarQube Manually on Windows**
1️⃣ **Download SonarQube**  
- Go to the official website: [SonarQube Download](https://www.sonarqube.org/downloads/)  
- Download **SonarQube Community Edition (Latest LTS Version)**  
- Extract the **ZIP file** to `C:\sonarqube`  

2️⃣ **Start SonarQube Server**  
- Open **PowerShell** (Run as Administrator)  
- Navigate to the SonarQube `bin` folder:
  ```powershell
  cd C:\sonarqube\bin\windows-x86-64
  ```
- Start SonarQube:
  ```powershell
  .\StartSonar.bat
  ```
3️⃣ **Access UI:** `http://localhost:9000` (default login: `admin/admin`)  

---

## **2️⃣ Install SonarScanner for .NET on Windows**
SonarScanner is the tool that will scan your **.NET** code and send the report to **SonarQube**.  

1️⃣ **Install SonarScanner for .NET:**  
```powershell
dotnet tool install --global dotnet-sonarscanner
```
2️⃣ **Verify Installation:**  
```powershell
dotnet-sonarscanner --version
```

---

## **3️⃣ Configure SonarQube with .NET Project**
### **🔹 Step 1: Run SonarQube Analysis**
Navigate to your **.NET project folder** in PowerShell and run:

1️⃣ **Start Sonar Analysis (Before Build)**  
```powershell
dotnet-sonarscanner begin /k:"dotnet-app" /d:sonar.host.url="http://localhost:9000" /d:sonar.login="admin" /d:sonar.password="admin"
```

2️⃣ **Build the .NET Project**  
```powershell
dotnet build
```

3️⃣ **Complete Sonar Analysis (After Build)**  
```powershell
dotnet-sonarscanner end /d:sonar.login="admin" /d:sonar.password="admin"
```

---

## **4️⃣ Automate SonarQube in CI/CD (GitHub Actions)**
To integrate SonarQube into **CI/CD**, create `.github/workflows/sonar.yml`:  

```yaml
name: SonarQube Analysis
on: [push]
jobs:
  sonar:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '7.0.x'
      - name: Install SonarScanner
        run: dotnet tool install --global dotnet-sonarscanner
      - name: Run SonarQube Analysis
        run: |
          dotnet-sonarscanner begin /k:"dotnet-app" /d:sonar.host.url="http://localhost:9000" /d:sonar.token=${{ secrets.SONAR_TOKEN }}
          dotnet build
          dotnet-sonarscanner end /d:sonar.token=${{ secrets.SONAR_TOKEN }}
```

---

## **5️⃣ View SonarQube Security Report**
📌 **Go to** `http://localhost:9000`  
📌 **Check Security Hotspots, Bugs & Vulnerabilities**  

---

## **🛠️ Summary**
✅ **SonarQube detects security flaws in .NET applications**  
✅ **Easiest integration via `dotnet-sonarscanner`**  
✅ **Automate security testing using CI/CD (GitHub Actions)**  
