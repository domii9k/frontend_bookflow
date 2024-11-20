import api from '../api';

// Função para buscar um editora por ID
export const fetchEditoraById = async (id) => {
    try {
        const response = await api.get(`editoras/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar editoras com paginação
export const fetchEditoras = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`editoras?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar editoras
export const cadastrarEditoras = async (editoras) => {
    try {
        const response = await api.post(`editoras`, editoras);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar editoras
export const alterarEditoras = async (id, editoras) => {
    try {
        const response = await api.put(`editoras/${id}`, editoras);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir editoras
export const excluirEditoras = async (id) => {
    try {
        const response = await api.delete(`editoras/${id}`);
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
