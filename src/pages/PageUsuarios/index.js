import useSWR from 'swr';
import { fetchUsuarios } from '../../api/Usuario/api'
import iconListaUsuario from "../../assets/icon-lista-usuario.png"
import HeaderPage from "../../componentes/PageContents/HeaderPage";
import Layout from "../../componentes/PageContents/Layout";
import TableUsuarios from "./TableUsuarios";

const fetcher = () => fetchUsuarios();

const PageUsuario = () => {

    // Usando SWR para buscar os usuarios
    const { data, error, isLoading } = useSWR('fetchUsuarios', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Livros:', error);
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

    return (
        <Layout>
            <section className="container">
                <HeaderPage
                    titulo={"Lista de Usuários"}
                    nomeBotao={"Usuário"}
                    icon={iconListaUsuario}
                />
                <TableUsuarios 
                    vetor={usuarios}
                />
            </section>
        </Layout>
    )
}

export default PageUsuario;