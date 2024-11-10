package com.payrollBackend.service;

import com.payrollBackend.model.*;
import com.payrollBackend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private DeductionRepository deductionRepository;

    @Autowired
    private AllowanceRepository allowanceRepository;

    @Autowired
    private TaxRepository taxRepository;

    @Transactional
    public ResponseEntity<Map<String, Object>> addEmployee(Employee employee) {
        Department department = departmentRepository.findByDeptName(employee.getDepartment().getDeptName());
        Optional<Employee> isEmpExist = Optional.ofNullable(employeeRepository.findByEmail(employee.getEmail()));
        if(isEmpExist.isPresent()){
            return new ResponseEntity<>(Map.of("message", "Employee already exists"), HttpStatus.CONFLICT);
        }
        Employee newEmployee = new Employee();
        newEmployee.setFirstName(employee.getFirstName());
        newEmployee.setLastName(employee.getLastName());
        newEmployee.setGender(employee.getGender());
        newEmployee.setJoiningDate(employee.getJoiningDate());
        newEmployee.setDob(employee.getDob());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setAddress(employee.getAddress());
        newEmployee.setBaseSalary(employee.getBaseSalary());
        newEmployee.setEmployeeType(employee.getEmployeeType());
        newEmployee.setDesignation(employee.getDesignation());
        newEmployee.setDepartment(department);
        newEmployee.setNetSalary(employee.getBaseSalary());
        employeeRepository.save(newEmployee);
        if (department.getEmployeeCount() == null) {
            department.setEmployeeCount(1);
        } else {
            department.setEmployeeCount(department.getEmployeeCount() + 1);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Employee added successfully");
        response.put("employeeId", newEmployee.getEmployeeId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<String> removeEmployee(Integer employeeId) throws Exception {

        Employee employee = findByEmployeeId(employeeId);
        List<Payroll> payrolls = payrollRepository.findByEmployee(employee);
        if (payrolls != null && !payrolls.isEmpty()) {
            payrollRepository.deleteAll(payrolls);
        }
        List<Allowances> allowances = allowanceRepository.findByEmployee(employee);
        if (allowances != null && !allowances.isEmpty()) {
            allowanceRepository.deleteAll(allowances);
        }
        List<Deductions> deductions = deductionRepository.findByEmployee(employee);
        if (deductions != null && !deductions.isEmpty()) {
            deductionRepository.deleteAll(deductions);
        }
        employeeRepository.delete(employee);
        Department department = employee.getDepartment();
        if (department != null) {
            Department existingDepartment = departmentRepository.findById(department.getDeptId())
                    .orElseThrow(() -> new Exception("Department not found"));
            existingDepartment.setEmployeeCount(existingDepartment.getEmployeeCount() - 1);
            departmentRepository.save(existingDepartment);
        }
        return new ResponseEntity<>("Employee removed Successfully", HttpStatus.OK);
    }


    public Employee findByEmployeeId(Integer employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        return employee.orElse(null);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    public ResponseEntity<?> findEmployee(Integer employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if(employee.isPresent()){
            return new ResponseEntity<>(employee, HttpStatus.OK);
        }
        return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> editEmployeeDetails(Employee employee) throws Exception {
        Integer employeeId = employee.getEmployeeId();
        Optional<Employee> optionalOldEmployee = Optional.ofNullable(findByEmployeeId(employeeId));
        if (optionalOldEmployee.isEmpty()) {
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Employee existingEmployee = optionalOldEmployee.get();
        Double newBaseSalary = employee.getBaseSalary();
        Double existingBaseSalary = existingEmployee.getBaseSalary();
        if(!newBaseSalary.equals(existingBaseSalary)){
            updateAllowanceAndDeductionAndTax(employee, newBaseSalary);
        }
        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setGender(employee.getGender());
        existingEmployee.setDob(employee.getDob());
        existingEmployee.setAddress(employee.getAddress());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setDesignation(employee.getDesignation());
        existingEmployee.setJoiningDate(employee.getJoiningDate());
        existingEmployee.setEmployeeType(employee.getEmployeeType());
        existingEmployee.setBaseSalary(newBaseSalary);
        updateNetSalary(employee);
        if (employee.getDepartment() != null) {
            existingEmployee.setDepartment(employee.getDepartment());
        }
        employeeRepository.save(existingEmployee);
        return new ResponseEntity<>("Employee updated Successfully", HttpStatus.OK);
    }

    private void updateAllowanceAndDeductionAndTax(Employee employee, Double newBaseSalary) {
        List<Allowances> allowances = allowanceRepository.findByEmployee_EmployeeId(employee.getEmployeeId());
        List<Deductions> deductions = deductionRepository.findByEmployee_EmployeeId(employee.getEmployeeId());
        List<Tax> taxes = taxRepository.findByEmployee_EmployeeId(employee.getEmployeeId());

        for (Allowances allowance : allowances) {
            BigDecimal allowanceAmount = BigDecimal.valueOf(allowance.getAllowancePercentage())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(newBaseSalary))
                    .setScale(2, RoundingMode.HALF_UP);
            allowance.setAllowanceAmount(allowanceAmount.doubleValue());
            allowanceRepository.save(allowance);
        }

        for (Deductions deduction : deductions) {
            BigDecimal deductionAmount = BigDecimal.valueOf(deduction.getDeductionPercentage())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(newBaseSalary))
                    .setScale(2, RoundingMode.HALF_UP);
            deduction.setDeductionAmount(deductionAmount.doubleValue());
            deductionRepository.save(deduction);
        }

        for (Tax tax : taxes) {
            BigDecimal taxAmount = BigDecimal.valueOf(tax.getTaxPercentage())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(newBaseSalary))
                    .setScale(2, RoundingMode.HALF_UP);
            tax.setTaxAmount(taxAmount.doubleValue());
            taxRepository.save(tax);
        }
    }

    public void updateNetSalary(Employee employee){
        Double totalAllowances = allowanceRepository.findByEmployee_EmployeeId(employee.getEmployeeId())
                .stream().mapToDouble(Allowances::getAllowanceAmount).sum();

        Double totalDeductions = deductionRepository.findByEmployee_EmployeeId(employee.getEmployeeId())
                .stream().mapToDouble(Deductions::getDeductionAmount).sum();

        Double totalTax = taxRepository.findByEmployee_EmployeeId(employee.getEmployeeId())
                .stream().mapToDouble(Tax::getTaxAmount).sum();

        Double netSalary =  employee.getBaseSalary() + totalAllowances - totalDeductions - totalTax;
        employee.setNetSalary(netSalary);
        employeeRepository.save(employee);
    }

}
