import Clock from "react-live-clock";
import './header.css'
import iconRelogio from '../../../assets/icon-relogio.png'
import iconNotificacao from '../../../assets/icon-notificacoes.png'
import iconUser from '../../../assets/icon-perfil.png'
import useUser from "../../../hook/useUser";

const Header = () => {
    const user = useUser();

    if (user.loading) {
        return <div>Carregando...</div>;
    }

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
                        {user ? (
                            <p>{user.user.nome}</p>
                        ) : (
                            <p>Usuário não logado</p>
                        )}
                    </span>
                </li>
            </ul>
        </header>
    )
}

export default Header;
