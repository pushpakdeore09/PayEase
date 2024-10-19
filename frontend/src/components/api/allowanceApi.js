import apiClient from "./apiClient";

export const addAllowance = async (allowanceData) =>{
    try {
        const response = await apiClient.post("/addAllowance", allowanceData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllowanceByEmployeeId = async (employeeId) =>{
    try {
        const response = await apiClient.get(`/allowances/${employeeId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteAllowance = async (allowanceId) => {
    try {
        const response = await apiClient.delete(`allowance/${allowanceId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllowance = async (allowanceId) => {
    try {
        const response = await apiClient.get(`/allowance/${allowanceId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateAllowance = async (allowanceData) => {
    try {
        const response = await apiClient.put("/allowance", allowanceData);
        return response;
    } catch (error) {
        throw error;
    }
}