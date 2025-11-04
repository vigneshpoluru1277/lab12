import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function ViewEmployee() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => { fetchEmployee(); }, []);

  const fetchEmployee = async () => {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    setEmp(data);
  };

  if (!emp) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p><b>ID:</b> {emp.id}</p>
      <p><b>Name:</b> {emp.name}</p>
      <p><b>Email:</b> {emp.email}</p>
      <p><b>Department:</b> {emp.department}</p>
      <p><b>Salary:</b> {emp.salary}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
}
