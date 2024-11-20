import axios from 'axios';

const API_URL = process.env.REACT_APP_API_KEY;

class AuthService {
    login(credentials) {
        return axios.post(`${API_URL}auth/login`, credentials);
    }

    // Configura o token para todas as requisições
    setAuthToken(token) {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }
}

export default new AuthService();
