import api from '../api';

// Função para buscar um emprestimo por ID
export const fetchEmprestimoById = async (id) => {
    try {
        const response = await api.get(`emprestimos/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar emprestimos com paginação
export const fetchEmprestimos = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`emprestimos?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar emprestimos
export const cadastrarEmprestimos = async (emprestimos) => {
    try {
        const response = await api.post(`emprestimos`, emprestimos);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar emprestimos
export const alterarEmprestimos = async (id, emprestimos) => {
    try {
        const response = await api.put(`emprestimos/${id}`, emprestimos);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir emprestimos
export const excluirEmprestimos = async (id) => {
    try {
        const response = await api.delete(`emprestimos/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Devolver Emprestimo
export const devolverEmprestimo = async (id, emprestimos) => {
    try {
        const response = await api.patch(`emprestimos/${id}/devolver`, emprestimos, {
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

// Desativar Emprestimo
export const desativarEmprestimo = async (id, emprestimos) => {
    try {
        const response = await api.patch(`emprestimos/${id}/cancelar`, emprestimos, {
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
