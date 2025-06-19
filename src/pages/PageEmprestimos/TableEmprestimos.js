import { useNavigate } from "react-router-dom";

const TableEmprestimos = ({ vetor }) => {

    const navigate = useNavigate(); // Envio para demais telas

    const handleClick = (emprestimo) => { // Quando clicado sera direcionado para a tela de cadastro com os campos preenchidos com o item em questao
        navigate(`/CadastrarEmprestimos/${emprestimo.codEmprestimo}`);
    };

    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>ALUNO</th>
                        <th>LIVRO</th>
                        <th>EMPRÉSTIMO</th>
                        <th>RESPONSÁVEL</th>
                        <th>PRAZO DE DEVOLUÇÃO</th>
                    </tr>
                </thead>

                <tbody>
                    {vetor.map(obj => (
                        <tr key={obj.id} onClick={() => handleClick(obj)}>
                            <td>{obj.codEmprestimo}</td>
                            <td>{obj.aluno.nomeCompleto}</td>
                            <td>{obj.codLivro.titulo}</td>
                            <td>{obj.dataEmprestimo}</td>
                            <td>{obj.respEmprestimo.nome}</td>
                            <td>{obj.dataPrevDevolucao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableEmprestimos;