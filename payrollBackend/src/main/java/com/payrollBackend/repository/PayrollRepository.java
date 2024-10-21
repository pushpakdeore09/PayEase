package com.payrollBackend.repository;

import com.payrollBackend.dto.PayrollDTO;
import com.payrollBackend.model.Employee;
import com.payrollBackend.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Integer> {
    Payroll findByPayrollName(String payrollName);
    List<Payroll> findByEmployee(Employee employee);
    Payroll findByEmployee_EmployeeId(Integer employeeId);
}
