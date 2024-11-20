import { useNavigate } from "react-router-dom";

const TableAlunos = ({ vetor }) => {

    const navigate = useNavigate(); // Envio para demais telas

    const handleClick = (aluno) => { // Quando clicado sera direcionado para a tela de cadastro com os campos preenchidos com o item em questao
        navigate(`/CadastrarAlunos/${aluno.codAluno}`);
    };

    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>ALUNO</th>
                        <th>E-MAIL</th>
                        <th>TELEFONE</th>
                        <th>TELEFONE ALT.</th>
                        <th>CURSO</th>
                    </tr>
                </thead>

                <tbody>
                    {vetor.map(obj => (
                        <tr key={obj.id} onClick={() => handleClick(obj)}>
                            <td>{obj.cpf}</td>
                            <td>{obj.nomeCompleto}</td>
                            <td>{obj.email}</td>
                            <td>{obj.tel}</td>
                            <td>{obj.tel2}</td>
                            <td>{obj.codCurso.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableAlunos;