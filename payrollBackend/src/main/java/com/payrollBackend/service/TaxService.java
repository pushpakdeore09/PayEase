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
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Tax added Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> getTaxByEmployeeId(Integer employeeId){
        Employee employee = employeeService.findByEmployeeId(employeeId);
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
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
        Employee employee = tax.get().getEmployee();
        taxRepository.deleteById(taxId);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Tax removed Successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> getTaxById(Integer taxId){
        Optional<Tax> tax = taxRepository.findById(taxId);
        if(tax.isEmpty()){
            return new ResponseEntity<>("Tax not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(tax, HttpStatus.OK);
    }

    public ResponseEntity<?> editTaxDetails(TaxDTO taxDTO){
        Integer taxId = taxDTO.getTaxId();
        Optional<Tax> taxOptional = taxRepository.findById(taxId);
        if(taxOptional.isEmpty()){
            return new ResponseEntity<>("Tax not found", HttpStatus.BAD_REQUEST);
        }
        Employee employee = employeeService.findByEmployeeId(taxDTO.getEmployeeId());
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Tax existingTax = taxOptional.get();
        BigDecimal taxAmountBD = BigDecimal.valueOf(taxDTO.getTaxPercentage()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(employee.getBaseSalary())).setScale(2, RoundingMode.HALF_UP);
        Double taxAmount = taxAmountBD.doubleValue();
        existingTax.setTaxName(taxDTO.getTaxName());
        existingTax.setTaxType(taxDTO.getTaxType());
        existingTax.setEmployee(employee);
        existingTax.setTaxPercentage(taxDTO.getTaxPercentage());
        existingTax.setTaxAmount(taxAmount);
        taxRepository.save(existingTax);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Tax updated Successfully", HttpStatus.OK);
    }
}
