package com.payrollBackend.controller;

import com.payrollBackend.dto.PaySlipDTO;
import com.payrollBackend.model.PayrollMonth;
import com.payrollBackend.service.PayrollReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class PayrollReportController {

    @Autowired
    private PayrollReportService payrollReportService;

    @PostMapping(value = "/payrollReport/{employeeId}")
    public ResponseEntity<?> getPayrollReport(@PathVariable Integer employeeId, @RequestBody PayrollMonth payrollMonth) throws Exception{
        return payrollReportService.generatePayrollReport(employeeId, payrollMonth);
    }

    @PostMapping(value = "/paySlip")
    public ResponseEntity<?> getPaySlip(@RequestBody PaySlipDTO paySlipDTO) throws Exception{
        return payrollReportService.generatePaySlip(paySlipDTO);
    }
}
