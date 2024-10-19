import apiClient from "./apiClient";

export const addTax =  async (taxData) => {
    try {
        const response = await apiClient.post("/addTax", taxData);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getTaxByEmployeeId = async (employeeId) => {
    try {
        const response = await apiClient.get(`/tax/${employeeId}`)
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteTax = async (taxId) => {
    try {
        const response = await apiClient.delete(`/tax/${taxId}`);
        return response;
    } catch (error) {
        throw error;
    }
}