import api from '../api';

// Função para buscar uma categoria por ID
export const fetchCategoriaById = async (id) => {
    try {
        const response = await api.get(`categorias/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar categorias com paginação
export const fetchCategorias = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`categorias?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar categorias
export const cadastrarCategorias = async (categorias) => {
    try {
        const response = await api.post(`categorias`, categorias);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar categorias
export const alterarCategorias = async (id, categorias) => {
    try {
        const response = await api.put(`categorias/${id}`, categorias);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir categorias
export const excluirCategorias = async (id) => {
    try {
        const response = await api.delete(`categorias/${id}`);
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
