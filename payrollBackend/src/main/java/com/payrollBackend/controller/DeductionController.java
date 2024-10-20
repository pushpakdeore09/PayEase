package com.payrollBackend.controller;

import com.payrollBackend.dto.DeductionDTO;
import com.payrollBackend.service.DeductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class DeductionController {

    @Autowired
    private DeductionService deductionService;

    @PostMapping(value = "/addDeduction")
    public ResponseEntity<?> addDeduction(@RequestBody DeductionDTO deductionDTO){
        return deductionService.addDeduction(deductionDTO);
    }

    @GetMapping(value = "/deductions/employee/{employeeId}")
    public ResponseEntity<?> getDeduction(@PathVariable Integer employeeId){
        return deductionService.getDeductionByEmployeeId(employeeId);
    }

    @DeleteMapping(value = "/deduction/{deductionId}")
    public ResponseEntity<?> deleteDeduction(@PathVariable Integer deductionId){
        return deductionService.removeDeduction(deductionId);
    }

    @GetMapping(value = "/deduction/{deductionId}")
    public ResponseEntity<?> getDeductionById(@PathVariable Integer deductionId){
        return deductionService.getDeductionById(deductionId);
    }

    @PutMapping(value = "/deduction")
    public ResponseEntity<?> updateDeduction(@RequestBody DeductionDTO deductionDTO){
        return deductionService.editDeductionDetails(deductionDTO);
    }
}
