import { Link } from 'react-router-dom';
import IconSave from '../../../assets/icon-save.png'

const Buttons = ({ cadastrarOuAlterar, devolver, desativar, id, showDevolvido }) => {
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

                        <Link onClick={desativar} className="buttons buttonDesativar"><span>
                            <img src={IconSave} alt="Botao para desativar" />
                        </span>Desativar</Link>
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