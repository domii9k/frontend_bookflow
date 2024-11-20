import useSWR from 'swr';
import { fetchAlunos } from "../../api/Aluno/api"
import iconListaAluno from "../../assets/icon-lista-aluno.png"
import HeaderPage from "../../componentes/PageContents/HeaderPage";
import Layout from "../../componentes/PageContents/Layout";
import TableAlunos from "./TableAlunos";

const fetcher = () => fetchAlunos();

const PageAluno = () => {

    // Usando SWR para buscar os alunos
    const { data, error, isLoading } = useSWR('fetchAlunos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Alunos:', error);
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

    const { lista: alunos } = data;

    return (
        <Layout>
            <section className="container">
                <HeaderPage
                    titulo={"Lista de Alunos"}
                    nomeBotao={"Aluno"}
                    cadastrar={"/CadastrarAlunos"}
                    icon={iconListaAluno}
                />
                <TableAlunos 
                     vetor={alunos}
                />
            </section>
        </Layout>
    )
}

export default PageAluno;