import apiClient from "./apiClient";

export const addPayroll = async (payrollData) => {
    try {
        const response = await apiClient.post("/addPayroll", payrollData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getPayroll = async (payrollName) => {
    try {
        const response = await apiClient.get(`/payroll/${payrollName}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllPayrolls = async () => {
    try {
        const response = await apiClient.get("/payrolls");
        return response;
    } catch (error) {
        throw error;
    }
}