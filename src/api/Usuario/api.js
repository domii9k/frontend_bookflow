import api from '../api';

// Função para buscar um usuario por ID
export const fetchUsuarioById = async (id) => {
    try {
        const response = await api.get(`usuarios/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar usuarios com paginação
export const fetchUsuarios = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`usuarios?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar usuarios
export const cadastrarUsuarios = async (usuarios) => {
    try {
        const response = await api.post(`usuarios`, usuarios);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar usuarios
export const alterarUsuarios = async (id, usuarios) => {
    try {
        const response = await api.put(`usuarios/${id}`, usuarios);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir usuarios
export const excluirUsuarios = async (id) => {
    try {
        const response = await api.delete(`usuarios/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Tratativa de erros
const handleApiError = (error) => {
    if (error.response) {
        console.error('Erro na resposta da API:', error.response);
    } else if (error.request) {
        console.error('Erro na requisição:', error.request);
    } else {
        console.error('Erro ao configurar a requisição:', error.message);
    }
};
