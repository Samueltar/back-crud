# 📝 TaskFlow - Express & Node.js CRUD REST API

<div align="center">

![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

<p align="center">
  A clean, modular RESTful Task Management API built with <strong>Node.js</strong> and <strong>Express.js</strong>, featuring <strong>persistent JSON file storage</strong>, an MVC architecture, and a built-in interactive frontend dashboard.
</p>

</div>

---

## ✨ Features

- ⚡ **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly.
- 🗄️ **Persistent Storage**: Automatic asynchronous JSON file storage (`tasks.json`).
- 🏗️ **Clean MVC Architecture**: Separation of concerns with dedicated routers and controllers.
- 🌐 **Interactive Frontend Dashboard**: Modern and responsive UI for managing tasks in real time.
- 🛡️ **Robust Error Handling**: Input validation and proper HTTP status codes (`200`, `201`, `400`, `404`, `500`).
- 🔗 **CORS Enabled**: Ready for integration with any client application or frontend framework.

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Samueltar/back-crud.git
cd back-crud
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
npm start
```
The server will start at **`http://localhost:3000`**!

Open your browser and navigate to `http://localhost:3000` to interact with the task manager UI.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Request Body | Response Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Retrieve all tasks | *None* | `200 OK` |
| `GET` | `/api/tasks/:id` | Retrieve a single task by ID | *None* | `200 OK` / `404 Not Found` |
| `POST` | `/api/tasks` | Create a new task | `{"title": "My Task"}` | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/tasks/:id` | Update task title or status | `{"completed": true}` | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/tasks/:id` | Remove a task by ID | *None* | `200 OK` / `404 Not Found` |

---

## 📂 Project Structure

```text
├── controllers/
│   └── taskcontroller.js    # Business logic & file persistence
├── public/
│   └── index.html           # Interactive frontend UI
├── routes/
│   └── taskRoutes.js        # Express router definitions
├── .gitignore
├── index.js                 # App entry point & middleware configuration
├── package.json             # Project dependencies & metadata
├── tasks.json               # Persistent JSON database
└── README.md                # Project documentation
```

---

## 👨‍💻 Author

**Samuel Tarekegn**
- GitHub: [@SamuelTARE](https://github.com/SamuelTARE)
- Email: [samueltarekegn55@gmail.com](mailto:samueltarekegn55@gmail.com)

---

## 📄 License
This project is licensed under the MIT License - feel free to use and modify it for your own projects!
