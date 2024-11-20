import api from '../api';

// Função para buscar um livro por ID
export const fetchLivroById = async (id) => {
    try {
        const response = await api.get(`livros/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar livros com paginação
export const fetchLivros = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`livros?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar livros
export const cadastrarLivros = async (livros) => {
    try {
        const response = await api.post(`livros`, livros);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar livros
export const alterarLivros = async (id, livros) => {
    try {
        const response = await api.put(`livros/${id}`, livros);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir livros
export const excluirLivros = async (id) => {
    try {
        const response = await api.delete(`livros/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Desativar Livro
export const desativarLivro = async (id, livros) => {
    try {
        const response = await api.patch(`livros/${id}/desativar`, livros, {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        });
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
