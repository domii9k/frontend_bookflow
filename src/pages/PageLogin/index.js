import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../../api/Login';
import iconLogin from '../../assets/icon-input-login.png'
import iconSenha from '../../assets/icon-input-senha.png'
import './PageLogin.css'

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, senha });

            if (response.data && response.data.token) {
                const { token, usuario } = response.data;
                localStorage.setItem('token', token);
                AuthService.setAuthToken(token);
                AuthService.setUserData(usuario);
                console.log("teste: ", usuario);
                navigate('/Emprestimos');
            } else {
                setMessage('Credenciais Incorretas!');
            }
        } catch (error) {
            setMessage('Erro ao tentar fazer login. Verifique suas credenciais.');
        }
    };

    return (

        <main className="login">
            <section className="login-container">
                <h1 className="login-container_title">BookFlow - Login</h1>

                <div className="container-content">
                    <div className="login-container_content">

                        <div className="input">
                            <span className='icon-login'>
                                <img src={iconLogin} alt="Icone de Login"></img>
                            </span>
                            <div className="form__group field">
                                <input type="input" className="form__field" placeholder="Email" id='name'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name='email'
                                    required
                                />
                                <label htmlFor="name" className="form__label">E-mail</label>
                            </div>
                        </div>

                        <div className="input">
                            <span className='icon-login'>
                                <img src={iconSenha} alt="icone de senha"></img>
                            </span>
                            <div className="form__group field">
                                <input type="password" className="form__field" placeholder="Name" name="senha" id='senha'
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                                <label htmlFor="senha" className="form__label">Senha</label>
                            </div>
                        </div>

                        {message && <div className='invalid'>{message}</div>}

                        <p className="text-1">Esqueceu a senha?</p>

                        <Link onClick={handleLogin} className="button">Entrar</Link>

                        {/* <p className="text-2">Não possui conta?<br></br>Cadastre-se</p> */}
                    </div>
                </div>
            </section>
        </main>

    );
};

export default LoginComponent;