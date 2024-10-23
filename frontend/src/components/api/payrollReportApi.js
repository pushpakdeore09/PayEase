import apiClient from "./apiClient";

export const getPayrollReportData = async (employeeId, payrollMonthData) => {
    try {
        const response = await apiClient.post(`/payrollReport/${employeeId}`, payrollMonthData);
        return response;
    } catch (error) {
        throw error.response.data;
    }
};

export const getPaySlipData = async (paySlipData) => {
    try {
        const response = await apiClient.post("/paySlip", paySlipData);
        return response;
    } catch (error) {
        throw error.response.data;
    }
}

