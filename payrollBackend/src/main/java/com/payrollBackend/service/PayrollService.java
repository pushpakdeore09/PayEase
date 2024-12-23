package com.payrollBackend.service;

import com.payrollBackend.dto.PayrollDTO;
import com.payrollBackend.model.Employee;
import com.payrollBackend.model.Payroll;
import com.payrollBackend.model.PayrollMonth;
import com.payrollBackend.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PayrollService {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private PayrollMonthService payrollMonthService;

    @Autowired
    private PayrollRepository payrollRepository;

    public ResponseEntity<String> createPayroll(PayrollDTO payrollDTO) throws Exception {
        Payroll oldPayroll = payrollRepository.findByPayrollName(payrollDTO.getPayrollName());
        if(oldPayroll != null && oldPayroll.getEmployee().getEmployeeId().equals(payrollDTO.getEmployeeId())){
            return new ResponseEntity<>("Payroll already exists", HttpStatus.CONFLICT);
        }
        Employee employee = employeeService.findByEmployeeId(payrollDTO.getEmployeeId());
        PayrollMonth payrollMonth = payrollMonthService.findPayrollMonth(payrollDTO.getMonthName(), payrollDTO.getYear());
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        if(payrollMonth == null){
            return new ResponseEntity<>("Payroll month not found", HttpStatus.BAD_REQUEST);
        }
        Payroll payroll = new Payroll();
        payroll.setPayrollMonth(payrollMonth);
        payroll.setEmployee(employee);
        payroll.setPayrollName(payrollDTO.getPayrollName().toUpperCase());

        payrollRepository.save(payroll);
        return new ResponseEntity<>("Payroll created Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> findPayrollByEmployee(Integer employeeId) {
        Employee employee = employeeService.findByEmployeeId(employeeId);
        // Fetch all payrolls for the given employee
        List<Payroll> payrollList = payrollRepository.findByEmployee(employee); // Adjusted for method name

        if (payrollList != null && !payrollList.isEmpty()) {
            // Map the payroll records to DTOs
            List<PayrollDTO> payrollDTOList = payrollList.stream().map(payroll -> {
                PayrollDTO payrollDTO = new PayrollDTO();
                payrollDTO.setPayrollName(payroll.getPayrollName().toUpperCase()); // Assuming payrollName is a string in the Payroll entity
                payrollDTO.setEmployeeId(payroll.getEmployee().getEmployeeId());
                payrollDTO.setMonthName(payroll.getPayrollMonth().getMonthName());
                payrollDTO.setYear(payroll.getPayrollMonth().getYear());
                return payrollDTO;
            }).collect(Collectors.toList());

            // Return the list of PayrollDTOs as the response
            return new ResponseEntity<>(payrollDTOList, HttpStatus.OK);
        } else {
            // If no payrolls found, return an appropriate message
            return new ResponseEntity<>("Payroll not found", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> findAllPayrolls() {
        List<Payroll> payrolls = payrollRepository.findAll();

        if (payrolls.isEmpty()) {
            return new ResponseEntity<>("No payrolls found", HttpStatus.BAD_REQUEST);
        }

        List<PayrollDTO> payrollDTOS = payrolls.stream()
                .map(payroll -> new PayrollDTO(
                        payroll.getPayrollName().toUpperCase(),
                        payroll.getEmployee() != null ? payroll.getEmployee().getEmployeeId() : null,
                        payroll.getPayrollMonth() != null ? payroll.getPayrollMonth().getMonthName() : null,
                        payroll.getPayrollMonth() != null ? payroll.getPayrollMonth().getYear() : null
                ))
                .toList();

        return new ResponseEntity<>(payrollDTOS, HttpStatus.OK);
    }



}
