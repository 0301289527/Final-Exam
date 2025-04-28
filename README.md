# Course Management App

A simple full-stack web application for managing student courses and grades.  
Frontend is built with React, backend is built with Node.js and Express.

## Features

- View course list with grades
- Add new courses
- Edit existing courses
- Delete courses

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Final-Exam
```

### 2. Install dependencies

```bash
cd Final-Exam
npx create-react-app frontend && mkdir backend
```

#### Backend

```bash
cd backend
npm init -y
npm install express cors
```

#### Frontend

```bash
cd ../frontend
npm install axios
```

### 3. Run the application

#### Start the backend server

```bash
cd backend
node server.js
```

The backend will run on [http://localhost:5000](http://localhost:5000).

#### Start the frontend development server

Open a new terminal window/tab, then:

```bash
cd frontend
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).​​

---

Now you can open your browser and use the app at [http://localhost:3000](http://localhost:3000).

### Debian VM with Node.js

```bash
sudo apt update
sudo apt install npm
```
#### Remote Debian VM to VS Code

```bash
sudo apt update --fix-missing
sudo apt upgrade
sudo apt install npm
```

```bash
cd backend
node server.js
```

```bash
cd frontend
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000).​​

