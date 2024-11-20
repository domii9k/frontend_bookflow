import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../componentes/PageContents/Layout";
import { alterarAutores, cadastrarAutores } from "../../api/Autor/apiAutor";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";

const CadastroAutor = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const autor = {
        nome: ""
    }

    const [objAutor, setObjAutor] = useState(autor);

    const cadastrarOuAlterar = async () => {
        if (!objAutor.nome) {
            alert('Por favor, preencha o campo obrigatório!');
            return;
        }

        try {
            const response = id ? await alterarAutores(id, objAutor) : await cadastrarAutores(objAutor);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Autor Cadastrado com Sucesso!')
                navigate(`/Configuracoes`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Autor:', error);

            // Captura e exibe a mensagem de erro retornada pela API
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o autor.');
            }
        }
    };

    /*
        const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este autor?');
        if (confirmDelete) {
            try {
                await excluirAutores(id);
                alert('Autor excluído com sucesso!');
                navigate('/Configuracoes');
            } catch (error) {
                console.error('Erro ao excluir Autor:', error);
                alert('Ocorreu um erro ao tentar excluir o Autor.');
            }
        }
    };
    */

    const aoDigitar = (e) => {
        setObjAutor({ ...objAutor, [e.target.name]: e.target.value });
    };

    console.log(objAutor)

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Cadastro Autor</p>
                </div>

                <form className="formCadastro-config unico">
                    <label className="inputLabel-unico"> Nome do Autor:
                        <input
                            type="text"
                            placeholder="Nome do Autor"
                            value={objAutor.nome}
                            onChange={aoDigitar}
                            name='nome'
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

export default CadastroAutor;
