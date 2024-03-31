import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const makeRequest = async <T>(path: string, method = "GET"): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.request({
            url: path,
            method,
        });
    return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
    