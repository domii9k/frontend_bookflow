import { useParams, useNavigate } from "react-router-dom";
import useSWR from 'swr';
import Layout from "../../componentes/PageContents/Layout";
import { useState, useEffect } from "react";
import { fetchLivroById, alterarLivros, cadastrarLivros, desativarLivro } from "../../api/Livro/api";
import DropDownAutor from "../../componentes/ComponentesCadastroEmprestimo/DropDownAutor";
import DropDownEditora from "../../componentes/ComponentesCadastroEmprestimo/DropDownEditora";
import DropDownCurso from "../../componentes/ComponentesCadastroEmprestimo/DropDownCurso";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";

const CadastroLivro = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const livro = {
        titulo: "",
        isbn: "",
        patrimonio: "",
        ano: "",
        codCurso: {
            codCurso: ""
        },
        codAutor: {
            codAutor: ""
        },
        codEditora: {
            codEditora: ""
        }

    }

    const [objLivro, setObjLivro] = useState(livro);

    // Função fetcher para o SWR
    const fetcher = async (id) => {
        const livroData = await fetchLivroById(id);
        return livroData;
    };

    // Configuração do SWR para buscar livro pelo ID
    const { data: livroData, error, isLoading } = useSWR(id ? [`fetchLivroById`, id] : null, () => fetcher(id));

    useEffect(() => {
        if (livroData) {
            setObjLivro(livroData); // Preenche o estado principal
        }
    }, [livroData]);

    if (id > 0) {
        // Carregando dados
        if (isLoading || !livroData) {
            return (
                <p>Carregando...</p>
            );
        }
    }

    if (error) {
        console.error('Erro ao buscar o Livros:', error);
        return <div>Ocorreu um erro ao carregar o Livros.</div>;
    }

    // Callback para lidar com a seleção de um curso
    const handleCursoSelecionado = (curso) => {
        setObjLivro((prevState) => ({
            ...prevState,
            codCurso: {
                codCurso: curso.codCurso,
            },
        }));
    };

    // Callback para lidar com a seleção de um livro
    const handleEditoraSelecionado = (editora) => {
        setObjLivro((prevState) => ({
            ...prevState,
            codEditora: {
                codEditora: editora.codEditora,
            },
        }));
    };

    // Callback para lidar com a seleção de um responsavel pelo empretimo
    const handleAutorSelecionado = (autor) => {
        setObjLivro((prevState) => ({
            ...prevState,
            codAutor: {
                codAutor: autor.codAutor,
            },
        }));
    };

    const cadastrarOuAlterar = async () => {
        if (!objLivro.codCurso.codCurso || !objLivro.codAutor.codAutor || !objLivro.patrimonio || !objLivro.titulo) {
            alert('Por favor, preencha todos os campos obrigatórios: Curso, Autor, Patrimonio e Titulo!');
            return;
        }

        try {
            const response = id ? await alterarLivros(id, objLivro) : await cadastrarLivros(objLivro);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Livro Cadastrado com Sucesso!')
                setTimeout(() => {
                    if (!id) navigate(`/CadastrarLivros/${response.codLivro}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Livro:', error);

            // Captura e exibe a mensagem de erro retornada pela API
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o livro.');
            }
        }
    };

    const desativar = async () => {
        try {
            const response = await desativarLivro(id, objLivro);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Livro Desativado com Sucesso!')
                setTimeout(() => {
                    navigate(`/Livros`);
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao desativar o Livro:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o livro.');
            }
        }
    };

    /*Fucao excluir para o futuro
        const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este livro?');
        if (confirmDelete) {
            try {
                await excluirLivros(id);
                alert('Livro excluído com sucesso!');
                navigate('/Livros');
            } catch (error) {
                console.error('Erro ao excluir Livro:', error);
                alert('Ocorreu um erro ao tentar excluir o Livro.');
            }
        }
    };
    */

    const aoDigitar = (e) => {
        setObjLivro({ ...objLivro, [e.target.name]: e.target.value });
    };

    console.log(objLivro)

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Cadastro Livro</p>
                </div>

                <form className="formCadastro">

                    <div>
                        <label className="inputLabel"> Titulo:
                            <input
                                type="text"
                                placeholder="Titulo do Livro"
                                value={objLivro.titulo}
                                onChange={aoDigitar}
                                name='titulo'
                            />
                        </label>

                        <label className="inputLabel"> Patrimonio:
                            <input
                                type="text"
                                placeholder="Patrimonio do Livro"
                                value={objLivro.patrimonio}
                                onChange={aoDigitar}
                                name='patrimonio'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> ISBN:
                            <input
                                type="text"
                                placeholder="ISBN do Livro"
                                value={objLivro.isbn}
                                onChange={aoDigitar}
                                name='isbn'
                            />
                        </label>

                        <label className="inputLabel"> Ano:
                            <input
                                type="text"
                                placeholder="Ano do Livro"
                                value={objLivro.ano}
                                onChange={aoDigitar}
                                name='ano'
                            />
                        </label>
                    </div>


                    <div>
                        <label className="inputLabel">
                            <DropDownAutor
                                selecionado={handleAutorSelecionado}
                                valorObj={objLivro.codAutor}
                            />
                        </label>

                        <label className="inputLabel">
                            <DropDownEditora
                                selecionado={handleEditoraSelecionado}
                                valorObj={objLivro.codEditora}
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel">
                            <DropDownCurso
                                selecionado={handleCursoSelecionado}
                                valorObj={objLivro.codCurso}
                            />
                        </label>
                    </div>

                </form>
            </section>

            <Buttons
                cadastrarOuAlterar={cadastrarOuAlterar}
                devolver={desativar}
                desativar={desativar}
                nameButtonCancelar={"Desativa"}
                showDevolvido={false}
                id={id}
            />
        </Layout>
    )
}

export default CadastroLivro;
