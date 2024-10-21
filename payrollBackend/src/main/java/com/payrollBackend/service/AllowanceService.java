package com.payrollBackend.service;

import com.payrollBackend.dto.AllowanceDTO;
import com.payrollBackend.model.Allowances;
import com.payrollBackend.model.Employee;
import com.payrollBackend.repository.AllowanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
public class AllowanceService {

    @Autowired
    private AllowanceRepository allowanceRepository;

    @Autowired
    private EmployeeService employeeService;

    public ResponseEntity<?> addAllowance(AllowanceDTO allowanceDTO){

        Employee employee = employeeService.findByEmployeeId(allowanceDTO.getEmployeeId());
        if(employee == null) {
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Optional<Allowances> oldAllowances = allowanceRepository.findByAllowanceNameAndEmployeeEmployeeId(allowanceDTO.getAllowanceName(), allowanceDTO.getEmployeeId());
        if(oldAllowances.isPresent()){
            return new ResponseEntity<>("Allowance already exists", HttpStatus.BAD_REQUEST);
        }
        BigDecimal allowanceAmount = BigDecimal.valueOf(allowanceDTO.getAllowancePercentage()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(employee.getBaseSalary())).setScale(2, RoundingMode.HALF_UP);
        Double doubleAllowanceAmount = allowanceAmount.doubleValue();

        Allowances newAllowances = new Allowances();
        newAllowances.setAllowanceName(allowanceDTO.getAllowanceName());
        newAllowances.setAllowanceType(allowanceDTO.getAllowanceType());
        newAllowances.setAllowancePercentage(allowanceDTO.getAllowancePercentage());
        newAllowances.setAllowanceAmount(doubleAllowanceAmount);
        newAllowances.setEmployee(employee);
        allowanceRepository.save(newAllowances);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Allowance added Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> getAllowancesByEmployeeId(Integer employeeId){
        Employee employee = employeeService.findByEmployeeId(employeeId);
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        List<Allowances> allowances = allowanceRepository.findByEmployee_EmployeeId(employeeId);
        if(allowances.isEmpty()){
            return new ResponseEntity<>("Allowances not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(allowances, HttpStatus.OK);
    }

    public ResponseEntity<?> removeAllowance(Integer allowanceId){
        Optional<Allowances> allowance = allowanceRepository.findById(allowanceId);
        if(allowance.isEmpty()){
            return new ResponseEntity<>("Allowance not found", HttpStatus.BAD_REQUEST);
        }
        Employee employee = allowance.get().getEmployee();
        allowanceRepository.deleteById(allowanceId);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Allowance removed Successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> getAllowanceById(Integer allowanceId){
        Optional<Allowances> allowance = allowanceRepository.findById(allowanceId);
        if(allowance.isEmpty()){
            return new ResponseEntity<>("Allowance not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(allowance, HttpStatus.OK);
    }

    public ResponseEntity<?> editAllowanceDetails(AllowanceDTO allowanceDTO) {
        Integer allowanceId = allowanceDTO.getAllowanceId();

        Optional<Allowances> allowanceOptional = allowanceRepository.findById(allowanceId);
        if (allowanceOptional.isEmpty()) {
            return new ResponseEntity<>("Allowance not found", HttpStatus.BAD_REQUEST);
        }
        Employee employee = employeeService.findByEmployeeId(allowanceDTO.getEmployeeId());
        if(employee == null){
            return new ResponseEntity<>("Employee not found", HttpStatus.BAD_REQUEST);
        }
        Allowances existingAllowance = allowanceOptional.get();
        BigDecimal allowanceAmount = BigDecimal.valueOf(allowanceDTO.getAllowancePercentage()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(employee.getBaseSalary())).setScale(2, RoundingMode.HALF_UP);
        Double doubleAllowanceAmount = allowanceAmount.doubleValue();
        existingAllowance.setAllowanceName(allowanceDTO.getAllowanceName());
        existingAllowance.setEmployee(employee);
        existingAllowance.setAllowanceType(allowanceDTO.getAllowanceType());
        existingAllowance.setAllowancePercentage(allowanceDTO.getAllowancePercentage());
        existingAllowance.setAllowanceAmount(doubleAllowanceAmount);
        allowanceRepository.save(existingAllowance);
        employeeService.updateNetSalary(employee);
        return new ResponseEntity<>("Allowance updated Successfully", HttpStatus.OK);
    }

}
