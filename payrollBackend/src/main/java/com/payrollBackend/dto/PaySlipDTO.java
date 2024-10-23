package com.payrollBackend.dto;


public class PaySlipDTO {
    private Integer employeeId;
    private String firstName;
    private String lastName;
    private String monthName;
    private Integer year;

    public PaySlipDTO() {
    }

    public PaySlipDTO(Integer employeeId, String firstName, String lastName, String monthName, Integer year) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.monthName = monthName;
        this.year = year;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
