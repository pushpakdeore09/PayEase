package com.payrollBackend.service;

import com.payrollBackend.dto.PaySlipDTO;
import com.payrollBackend.dto.PayrollReportDTO;
import com.payrollBackend.model.*;
import com.payrollBackend.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayrollReportService {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PayrollMonthService payrollMonthService;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private AllowanceService allowanceService;

    public ResponseEntity<?> generatePayrollReport(Integer employeeId, PayrollMonth payrollMonth) throws Exception{
        Employee employee = employeeService.findByEmployeeId(employeeId);
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Department department = departmentService.findDepartmentById(employee.getDepartment().getDeptId());
        if(department == null){
            return new ResponseEntity<>("Department not found",HttpStatus.BAD_REQUEST);
        }
        PayrollMonth existingPayrollMonth = payrollMonthService.findPayrollMonth(payrollMonth.getMonthName(), payrollMonth.getYear());
        if(existingPayrollMonth == null){
            return new ResponseEntity<>("Payroll Month not found", HttpStatus.BAD_REQUEST);
        }
        Payroll payroll = payrollRepository.findByEmployee_EmployeeId(employee.getEmployeeId());
        if(payroll == null){
            return new ResponseEntity<>("Payroll not found", HttpStatus.BAD_REQUEST);
        }
        PayrollReportDTO payrollReportDTO = new PayrollReportDTO();
        payrollReportDTO.setEmployee(employee);
        payrollReportDTO.setPayroll(payroll);
        payrollReportDTO.setPayrollMonth(existingPayrollMonth);
        payrollReportDTO.setDepartment(department);
        payrollReportDTO.setAllowances(employee.getAllowances());
        payrollReportDTO.setDeductions(employee.getDeductions());
        payrollReportDTO.setTaxes(employee.getTaxes());
        return new ResponseEntity<>(payrollReportDTO, HttpStatus.OK);
    }

    public ResponseEntity<?> generatePaySlip(PaySlipDTO paySlipDTO) throws Exception{
        Employee employee = employeeService.findByEmployeeId(paySlipDTO.getEmployeeId());
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Department department = departmentService.findDepartmentById(employee.getDepartment().getDeptId());
        if(department == null){
            return new ResponseEntity<>("Department not found",HttpStatus.BAD_REQUEST);
        }
        PayrollMonth existingPayrollMonth = payrollMonthService.findPayrollMonth(paySlipDTO.getMonthName(), paySlipDTO.getYear());
        if(existingPayrollMonth == null){
            return new ResponseEntity<>("Payroll Month not found", HttpStatus.BAD_REQUEST);
        }
        Payroll payroll = payrollRepository.findByEmployee_EmployeeId(employee.getEmployeeId());
        if(payroll == null){
            return new ResponseEntity<>("Payroll not found", HttpStatus.BAD_REQUEST);
        }
        PayrollReportDTO payrollReportDTO = new PayrollReportDTO();
        payrollReportDTO.setEmployee(employee);
        payrollReportDTO.setPayroll(payroll);
        payrollReportDTO.setPayrollMonth(existingPayrollMonth);
        payrollReportDTO.setDepartment(department);
        payrollReportDTO.setAllowances(employee.getAllowances());
        payrollReportDTO.setDeductions(employee.getDeductions());
        payrollReportDTO.setTaxes(employee.getTaxes());
        return new ResponseEntity<>(payrollReportDTO, HttpStatus.OK);
    }
}
