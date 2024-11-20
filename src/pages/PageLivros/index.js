import useSWR from 'swr';
import { fetchLivros } from '../../api/Livro/api'
import iconListaLivro from "../../assets/icon-lista-livro.png"
import HeaderPage from "../../componentes/PageContents/HeaderPage";
import Layout from "../../componentes/PageContents/Layout";
import TableLivros from "./TableLivros";

const fetcher = () => fetchLivros();

const PageLivro = () => {

    // Usando SWR para buscar os livros
    const { data, error, isLoading } = useSWR('fetchLivros', fetcher, {
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

    const { lista: livros } = data;

    return (
        <Layout>
            <section className="container">
                <HeaderPage
                    titulo={"Lista de Livros"}
                    nomeBotao={"Livro"}
                    cadastrar={"/CadastrarLivros"}
                    icon={iconListaLivro}
                />
                <TableLivros 
                    vetor={livros}
                />
            </section>
        </Layout>
    )
}

export default PageLivro;