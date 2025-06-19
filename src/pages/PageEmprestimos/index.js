import useSWR from 'swr';
import { fetchEmprestimos } from "../../api/Emprestimo/api"
import iconListaEmprestimo from "../../assets/icon-lista-emprestimos.png"
import HeaderPage from "../../componentes/PageContents/HeaderPage";
import Layout from "../../componentes/PageContents/Layout";
import TableEmprestimos from "./TableEmprestimos";

const fetcher = () => fetchEmprestimos();

const PageEmprestimo = () => {

    // Usando SWR para buscar os emprestimos
    const { data, error, isLoading } = useSWR('fetchEmprestimos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar emprestimos:', error);
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

    const { lista: emprestimos } = data;

    return (
        <Layout>
            <section className="container">
                <HeaderPage
                    titulo={"Lista de Emprestimos"}
                    nomeBotao={"Emprestimo"}
                    cadastrar={"/CadastrarEmprestimos"}
                    icon={iconListaEmprestimo}
                />
                <TableEmprestimos
                    vetor={emprestimos} />
            </section>
        </Layout>
    )
}

export default PageEmprestimo;