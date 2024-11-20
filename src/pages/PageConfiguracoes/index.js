import "./PageConfiguracoes.css"
import Layout from "../../componentes/PageContents/Layout";
import { Link } from "react-router-dom";
import iconCategoria  from "../../assets/icon-categoria.png"
import iconEditora  from "../../assets/icon-editora.png"
import iconCurso  from "../../assets/icon-curso.png"
import iconAutor  from "../../assets/icon-autor.png"

const PageConfiguracoes = () => {

    return (
        <Layout>
            <section className="configuracoes-container">
                <h1>Lista de Solicitações</h1>

                <section className="configuracoes-content">
                    <Link to="CadastrarCategoria">
                        <span>
                            <img src={iconCategoria}/>
                            <p>Categorias</p>
                        </span>
                    </Link>
                    <Link to="CadastrarCurso">
                        <span>
                            <img src={iconCurso}/>
                            <p>Cursos</p>
                        </span>
                    </Link>
                    <Link to="CadastrarEditora">
                        <span>
                            <img src={iconEditora}/>
                            <p>Editoras</p>
                        </span>
                    </Link>
                    <Link to="CadastrarAutor">
                        <span>
                            <img src={iconAutor}/>
                            <p>Autores</p>
                        </span>
                    </Link>
                </section>
            </section>
        </Layout>
    )
}

export default PageConfiguracoes;
