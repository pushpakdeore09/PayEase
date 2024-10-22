import apiClient from "./apiClient";

export const getPayrollReportData = async (employeeId, payrollMonthData) => {
    try {
        const response = await apiClient.post(`/payrollReport/${employeeId}`, payrollMonthData);
        
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

