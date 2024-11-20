import { Link } from "react-router-dom";
import IconAdd from "../../../assets/icon-add.png"

const HeaderPage = ({ titulo, nomeBotao, cadastrar, icon }) => {
    return(
        <div className="container-header-page">
                <span className="page-icon-name">
                    <img src={icon} alt="Icone de usuario grande" />
                    <h1>{titulo}</h1>

                    <Link to={cadastrar} className="page-button-add">
                    <img src={IconAdd} alt="Adicionar Novo cadastro"/>
                    <p>Novo {nomeBotao}</p>
                    </Link>
                </span>

                <span className="page-inputs-search">
                    <input
                        placeholder="Pesquise aqui..."
                    />

                    <div className="selects">
                        <select name="select" value={''}>
                            <option value="valor1" selected disabled>Filtrar</option>
                        </select>

                        <select name="select">
                            <option value="valor1" selected disabled>Ordenar</option>
                        </select>
                    </div>
                </span>
            </div>
    )
}

export default HeaderPage;