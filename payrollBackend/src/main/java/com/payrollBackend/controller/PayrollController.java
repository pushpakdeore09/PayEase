package com.payrollBackend.controller;

import com.payrollBackend.dto.PayrollDTO;
import com.payrollBackend.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class PayrollController {


    @Autowired
    private PayrollService payrollService;

    @PostMapping(value = "/addPayroll")
    public ResponseEntity<String> addPayroll(@RequestBody PayrollDTO payrollDTO) throws Exception {
        return payrollService.createPayroll(payrollDTO);
    }

    @GetMapping(value = "/payroll/{employeeId}")
    public ResponseEntity<?> getPayroll(@PathVariable Integer employeeId){
        return payrollService.findPayrollByEmployee(employeeId);
    }

    @GetMapping(value = "/payrolls")
    public ResponseEntity<?> getAllPayrolls() {
        return payrollService.findAllPayrolls();
    }
}
