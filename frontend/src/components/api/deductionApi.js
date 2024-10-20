import { UNSAFE_ErrorResponseImpl } from "react-router-dom";
import apiClient from "./apiClient";

export const addDeductions = async (deductionData) => {
    try {
        const response = await apiClient.post("/addDeduction", deductionData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getDeductionByEmplyeeId = async (employeeId) => {
    try {
        const response = await apiClient.get(`/deductions/employee/${employeeId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteDeduction = async (deductionId) => {
    try {
        const response = await apiClient.delete(`/deduction/${deductionId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getDeduction = async (deductionId) => {
    try {
        const response = await apiClient.get(`/deduction/${deductionId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateDeduction = async (deductionData) => {
    try {
        const response = await apiClient.put(`/deduction`, deductionData);
        return response;
    } catch (error) {
        throw error;
    }
}

