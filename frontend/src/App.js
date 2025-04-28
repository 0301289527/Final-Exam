import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ name: '', score: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5000/courses';

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: '', score: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEdit = (course) => {
    setFormData({ name: course.name, score: course.score });
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="big-title">Yuxuan Liu</h1>
        <h2 className="group-title">NTIS23K</h2>
      </header>

      <h2 className="section-title">My Courses</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Grade</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.score}</td>
              <td>
                <button className="edit-link" onClick={() => handleEdit(course)}>Edit</button>
              </td>
              <td>
                <button className="delete-link" onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Course Name</label>
          <input
            id="name"
            type="text"
            placeholder="Course Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="score">Grade</label>
          <input
            id="score"
            type="number"
            placeholder="Grade"
            value={formData.score}
            onChange={(e) => setFormData({ ...formData, score: e.target.value })}
            required
          />
        </div>
        <button className="add-btn" type="submit">{editingId ? 'Update Course' : 'Add Course'}</button>
      </form>
    </div>
  );
}

export default App;
