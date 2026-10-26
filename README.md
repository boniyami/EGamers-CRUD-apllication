# 🎮 EGamers - Full-Stack CRUD Application

A robust full-stack web application designed for managing gaming products, 
built with an **ASP.NET Core Web API** backend, a **SQL Server** database, and an **Angular** reactive frontend.

---

## 🚀 Features

* **Complete CRUD Operations:** Create, read, update, and delete records seamlessly.
* **RESTful Web API:** Secure, decoupled backend architecture built with ASP.NET Core.
* **Reactive Frontend:** Dynamic and responsive user interface built with Angular and TypeScript.
* **Database Management:** Efficient relational data handling powered by SQL Server and Entity Framework Core.
* **Modern UI:** Clean dashboard design optimized for smooth user experience.

---

## 🛠️ Tech Stack

### **Backend**
* **Framework:** ASP.NET Core Web API (.NET 8/9)
* **ORM:** Entity Framework Core
* **Database:** Microsoft SQL Server
* **Architecture:** Model-View-Controller / Repository Pattern

### **Frontend**
* **Framework:** Angular (TypeScript)
* **Styling:** CSS / Bootstrap / Tailwind (update based on your styling)
* **HTTP Client:** Angular `HttpClient` for API communication

---

## 📂 Project Structure

```text
EGamers/
│
├── EGamersCRUDApi/        # ASP.NET Core Backend API Project
│   ├── Controllers/       # API Endpoints / Request Handlers
│   ├── Models/            # Database Entities and DTOs
│   ├── Data/              # EF Core DbContext & Configurations
│   └── Program.cs         # Application entry point & service configuration
│
└── EGamers_Client/        # Angular Frontend Project
    ├── src/
    │   ├── app/           # Components, Services, and Routing
    │   ├── assets/        # Images, icons, and static files
    │   └── environments/  # Environment configuration files
    └── package.json       # Frontend dependencies
```
## ⚙️ Setup, Database, & Installation Instructions 
Follow these steps to set up, configure the database, and run both projects locally on your machine.

**Prerequisites**
Make sure you have the following installed:
- .NET SDK
- Node.js & npm
- Angular CLI
- SQL Server

**1. Clone the Repository**
```Bash
git clone [https://github.com/boniyami/EGamers-CRUD-apllication.git](https://github.com/boniyami/EGamers-CRUD-apllication.git)
cd EGamers
```

**2. Database Configuration (SQL Server)**
- Ensure your Microsoft SQL Server instance is up and running.
- The project uses Entity Framework Core, which will automatically create and migrate the database based on your connection string.

**3. Backend API Setup (EGamersCRUDApi)**
Open your terminal and navigate to the backend folder:
```Bash
cd EGamersCRUDApi
```
Open appsettings.json and update the DefaultConnection string with your local SQL Server instance details:
```JSON
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=EGamersDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```
Apply Entity Framework migrations to generate the database:
```Bash
dotnet ef database update
```
Start the backend API:
```Bash
dotnet run
```

**4. Frontend Setup (EGamers_Client)**
Open a new terminal window and navigate to the client folder:
```Bash
cd EGamers_Client
```
Install the required Node.js dependencies:
```Bash
npm install
```
Start the Angular development server:
```Bash
ng serve
```
Open your browser and go to http://localhost:4200.

## 🌐 API Endpoints Overview
```
Method      Endpoint                    Description
GET         /api/Players                Retrieve all players records
GET         /api/Players/{id}           Retrieve a specific player record by ID
GET         /api/Players/Devices        Retrieve all devices records
POST        /api/Players                Create a new player record
POST        /api/Players/Upload/{id}    Upload a image
PUT         /api/Players/{id}           Update an existing player record
DELETE      /api/Players/{id}           Remove a player record
```

##👤 AuthorBoni Yamin
GitHub: @boniyami
