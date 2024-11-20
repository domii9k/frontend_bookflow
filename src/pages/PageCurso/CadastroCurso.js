import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../componentes/PageContents/Layout";
import { alterarCursos, cadastrarCursos } from "../../api/Curso/apiCurso";
import Buttons from "../../componentes/ComponentesCadastroEmprestimo/Buttons";

const CadastroCurso = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const curso = {
        descricao: ""
    }

    const [objCurso, setObjCurso] = useState(curso);

    const cadastrarOuAlterar = async () => {
        if (!objCurso.descricao) {
            alert('Por favor, preencha o campo obrigatório!');
            return;
        }

        try {
            const response = id ? await alterarCursos(id, objCurso) : await cadastrarCursos(objCurso);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Curso Cadastrado com Sucesso!')
                navigate(`/Configuracoes`);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Curso:', error);

            // Captura e exibe a mensagem de erro retornada pela API
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Ocorreu um erro ao tentar cadastrar/alterar o curso.');
            }
        }
    };

    /*const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este curso?');
        if (confirmDelete) {
            try {
                await excluirCursos(id);
                alert('Curso excluído com sucesso!');
                navigate('/Configuracoes');
            } catch (error) {
                console.error('Erro ao excluir Curso:', error);
                alert('Ocorreu um erro ao tentar excluir o Curso.');
            }
        }
    };
    
    */

    const aoDigitar = (e) => {
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value });
    };

    console.log(objCurso)

    return (
        <Layout>
            <section className="containerCadastro">
                <div className="tituloCadastro">
                    <p>Cadastro Curso</p>
                </div>

                <form className="formCadastro-config unico">

                    <label className="inputLabel-unico"> Nome do Curso:
                        <input
                            type="text"
                            placeholder="Nome do Curso"
                            value={objCurso.descricao}
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

export default CadastroCurso;
