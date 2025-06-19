import { useState, useEffect } from 'react';
import AuthService from '../api/Login'

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = AuthService.getUserData();
        setUser(userData);
        setLoading(false);
    }, []);

    return { user, loading };
};

export default useUser;