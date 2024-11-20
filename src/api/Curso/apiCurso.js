import api from '../api';

// Função para buscar um curso por ID
export const fetchCursoById = async (id) => {
    try {
        const response = await api.get(`cursos/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar cursos com paginação
export const fetchCursos = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`cursos?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar cursos
export const cadastrarCursos = async (cursos) => {
    try {
        const response = await api.post(`cursos`, cursos);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar cursos
export const alterarCursos = async (id, cursos) => {
    try {
        const response = await api.put(`cursos/${id}`, cursos);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir cursos
export const excluirCursos = async (id) => {
    try {
        const response = await api.delete(`cursos/${id}`);
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
