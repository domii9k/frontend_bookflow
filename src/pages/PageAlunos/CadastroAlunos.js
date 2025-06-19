import { useParams, useNavigate } from "react-router-dom";
import useSWR from 'swr';
import Layout from "../../componentes/PageContents/Layout";
import { useEffect, useState } from "react";
import DropDownCurso from "../../componentes/ComponentesCadastroEmprestimo/DropDownCurso";
import { fetchAlunoById ,alterarAlunos, cadastrarAlunos, desativarAluno } from "../../api/Aluno/api";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";

const CadastroAlunos = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const aluno = {
        nomeCompleto: "",
        ra: "",
        cpf: "",
        email: "",
        tel: "",
        tel2: "",
        cep: "",
        endereco: "",
        codCurso: {
            codCurso: ""
        }

    }

    const [objAluno, setObjAluno] = useState(aluno);

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const alunoData = await fetchAlunoById(id);
        return alunoData;
    };

    // Configuração do SWR para buscar o aluno pelo ID
    const { data: alunoData, error, isLoading } = useSWR(id ? [`fetchAlunoById`, id] : null, () => fetcher(id));

    useEffect(() => {
        if (alunoData) {
            setObjAluno(alunoData); // Preenche o estado principal
        }
    }, [alunoData]);

    if (id > 0) {
        // Carregando dados
        if (isLoading || !alunoData) {
            return (
                <p>Carregando...</p>
            );
        }
    }

    if (error) {
        console.error('Erro ao buscar o Aluno:', error);
        return <div>Ocorreu um erro ao carregar o Aluno.</div>;
    }


    // Callback para lidar com a seleção de um curso
    const handleCursoSelecionado = (curso) => {
        setObjAluno((prevState) => ({
            ...prevState,
            codCurso: {
                codCurso: curso.codCurso,
            },
        }));
    };

    const cadastrarOuAlterar = async () => {
        if (!objAluno.codCurso.codCurso || !objAluno.nomeCompleto || !objAluno.email || !objAluno.cep || !objAluno.ra || !objAluno.cpf || !objAluno.tel || !objAluno.endereco) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, email, cep, ra, cpf, tel, endereco e curso!');
            return;
        }

        try {
            const response = id ? await alterarAlunos(id, objAluno) : await cadastrarAlunos(objAluno);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Aluno Cadastrado com Sucesso!')
                setTimeout(() => {
                    if (!id) navigate(`/CadastrarAlunos/${response.codAluno}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Aluno:', error);

            // Captura e exibe a mensagem de erro retornada pela API
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o aluno.');
            }
        }
    };

    const desativar = async () => {
        try {
            const response = await desativarAluno(id, objAluno);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Aluno Desativado com Sucesso!')
                setTimeout(() => {
                    navigate(`/Alunos`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao desativar o Aluno:', error);
            alert('Ocorreu um erro ao tentar desativar o Aluno.');
        }
    };

    /*Funcao excluir para o futuro
        const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este aluno?');
        if (confirmDelete) {
            try {
                await excluirAlunos(id);
                alert('Aluno excluído com sucesso!');
                navigate('/Alunos');
            } catch (error) {
                console.error('Erro ao excluir Aluno:', error);
                alert('Ocorreu um erro ao tentar excluir o Aluno.');
            }
        }
    };
    */

    const aoDigitar = (e) => {
        setObjAluno({ ...objAluno, [e.target.name]: e.target.value });
    };

    console.log(objAluno)

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Cadastro Aluno</p>
                </div>

                <form className="formCadastro">

                    <div>
                        <label className="inputLabel"> Nome:
                            <input
                                type="text"
                                placeholder="Nome Completo do Aluno"
                                value={objAluno.nomeCompleto}
                                onChange={aoDigitar}
                                name='nomeCompleto'
                            />
                        </label>

                        <label className="inputLabel"> CPF:
                            <input
                                type="text"
                                placeholder="CPF do Aluno"
                                value={objAluno.cpf}
                                onChange={aoDigitar}
                                name='cpf'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> RA:
                            <input
                                type="text"
                                placeholder="RA do Aluno"
                                value={objAluno.ra}
                                onChange={aoDigitar}
                                name='ra'
                            />
                        </label>

                        <label className="inputLabel"> Email:
                            <input
                                type="text"
                                placeholder="Email do Aluno"
                                value={objAluno.email}
                                onChange={aoDigitar}
                                name='email'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> Telefone:
                            <input
                                type="text"
                                placeholder="Telefone do Aluno"
                                value={objAluno.tel}
                                onChange={aoDigitar}
                                name='tel'
                            />
                        </label>

                        <label className="inputLabel"> Telefone:
                            <input
                                type="text"
                                placeholder="Segundo Telefone do Aluno"
                                value={objAluno.tel2}
                                onChange={aoDigitar}
                                name='tel2'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> CEP:
                            <input
                                type="text"
                                placeholder="CEP do Aluno"
                                value={objAluno.cep}
                                onChange={aoDigitar}
                                name='cep'
                            />
                        </label>

                        <label className="inputLabel"> Endereço:
                            <input
                                type="text"
                                placeholder="Endereço do Aluno"
                                value={objAluno.endereco}
                                onChange={aoDigitar}
                                name='endereco'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel">
                            <DropDownCurso
                                selecionado={handleCursoSelecionado}
                                valorObj={objAluno.codCurso}
                            />
                        </label>
                    </div>

                </form>
            </section>

            <Buttons
                cadastrarOuAlterar={cadastrarOuAlterar}
                devolver={desativar}
                desativar={desativar}
                showDevolvido={false}
                isAluno={true}
                permission={true}
                id={id}
            />
        </Layout>
    )
}

export default CadastroAlunos;
