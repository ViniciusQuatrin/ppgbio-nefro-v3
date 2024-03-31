import axios, { AxiosResponse } from 'axios';
import { CreateUser, UserData } from 'shared/interfaces/mysql-db';
import { getFormResult } from 'shared/util/questions';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
})

export const makeRequest = async <T>(path: string, method = "GET",
 data?: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await api.request({
            url: path,
            method,
            data
        });
    return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getUsers(): Promise<UserData[]> {
    try { 
        const response = await makeRequest<UserData[]>('/users', "GET");
        return response;
    } catch (error) { 
        console.error("Erro ao buscar users: " + error);
        throw error;
    }
}

export async function saveUserData(finalStep: number) {
    let userData: CreateUser | null;
    if (finalStep === 13) {
        userData = getFormResult(true);
    } else {
        userData = getFormResult(false);
    }
    if (userData) {
        try { 
            await makeRequest<UserData[]>('/users', "POST", userData);
        } catch (errors) {
            console.error("Error to save user data: " + errors);
            throw errors;
        }
    } else { 
        throw Error('Dado do formulário inválido');
    }
}
    