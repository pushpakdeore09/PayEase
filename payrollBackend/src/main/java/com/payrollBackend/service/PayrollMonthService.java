package com.payrollBackend.service;

import com.payrollBackend.model.PayrollMonth;
import com.payrollBackend.repository.PayrollMonthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PayrollMonthService {

    @Autowired
    private PayrollMonthRepository payrollMonthRepository;

    public ResponseEntity<?> addPayrollMonth(PayrollMonth payrollMonth) {
        Optional<PayrollMonth> existingPayrollMonth = payrollMonthRepository
                .findByYearAndStartDateAndEndDate(payrollMonth.getYear(), payrollMonth.getStartDate(), payrollMonth.getEndDate());

        if (existingPayrollMonth.isPresent()) {
            return new ResponseEntity<>("Payroll Month already exists", HttpStatus.BAD_REQUEST);
        }

        // Create and save a new payroll month
        PayrollMonth newPayrollMonth = new PayrollMonth();
        newPayrollMonth.setMonthName(payrollMonth.getMonthName());
        newPayrollMonth.setStartDate(payrollMonth.getStartDate());
        newPayrollMonth.setEndDate(payrollMonth.getEndDate());
        newPayrollMonth.setYear(payrollMonth.getYear());
        payrollMonthRepository.save(newPayrollMonth);

        return new ResponseEntity<>("Payroll Month Saved", HttpStatus.OK);
    }

    public ResponseEntity<?> getPayrollMonths(String monthName, Integer year){
        List<PayrollMonth> payrollMonths = payrollMonthRepository.findByMonthNameAndYear(monthName, year);
        if(payrollMonths.isEmpty()){
            return new ResponseEntity<>("Payroll month not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(payrollMonths, HttpStatus.OK);
    }

    public PayrollMonth findPayrollMonth(String monthName, Integer year){
        List<PayrollMonth> payrollMonths = payrollMonthRepository.findByMonthNameAndYear(monthName, year);
        if(payrollMonths.isEmpty()){
            return null;
        }
        return payrollMonths.get(0);
    }
}
