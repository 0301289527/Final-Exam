const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

let courses = [
    { id: 1, name: "Databases", grade: 4 },
    { id: 2, name: "Software Production", grade: 5 },
  ];

// Data file path
const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Read data
const readData = () => {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Get all courses
app.get('/courses', (req, res) => {
    const courses = readData();
    res.json(courses);
});

// Add new course
app.post('/courses', (req, res) => {
    const courses = readData();
    const newCourse = {
        id: Date.now().toString(),
        ...req.body
    };
    courses.push(newCourse);
    writeData(courses);
    res.json(newCourse);
});

// Update course
app.put('/courses/:id', (req, res) => {
    const courses = readData();
    const index = courses.findIndex(course => course.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }
    courses[index] = { ...courses[index], ...req.body };
    writeData(courses);
    res.json(courses[index]);
});

// Delete course
app.delete('/courses/:id', (req, res) => {
    const courses = readData();
    const filteredCourses = courses.filter(course => course.id !== req.params.id);
    if (filteredCourses.length === courses.length) {
        return res.status(404).json({ message: 'Course not found' });
    }
    writeData(filteredCourses);
    res.json({ message: 'Course deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 