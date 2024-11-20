import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../componentes/PageContents/Layout";
import { alterarEditoras, cadastrarEditoras } from "../../api/Editora/apiEditora";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";

const CadastroEditora = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const editora = {
        nomeFantasia: "",
        endereco: "",
        site: ""
    }

    const [objEditora, setObjEditora] = useState(editora);

    const cadastrarOuAlterar = async () => {
        if (!objEditora.nomeFantasia) {
            alert('Por favor, preencha o campo obrigatório!');
            return;
        }

        try {
            const response = id ? await alterarEditoras(id, objEditora) : await cadastrarEditoras(objEditora);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Editora Cadastrada com Sucesso!')
                navigate(`/Configuracoes`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Editora:', error);

            // Captura e exibe a mensagem de erro retornada pela API
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o editora.');
            }
        }
    };

    /*
        const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta editora?');
        if (confirmDelete) {
            try {
                await excluirAutores(id);
                alert('Editora excluída com sucesso!');
                navigate('/Configuracoes');
            } catch (error) {
                console.error('Erro ao excluir Editora:', error);
                alert('Ocorreu um erro ao tentar excluir o Editora.');
            }
        }
    };
    */

    const aoDigitar = (e) => {
        setObjEditora({ ...objEditora, [e.target.name]: e.target.value });
    };

    console.log(objEditora)

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Cadastro Editora</p>
                </div>

                <form className="formCadastro-config">
                    <div>
                        <label className="inputLabel"> Nome da Editora:
                            <input
                                type="text"
                                placeholder="Nome da Editora"
                                value={objEditora.nomeFantasia}
                                onChange={aoDigitar}
                                name='nomeFantasia'
                            />
                        </label>

                        <label className="inputLabel"> Endereço:
                            <input
                                type="text"
                                placeholder="Endereço da Editora"
                                value={objEditora.endereco}
                                onChange={aoDigitar}
                                name='endereco'
                            />
                        </label>
                    </div>

                    <div>
                        <label className="inputLabel"> Site da Editora:
                            <input
                                type="text"
                                placeholder="Site da Editora"
                                value={objEditora.site}
                                onChange={aoDigitar}
                                name='site'
                            />
                        </label>
                    </div>
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

export default CadastroEditora;
