package com.payrollBackend.service;

import com.payrollBackend.dto.DeductionDTO;
import com.payrollBackend.model.Deductions;
import com.payrollBackend.model.Employee;
import com.payrollBackend.repository.DeductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DeductionService {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private DeductionRepository deductionRepository;

    public ResponseEntity<?> addDeduction(DeductionDTO deductionDTO){
        Employee employee = employeeService.findByEmployeeId(deductionDTO.getEmployeeId());
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Optional<Deductions> oldDeductions = deductionRepository.findByDeductionNameAndEmployeeEmployeeId(deductionDTO.getDeductionName(), deductionDTO.getEmployeeId());
        if(oldDeductions.isPresent()){
            return new ResponseEntity<>("Deduction already exists", HttpStatus.BAD_REQUEST);
        }

        BigDecimal allowanceAmount = BigDecimal.valueOf(deductionDTO.getDeductionPercentage()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(employee.getBaseSalary())).setScale(2, RoundingMode.HALF_UP);
        Double doubleDeductionAmount = allowanceAmount.doubleValue();
        Deductions newDeductions = new Deductions();
        newDeductions.setDeductionName(deductionDTO.getDeductionName());
        newDeductions.setDeductionType(deductionDTO.getDeductionType());
        newDeductions.setDeductionPercentage(deductionDTO.getDeductionPercentage());
        newDeductions.setDeductionAmount(doubleDeductionAmount);
        newDeductions.setEmployee(employee);
        deductionRepository.save(newDeductions);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Deduction saved Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> getDeductionByEmployeeId(Integer employeeId){
        Employee employee = employeeService.findByEmployeeId(employeeId);
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        List<Deductions> deductions = deductionRepository.findByEmployee_EmployeeId(employeeId);
        if(deductions.isEmpty()){
            return new ResponseEntity<>("Deductions not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(deductions, HttpStatus.OK);
    }

    public ResponseEntity<?> removeDeduction(Integer deductionId){
        Optional<Deductions> deductionOptional = deductionRepository.findById(deductionId);
        if(deductionOptional.isEmpty()){
            return new ResponseEntity<>("Deduction not found", HttpStatus.BAD_REQUEST);
        }
        Employee employee = deductionOptional.get().getEmployee();
        Deductions deduction = deductionOptional.get();
        deductionRepository.delete(deduction);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Deduction removed Successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> getDeductionById(Integer deductionId){
        Optional<Deductions> deduction = deductionRepository.findById(deductionId);
        if(deduction.isEmpty()){
            return new ResponseEntity<>("Deduction not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(deduction, HttpStatus.OK);
    }

    public ResponseEntity<?> editDeductionDetails(DeductionDTO deductionDTO){
        Integer deductionId = deductionDTO.getDeductionId();
        Optional<Deductions> deductionOptional = deductionRepository.findById(deductionId);
        if(deductionOptional.isEmpty()){
            return new ResponseEntity<>("Deduction not found", HttpStatus.BAD_REQUEST);
        }
        Employee employee = employeeService.findByEmployeeId(deductionDTO.getEmployeeId());
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Deductions existingDeduction = deductionOptional.get();
        BigDecimal allowanceAmount = BigDecimal.valueOf(deductionDTO.getDeductionPercentage()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(employee.getBaseSalary())).setScale(2, RoundingMode.HALF_UP);
        Double doubleDeductionAmount = allowanceAmount.doubleValue();
        existingDeduction.setDeductionName(deductionDTO.getDeductionName());
        existingDeduction.setDeductionType(deductionDTO.getDeductionType());
        existingDeduction.setDeductionPercentage(deductionDTO.getDeductionPercentage());
        existingDeduction.setDeductionAmount(doubleDeductionAmount);
        existingDeduction.setEmployee(employee);
        deductionRepository.save(existingDeduction);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Deduction updated Successfully", HttpStatus.OK);

    }
}
