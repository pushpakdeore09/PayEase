import apiClient from "./apiClient";

export const addTax =  async (taxData) => {
    try {
        const response = await apiClient.post("/addTax", taxData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getTaxByEmployeeId = async (employeeId) => {
    try {
        const response = await apiClient.get(`/tax/employee/${employeeId}`)
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

export const getTaxById = async (taxId) => {
    try {
        const response = await apiClient.get(`/tax/${taxId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateTax = async (taxData) => {
    try {
        const response = await apiClient.put("/tax", taxData);
        return response;
    } catch (error) {
        throw error;
    }
}