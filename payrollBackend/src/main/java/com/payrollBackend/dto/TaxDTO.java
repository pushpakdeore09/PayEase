package com.payrollBackend.dto;

public class TaxDTO {

    private Integer taxId;
    private String taxName;
    private Integer employeeId;
    private String taxType;
    private Double taxPercentage;

    public TaxDTO() {
    }

    public TaxDTO(Integer employeeId, Integer taxId, String taxName, Double taxPercentage, String taxType) {
        this.employeeId = employeeId;
        this.taxId = taxId;
        this.taxName = taxName;
        this.taxPercentage = taxPercentage;
        this.taxType = taxType;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getTaxId() {
        return taxId;
    }

    public void setTaxId(Integer taxId) {
        this.taxId = taxId;
    }

    public String getTaxName() {
        return taxName;
    }

    public void setTaxName(String taxName) {
        this.taxName = taxName;
    }

    public Double getTaxPercentage() {
        return taxPercentage;
    }

    public void setTaxPercentage(Double taxPercentage) {
        this.taxPercentage = taxPercentage;
    }

    public String getTaxType() {
        return taxType;
    }

    public void setTaxType(String taxType) {
        this.taxType = taxType;
    }
}
