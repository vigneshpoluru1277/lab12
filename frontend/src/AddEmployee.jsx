import React, { useState } from "react";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function AddEmployee({ onEmployeeAdded }) {
  const [emp, setEmp] = useState({ name: "", email: "", department: "", salary: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setEmp({ ...emp, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const employeeData = { ...emp, salary: parseFloat(emp.salary) };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
      });

      if (res.ok) {
        const newEmp = await res.json();
        setMessage("Employee added successfully!");
        setEmp({ name: "", email: "", department: "", salary: "" });

        // Update parent list dynamically
        if (onEmployeeAdded) onEmployeeAdded(newEmp);
      } else {
        setMessage("Failed to add employee.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error while adding employee.");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Add Employee</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={emp.name} onChange={handleChange} required /><br/>
        <input name="email" placeholder="Email" value={emp.email} onChange={handleChange} required /><br/>
        <input name="department" placeholder="Department" value={emp.department} onChange={handleChange} required /><br/>
        <input name="salary" type="number" placeholder="Salary" value={emp.salary} onChange={handleChange} required /><br/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
