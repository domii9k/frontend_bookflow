import useSWR from 'swr';
import { fetchUsuarios } from '../../../api/Usuario/api'
import Clock from "react-live-clock";
import './header.css'
import iconRelogio from '../../../assets/icon-relogio.png'
import iconNotificacao from '../../../assets/icon-notificacoes.png'
import iconUser from '../../../assets/icon-perfil.png'

const fetcher = () => fetchUsuarios();

const Header = () => {

    // Usando SWR para buscar os usuario
    const { data, error, isLoading } = useSWR('fetchUsuarios', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Usuarios:', error);
        return <p>Nao encontrado!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: usuarios } = data;

    const usuarioLogado = usuarios && usuarios[0];

    return (
        <header>
            <ul>
                <li>
                    <span>
                        <img className="iconClock" src={iconRelogio} alt='Icone de um Relogio' />
                        <Clock format={'DD/MM/YYYY - HH:mm:ss'} ticking={true} timezone={'America/Sao_Paulo'} />
                    </span>
                </li>
                <li>
                    <span>
                        <img src={iconNotificacao} alt='Icone para as notificações' />
                        <img src={iconUser} alt='icone do usuario operando no momento' />
                        {usuarioLogado ? (
                            <p>{usuarioLogado.nome}</p>
                        ) : (
                        <p>Usuário não encontrado</p>
                        )}
                    </span>
                </li>
            </ul>
        </header>
    )
}

export default Header;
