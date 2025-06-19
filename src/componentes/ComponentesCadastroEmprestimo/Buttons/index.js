import { Link } from 'react-router-dom';
import IconSave from '../../../assets/icon-save.png'
import PermissionGate from '../../Permission';
import useUser from '../../../hook/useUser';

const Buttons = ({ cadastrarOuAlterar, devolver, desativar, id, permission, showDevolvido, isAluno, nameButtonCancelar}) => {

    const { user, loading } = useUser();

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container-buttons">
            {
                id ? (
                    <>
                        <Link onClick={cadastrarOuAlterar} className="buttons buttonEditar"><span>
                            <img src={IconSave} alt="Botao para edicao" />
                        </span>Editar</Link>

                        {showDevolvido ? (
                            <Link onClick={devolver} className="buttons buttonDevolvido"><span>
                                <img src={IconSave} alt="Botao para edicao" />
                            </span>Devolvido</Link>
                        ) : (
                            <></>
                        )}
                        {isAluno ?
                            (permission ? <PermissionGate permissions={[user.permissao]}>
                                <Link onClick={desativar} className="buttons buttonDesativar"><span>
                                    <img src={IconSave} alt="Botao para desativar" />
                                </span>Desativar</Link>
                            </PermissionGate> :
                                <></>
                            ) : <Link onClick={desativar} className="buttons buttonDesativar"><span>
                                <img src={IconSave} alt="Botao para desativar" />
                            </span>{nameButtonCancelar}</Link>}

                    </>
                ) : (
                    <Link onClick={cadastrarOuAlterar} className="buttons buttonCadastrar"><span>
                        <img src={IconSave} alt="Botao para cadastro" />
                    </span>Salvar</Link>
                )
            }
        </div>
    )
}

export default Buttons;