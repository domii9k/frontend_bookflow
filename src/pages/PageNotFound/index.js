import Layout from "../../componentes/PageContents/Layout"
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <Layout>
            <section className="container">
                <div className="container-not-found">
                    <ul>
                        <li className="erro">Erro 404</li>
                        <li className="erro-text">Página não encontrada!</li>
                    </ul>
                </div>
            </section>
        </Layout>
    )
}

export default PageNotFound