package com.payrollBackend.service;

import com.payrollBackend.dto.TaxDTO;
import com.payrollBackend.model.Employee;
import com.payrollBackend.model.Tax;
import com.payrollBackend.repository.TaxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
public class TaxService {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private TaxRepository taxRepository;

    public ResponseEntity<?> addTax(TaxDTO taxDTO){
        Employee employee = employeeService.findByEmployeeId(taxDTO.getEmployeeId());
        if(employee == null) {
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        //Tax oldTax = taxRepository.findByTaxName(taxDTO.getTaxName());
        Optional<Tax> oldTax = taxRepository.findByTaxNameAndEmployeeEmployeeId(taxDTO.getTaxName(), taxDTO.getEmployeeId());
        if(oldTax.isPresent()){
            return new ResponseEntity<>("Tax already exists", HttpStatus.BAD_REQUEST);
        }
        BigDecimal taxAmountBD = BigDecimal.valueOf(taxDTO.getTaxPercentage()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(employee.getBaseSalary())).setScale(2, RoundingMode.HALF_UP);
        Double taxAmount = taxAmountBD.doubleValue();
        Tax newtax = new Tax();
        newtax.setTaxName(taxDTO.getTaxName());
        newtax.setTaxType(taxDTO.getTaxType());
        newtax.setTaxPercentage(taxDTO.getTaxPercentage());
        newtax.setTaxAmount(taxAmount);
        newtax.setEmployee(employee);
        taxRepository.save(newtax);
        return new ResponseEntity<>("Tax added Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> getTaxByEmployeeId(Integer employeeId){
        List<Tax> taxes = taxRepository.findByEmployee_EmployeeId(employeeId);
        if(taxes.isEmpty()){
            return new ResponseEntity<>("Tax not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(taxes, HttpStatus.OK);
    }

    public ResponseEntity<?> removeTax(Integer taxId){
        Optional<Tax> tax = taxRepository.findById(taxId);
        if(tax.isEmpty()){
            return new ResponseEntity<>("Tax not found", HttpStatus.BAD_REQUEST);
        }
        taxRepository.deleteById(taxId);
        return new ResponseEntity<>("Tax removed Successfully", HttpStatus.OK);
    }
}
