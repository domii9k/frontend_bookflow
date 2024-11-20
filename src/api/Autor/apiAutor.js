import api from '../api';

// Função para buscar um autor por ID
export const fetchAutorById = async (id) => {
    try {
        const response = await api.get(`autores/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar autores com paginação
export const fetchAutores = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`autores?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar autores
export const cadastrarAutores = async (autores) => {
    try {
        const response = await api.post(`autores`, autores);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar autores
export const alterarAutores = async (id, autores) => {
    try {
        const response = await api.put(`autores/${id}`, autores);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir autores
export const excluirAutores = async (id) => {
    try {
        const response = await api.delete(`autores/${id}`);
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
