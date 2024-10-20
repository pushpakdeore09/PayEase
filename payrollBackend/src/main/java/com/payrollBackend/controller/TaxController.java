package com.payrollBackend.controller;

import com.payrollBackend.dto.TaxDTO;
import com.payrollBackend.service.TaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class TaxController {

    @Autowired
    private TaxService taxService;

    @PostMapping(value = "/addTax")
    public ResponseEntity<?> addTax(@RequestBody TaxDTO taxDTO){
        return taxService.addTax(taxDTO);
    }

    @GetMapping(value = "/tax/employee/{employeeId}")
    public ResponseEntity<?> getTaxByEmployeeId(@PathVariable Integer employeeId){
        return taxService.getTaxByEmployeeId(employeeId);
    }

    @DeleteMapping(value = "/tax/{taxId}")
    public ResponseEntity<?> deleteTax(@PathVariable Integer taxId){
        return taxService.removeTax(taxId);
    }

    @GetMapping(value = "/tax/{taxId}")
    public ResponseEntity<?> getTaxById(@PathVariable Integer taxId){
        return taxService.getTaxById(taxId);
    }

    @PutMapping(value = "/tax")
    public ResponseEntity<?> updateTax(@RequestBody TaxDTO taxDTO){
        return taxService.editTaxDetails(taxDTO);
    }

}
