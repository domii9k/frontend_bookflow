import api from '../api';

// Função para buscar um aluno por ID
export const fetchAlunoById = async (id) => {
    try {
        const response = await api.get(`alunos/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para listar alunos com paginação
export const fetchAlunos = async (page = 0, size = 10) => {
    try {
        const response = await api.get(`alunos?pag=${page}&size=${size}`);
        const { lista, totalRegistros, totalPaginas } = response.data || {};
        return { lista: lista || [], totalRegistros: totalRegistros || 0, totalPaginas: totalPaginas || 0 };
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para cadastrar alunos
export const cadastrarAlunos = async (alunos) => {
    try {
        const response = await api.post(`alunos`, alunos);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para alterar alunos
export const alterarAlunos = async (id, alunos) => {
    try {
        const response = await api.put(`alunos/${id}`, alunos);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Função para excluir alunos
export const excluirAlunos = async (id) => {
    try {
        const response = await api.delete(`alunos/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Desativar Aluno
export const desativarAluno = async (id, alunos) => {
    try {
        const response = await api.patch(`alunos/${id}/desativar`, alunos, {
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
