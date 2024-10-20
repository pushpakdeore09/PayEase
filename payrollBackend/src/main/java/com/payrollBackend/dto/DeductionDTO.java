package com.payrollBackend.dto;

public class DeductionDTO {

    private Integer deductionId;
    private String deductionName;
    private Integer employeeId;
    private String deductionType;
    private Double deductionPercentage;

    public DeductionDTO() {
    }

    public DeductionDTO(Integer deductionId, String deductionName, Double deductionPercentage, String deductionType, Integer employeeId) {
        this.deductionId = deductionId;
        this.deductionName = deductionName;
        this.deductionPercentage = deductionPercentage;
        this.deductionType = deductionType;
        this.employeeId = employeeId;
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

    public Double getDeductionPercentage() {
        return deductionPercentage;
    }

    public void setDeductionPercentage(Double deductionPercentage) {
        this.deductionPercentage = deductionPercentage;
    }

    public String getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(String deductionType) {
        this.deductionType = deductionType;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }
}
