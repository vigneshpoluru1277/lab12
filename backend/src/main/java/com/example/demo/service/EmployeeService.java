package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Employee saveEmployee(Employee emp) {
        return repo.save(emp);
    }

    public Employee updateEmployee(Long id, Employee emp) {
        Optional<Employee> existing = repo.findById(id);
        if (existing.isPresent()) {
            Employee e = existing.get();
            e.setName(emp.getName());
            e.setEmail(emp.getEmail());
            e.setDepartment(emp.getDepartment());
            e.setSalary(emp.getSalary());
            return repo.save(e);
        }
        return null;
    }

    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }
}
