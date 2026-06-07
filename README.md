# 🏥 Hospital Management System

A full-stack web application designed to streamline hospital workforce management. Recruiters can efficiently add, update, delete, and retrieve employee records — including department, post, and recruitment date — all from one centralized platform.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

The **Hospital Management System** is built to help hospitals manage their staff records with ease. A recruiter can log in and perform full CRUD operations on employee data, tracking key information such as the employee's department, job post, and date of recruitment — keeping HR operations organized and efficient.

---

## ✨ Features

- 👨‍⚕️ **Employee Registration** — Add new hospital staff with all relevant details
- 📋 **Employee Directory** — View a complete list of all employees
- ✏️ **Update Records** — Edit employee department, post, or recruitment date
- 🗑️ **Delete Records** — Remove an employee from the system
- 🔍 **Retrieve by ID** — Look up a specific employee's information
- 🏢 **Department Tracking** — Organize staff by their respective departments
- 📅 **Recruitment Date Logging** — Keep track of when each employee was hired

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React](https://reactjs.org/) | UI component library and SPA routing |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Express.js](https://expressjs.com/) | RESTful API and routing |
| [MongoDB](https://www.mongodb.com/) | NoSQL database for employee records |
| [Mongoose](https://mongoosejs.com/) | MongoDB object modeling (ODM) |
| dotenv | Environment variable management |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shyaka634/Hospital-Management-System.git
   cd Hospital-Management-System
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file inside the `Backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

5. **Start the backend server**
   ```bash
   cd Backend
   npm run dev
   ```

6. **Start the frontend**
   ```bash
   cd Frontend
   npm start
   ```

7. **Open the app**

   Visit `http://localhost:3000` in your browser.

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Get all employees |
| GET | `/employees/:id` | Get a single employee by ID |
| POST | `/employees` | Add a new employee |
| PUT | `/employees/:id` | Update an employee's details |
| DELETE | `/employees/:id` | Delete an employee record |

### Example Request Body (POST / PUT)

```json
{
  "name": "Dr. Alice Mugisha",
  "department": "Cardiology",
  "post": "Senior Consultant",
  "recruitmentDate": "2023-03-15"
}
```

### Example Response

```json
{
  "_id": "64a1f2b3c4e5f6a7b8c9d0e1",
  "name": "Dr. Alice Mugisha",
  "department": "Cardiology",
  "post": "Senior Consultant",
  "recruitmentDate": "2023-03-15T00:00:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 📁 Project Structure

```
Hospital-Management-System/
├── Backend/
│   ├── config/           # Database connection configuration
│   ├── middleware/        # Express middleware (error handling, etc.)
│   ├── models/           # Mongoose schemas (Employee model)
│   ├── routes/           # API route definitions
│   ├── .env              # Environment variables (not committed)
│   ├── package.json
│   └── server.js         # App entry point
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/   # Reusable React components
│       ├── pages/        # Page-level views
│       └── App.jsx       # Root component
│
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` folder with the following:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/hospitaldb` |

> ⚠️ Never commit your `.env` file. Make sure it is listed in `.gitignore`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ using React, Express.js, and MongoDB.
