package com.payrollBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "deductions")
public class Deductions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deductionId;

    @Column(name = "deduction_name", nullable = false)
    private String deductionName;

    @Column(name = "deduction_type", nullable = false)
    private String deductionType;

    @Column(name = "deduction_percent", nullable = false)
    private Double deductionPercentage;

    @Column(name = "deduction_amount", nullable = false)
    private Double deductionAmount;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    public Deductions() {
    }

    public Deductions(Integer deductionId, String deductionName, String deductionType, Double deductionPercentage, Double deductionAmount, Employee employee) {
        this.deductionId = deductionId;
        this.deductionName = deductionName;
        this.deductionType = deductionType;
        this.deductionPercentage = deductionPercentage;
        this.deductionAmount = deductionAmount;
        this.employee = employee;
    }

    public Integer getDeductionId() {
        return deductionId;
    }

    public void setDeductionId(Integer deductionId) {
        this.deductionId = deductionId;
    }

    public String getDeductionName() {
        return deductionName;
    }

    public void setDeductionName(String deductionName) {
        this.deductionName = deductionName;
    }

    public String getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(String deductionType) {
        this.deductionType = deductionType;
    }

    public Double getDeductionPercentage() {
        return deductionPercentage;
    }

    public void setDeductionPercentage(Double deductionPercentage) {
        this.deductionPercentage = deductionPercentage;
    }

    public Double getDeductionAmount() {
        return deductionAmount;
    }

    public void setDeductionAmount(Double deductionAmount) {
        this.deductionAmount = deductionAmount;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
