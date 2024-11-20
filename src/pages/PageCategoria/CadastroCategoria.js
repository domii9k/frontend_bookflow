import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../componentes/PageContents/Layout";
import { alterarCategorias, cadastrarCategorias } from "../../api/Categoria/apiCategoria";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";

const CadastroCategoria = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const categoria = {
        descricao: ""
    }

    const [objCategoria, setObjCategoria] = useState(categoria);

    const cadastrarOuAlterar = async () => {
        if (!objCategoria.descricao) {
            alert('Por favor, preencha o campo obrigatório!');
            return;
        }

        try {
            const response = id ? await alterarCategorias(id, objCategoria) : await cadastrarCategorias(objCategoria);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Categoria Cadastrada com Sucesso!')
                navigate(`/Configuracoes`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Categoria:', error);

            // Captura e exibe a mensagem de erro retornada pela API
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar a categoria.');
            }
        }
    };

    /*
        const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta categoria?');
        if (confirmDelete) {
            try {
                await excluirCategorias(id);
                alert('Categoria excluída com sucesso!');
                navigate('/Configuracoes');
            } catch (error) {
                console.error('Erro ao excluir Categoria:', error);
                alert('Ocorreu um erro ao tentar excluir o Categoria.');
            }
        }
    };
    */

    const aoDigitar = (e) => {
        setObjCategoria({ ...objCategoria, [e.target.name]: e.target.value });
    };

    console.log(objCategoria)

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Cadastro Categoria</p>
                </div>

                <form className="formCadastro-config unico">
                    <label className="inputLabel-unico"> Nome da Categoria:
                        <input
                            type="text"
                            placeholder="Nome da Categoria"
                            value={objCategoria.descricao}
                            onChange={aoDigitar}
                            name='descricao'
                        />
                    </label>
                </form>

                <Buttons
                    cadastrarOuAlterar={cadastrarOuAlterar}
                    devolver={cadastrarOuAlterar}
                    desativar={cadastrarOuAlterar}
                    showDevolvido={true}
                    id={id}
                />
            </section>

        </Layout>
    )
}

export default CadastroCategoria;
