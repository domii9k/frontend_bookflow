import { useParams, useNavigate } from "react-router-dom";
import useSWR from 'swr';
import Layout from "../../componentes/PageContents/Layout";
import './CadastroEmprestimos.css';
import DropDownAluno from "../../componentes/ComponentesCadastroEmprestimo/DropDownAluno";
import { useEffect, useState } from "react";
import { fetchEmprestimoById, alterarEmprestimos, cadastrarEmprestimos, devolverEmprestimo, desativarEmprestimo } from '../../api/Emprestimo/api'
import DropDownLivro from "../../componentes/ComponentesCadastroEmprestimo/DropDownLivro";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";
import useUser from "../../hook/useUser";

const CadastroEmprestimos = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useUser();

    const emprestimo = {
        dataEmprestimo: "",
        dataPrevDevolucao: "",
        dataDevolucao: "",
        observacao: "",
        aluno: {
            codAluno: ""
        },
        codLivro: {
            codLivro: ""
        },
        respEmprestimo: user ? { codUsuario: user.codUsuario } : { codUsuario: "" },
        respDevolucao: user ? { codUsuario: user.codUsuario } : { codUsuario: "" },
    }

    const [objEmprestimo, setObjEmprestimo] = useState(emprestimo);
    const [ra, setRA] = useState(""); // Estado separado para exibição do RA
    const [patrimonio, setPatrimonio] = useState(""); // Estado separado para exibição do patrimônio'

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const emprestimoData = await fetchEmprestimoById(id);
        return emprestimoData;
    };

    // Configuração do SWR para buscar o emprestimo pelo ID
    const { data: emprestimoData, error, isLoading } = useSWR(id ? [`fetchEmprestimoById`, id] : null, () => fetcher(id));

    useEffect(() => {
        if (emprestimoData) {
            setObjEmprestimo(emprestimoData); // Preenche o estado principal
            setRA(emprestimoData.aluno?.ra || ""); // Atualiza o estado de RA
            setPatrimonio(emprestimoData.codLivro?.patrimonio || ""); // Atualiza o estado de patrimônio
        }
    }, [emprestimoData]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (id > 0) {
        // Carregando dados
        if (isLoading || !emprestimoData) {
            return (
                <p>Carregando...</p>
            );
        }
    }

    if (error) {
        console.error('Erro ao buscar o Emprestimo:', error);
        return <div>Ocorreu um erro ao carregar o Emprestimo.</div>;
    }

    // Callback para lidar com a seleção de um aluno
    const handleAlunoSelecionado = (aluno) => {
        setObjEmprestimo((prevState) => ({
            ...prevState,
            aluno: {
                codAluno: aluno.codAluno,
            },
        }));
        setRA(aluno.ra); // Atualiza o ra para exibição
    };

    // Callback para lidar com a seleção de um livro
    const handleLivroSelecionado = (livro) => {
        setObjEmprestimo((prevState) => ({
            ...prevState,
            codLivro: {
                codLivro: livro.codLivro,
            },
        }));
        setPatrimonio(livro.patrimonio); // Atualiza o patrimônio para exibição
    };

    const cadastrarOuAlterar = async () => {
        // Verifica se o usuário está logado
        if (!user) {
            alert('Usuário não autenticado!');
            return;
        }

        // Prepara os dados completos do empréstimo
        const dadosEmprestimo = {
            ...objEmprestimo,
            // Garante que o responsável seja o usuário logado
            respEmprestimo: {
                codUsuario: user.codUsuario
            }
        };

        if (!dadosEmprestimo.aluno.codAluno ||
            !dadosEmprestimo.codLivro.codLivro ||
            !dadosEmprestimo.dataPrevDevolucao) {
            alert('Por favor, preencha todos os campos obrigatórios: Aluno, Livro e Data Prevista para a Devolução!');
            return;
        }

        try {
            const response = id ?
                await alterarEmprestimos(id, dadosEmprestimo) :
                await cadastrarEmprestimos(dadosEmprestimo);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert(id ? 'Empréstimo alterado com sucesso!' : 'Empréstimo cadastrado com sucesso!');
                if (!id) {
                    setTimeout(() => {
                        navigate(`/CadastrarEmprestimos/${response.codEmprestimo}`);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Empréstimo:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o empréstimo.');
            }
        }
    };

    const devolver = async () => {
        try {
            if (!user) {
                alert('Usuário não autenticado!');
                return;
            }

            const emprestimoParaDevolver = {
                ...objEmprestimo,
                respDevolucao: {
                    codUsuario: user.codUsuario
                },
                dataDevolucao: objEmprestimo.dataDevolucao || new Date().toISOString().split('T')[0]
            };

            const response = await devolverEmprestimo(id, emprestimoParaDevolver);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Empréstimo Devolvido com Sucesso!');
                setTimeout(() => {
                    navigate(`/Emprestimos`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao devolver Empréstimo:', error);
            alert(error.response?.data?.message || 'Ocorreu um erro ao tentar devolver o empréstimo.');
        }
    };

    const desativar = async () => {
        try {
            const response = await desativarEmprestimo(id, objEmprestimo);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Emprestimo Desativado com Sucesso!')
                setTimeout(() => {
                    navigate(`/Emprestimos`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao desativar o Emprestimo:', error);
            alert('Ocorreu um erro ao tentar desativar o Empretimo.');
        }
    };

    /* Funcao excluir para o futuro

        const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este emprestimo?');
        if (confirmDelete) {
            try {
                await excluirEmprestimos(id);
                alert('Emprestimo excluído com sucesso!');
                navigate('/Emprestimos');
            } catch (error) {
                console.error('Erro ao excluir Emprestimo:', error);
                alert('Ocorreu um erro ao tentar excluir o Emprestimo.');
            }
        }
    };
    */

    const aoDigitar = (e) => {
        setObjEmprestimo({ ...objEmprestimo, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Realizar Emprestimo</p>
                </div>

                <form className="formCadastro">
                    <div>
                        <label className="inputLabel">
                            <DropDownAluno
                                selecionado={handleAlunoSelecionado}
                                valorObj={objEmprestimo.aluno}
                            />
                        </label>

                        <label className="inputLabel">
                            <DropDownLivro
                                selecionado={handleLivroSelecionado}
                                valorObj={objEmprestimo.codLivro}
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> RA:
                            <input
                                name='ra'
                                type="text"
                                placeholder="RA"
                                value={ra || ''}
                                readOnly
                            />
                        </label>

                        <label className="inputLabel"> Patrimônio:
                            <input
                                name='patrimonio'
                                type="text"
                                placeholder="Patrimônio do Livro"
                                value={patrimonio || ''}
                                readOnly
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> Resp:
                            <input
                                name="respEmprestimo"
                                type="text"
                                placeholder="Responsavel:"
                                value={user ? `${user.nome} ${user.sobrenome}` : ''}
                                readOnly
                            />
                            {/* Campo oculto para enviar o ID */}
                            <input
                                type="hidden"
                                name="respEmprestimo.codUsuario"
                                value={user.codUsuario}
                            />
                        </label>

                        <label className="inputLabel"> Data:
                            <input
                                type="date"
                                value={objEmprestimo.dataEmprestimo}
                                onChange={aoDigitar}
                                name='dataEmprestimo'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> Devolução:
                            <input
                                type="date"
                                value={objEmprestimo.dataPrevDevolucao}
                                onChange={aoDigitar}
                                name='dataPrevDevolucao'
                            />
                        </label>

                        {
                            id ? (
                                <label className="inputLabel"> Responsavel Devolução:
                                    <input
                                        name="respEmprestimo"
                                        type="text"
                                        placeholder="Responsavel:"
                                        value={user ? `${user.nome} ${user.sobrenome}` : ''}
                                        readOnly
                                    />
                                    {/* Campo oculto para enviar o ID */}
                                    <input
                                        type="hidden"
                                        name="respEmprestimo.codUsuario"
                                        value={user.codUsuario}
                                    />
                                </label>
                            ) : (
                                <></>
                            )
                        }
                    </div>

                    <div className="observacoes">
                        <label className="textareaLabel"> Observação:
                            <textarea
                                type="text"
                                rows="10"
                                placeholder="Observação sobre o empréstimos"
                                value={objEmprestimo.observacao}
                                onChange={aoDigitar}
                                name='observacao'
                            />
                        </label>
                    </div>
                </form>

                <div className="termosCadastro">
                    <p>* O aluno declara que leu e concorda com os seguintes termos e condições para o empréstimo de livros da biblioteca da escola:
                        Compromete-se a devolver o livro emprestado dentro do prazo estabelecido pela biblioteca.</p>
                    <ul>
                        <li>Compromete-se a devolver o livro emprestado dentro do prazo estabelecido pela biblioteca.</li>
                        <li>Está ciente de que a não devolução do livro dentro do prazo acarretará em multa conforme política da biblioteca.</li>
                        <li>Concorda em zelar pelo livro emprestado, mantendo-o em bom estado de conservação.</li>
                        <li>Compreende que deve comunicar à biblioteca imediatamente qualquer problema relacionado ao livro emprestado.</li>
                    </ul>
                    <p>Ao clicar na caixa de seleção abaixo, o aluno confirma que leu e aceita os termos acima mencionados:</p>

                    <span className="aceitarTermos">
                        <label>
                            <input
                                type="checkbox"
                            />
                            O aluno concorda com os termos de empréstimo de livros.<br></br>
                            <span>(Esta confirmação será enviada diretamente ao e-mail do aluno.)</span>
                        </label>
                    </span>
                </div>
            </section>

            <Buttons
                cadastrarOuAlterar={cadastrarOuAlterar}
                devolver={devolver}
                desativar={desativar}
                nameButtonCancelar={"Cancelar"}
                showDevolvido={true}
                id={id}
            />
        </Layout>


    )
}

export default CadastroEmprestimos;
