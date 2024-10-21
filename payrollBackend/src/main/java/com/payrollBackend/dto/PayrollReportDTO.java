package com.payrollBackend.dto;

import com.payrollBackend.model.*;

import java.util.List;

public class PayrollReportDTO {

    private Employee employee;
    private Department department;
    private Payroll payroll;
    private PayrollMonth payrollMonth;
    private List<Allowances> allowances;
    private List<Deductions> deductions;
    private List<Tax> taxes;

    public PayrollReportDTO() {
    }

    public PayrollReportDTO(List<Allowances> allowances, List<Deductions> deductions, Department department, Employee employee, Payroll payroll, PayrollMonth payrollMonth, List<Tax> taxes) {
        this.allowances = allowances;
        this.deductions = deductions;
        this.department = department;
        this.employee = employee;
        this.payroll = payroll;
        this.payrollMonth = payrollMonth;
        this.taxes = taxes;
    }

    public List<Allowances> getAllowances() {
        return allowances;
    }

    public void setAllowances(List<Allowances> allowances) {
        this.allowances = allowances;
    }

    public List<Deductions> getDeductions() {
        return deductions;
    }

    public void setDeductions(List<Deductions> deductions) {
        this.deductions = deductions;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Payroll getPayroll() {
        return payroll;
    }

    public void setPayroll(Payroll payroll) {
        this.payroll = payroll;
    }

    public PayrollMonth getPayrollMonth() {
        return payrollMonth;
    }

    public void setPayrollMonth(PayrollMonth payrollMonth) {
        this.payrollMonth = payrollMonth;
    }

    public List<Tax> getTaxes() {
        return taxes;
    }

    public void setTaxes(List<Tax> taxes) {
        this.taxes = taxes;
    }
}
