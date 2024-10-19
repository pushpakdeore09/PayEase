package com.payrollBackend.repository;

import com.payrollBackend.model.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {
    Tax findByTaxName(String taxName);
    Optional<Tax> findByTaxNameAndEmployeeEmployeeId(String taxName, Integer employeeId);
    List<Tax> findByEmployee_EmployeeId(Integer employeeId);

}
