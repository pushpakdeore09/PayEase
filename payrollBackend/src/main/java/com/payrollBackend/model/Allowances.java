package com.payrollBackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "allowances")
public class Allowances {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer allowanceId;

    @Column(name = "allowance_name", nullable = false)
    private String allowanceName;

    @Column(name = "allowance_type", nullable = false)
    private String allowanceType;

    @Column(name = "allowance_percent", nullable = false)
    private Double allowancePercentage;

    @Column(name = "allowance_amount")
    private Double allowanceAmount;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    public Allowances() {
    }

    public Allowances(Integer allowanceId, String allowanceName, Double allowancePercentage, String allowanceType, Double allowanceAmount, Employee employee) {
        this.allowanceId = allowanceId;
        this.allowanceName = allowanceName;
        this.allowancePercentage = allowancePercentage;
        this.allowanceType = allowanceType;
        this.allowanceAmount = allowanceAmount;
        this.employee = employee;
    }

    public Integer getAllowanceId() {
        return allowanceId;
    }

    public void setAllowanceId(Integer allowanceId) {
        this.allowanceId = allowanceId;
    }

    public Double getAllowancePercentage() {
        return allowancePercentage;
    }

    public void setAllowancePercentage(Double allowancePercentage) {
        this.allowancePercentage = allowancePercentage;
    }

    public String getAllowanceName() {
        return allowanceName;
    }

    public void setAllowanceName(String allowancesName) {
        this.allowanceName = allowancesName;
    }

    public String getAllowanceType() {
        return allowanceType;
    }

    public void setAllowanceType(String allowanceType) {
        this.allowanceType = allowanceType;
    }

    public Double getAllowanceAmount() {
        return allowanceAmount;
    }

    public void setAllowanceAmount(Double allowanceAmount) {
        this.allowanceAmount = allowanceAmount;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
