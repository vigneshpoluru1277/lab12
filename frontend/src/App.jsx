import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import ViewEmployee from "./ViewEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
        <Route path="/view/:id" element={<ViewEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
