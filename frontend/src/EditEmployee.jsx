import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function EditEmployee() {
  const { id } = useParams();
  const [emp, setEmp] = useState({ name: "", email: "", department: "", salary: "" });
  const navigate = useNavigate();

  useEffect(() => { fetchEmployee(); }, []);

  const fetchEmployee = async () => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setEmp(data);
  };

  const handleChange = e => setEmp({ ...emp, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const employeeData = { ...emp, salary: parseFloat(emp.salary) };
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData)
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={emp.name} onChange={handleChange} required /><br/>
        <input name="email" value={emp.email} onChange={handleChange} required /><br/>
        <input name="department" value={emp.department} onChange={handleChange} required /><br/>
        <input name="salary" type="number" value={emp.salary} onChange={handleChange} required /><br/>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
