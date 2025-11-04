import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  // Callback to add new employee dynamically
  const handleEmployeeAdded = (newEmp) => {
    setEmployees(prev => [...prev, newEmp]);
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* Add Employee Form */}
      <AddEmployee onEmployeeAdded={handleEmployeeAdded} />

      {/* Employee Table */}
      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Dept</th><th>Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr><td colSpan="6">No employees found</td></tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td>
                  <Link to={`/edit/${emp.id}`}>Edit</Link>{" | "}
                  <button onClick={() => deleteEmployee(emp.id)}>Delete</button>{" | "}
                  <Link to={`/view/${emp.id}`}>View</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
