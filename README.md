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
