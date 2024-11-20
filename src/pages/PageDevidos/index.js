import iconListaDevidos from "../../assets/icon-lista-devidos.png"
import HeaderPage from "../../componentes/PageContents/HeaderPage";
import Layout from "../../componentes/PageContents/Layout";
import TableDevidos from "./TableDevidos";

const PageDevido = () => {
    return (
        <Layout>
            <section className="container">
                <HeaderPage
                    titulo={"Lista de Devidos"}
                    nomeBotao={"Devidos"}
                    icon={iconListaDevidos}
                />
                <TableDevidos />
            </section>
        </Layout>
    )
}

export default PageDevido;