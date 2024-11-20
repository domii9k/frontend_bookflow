import { useNavigate } from "react-router-dom";

const TableLivros = ({ vetor }) => {
    const navigate = useNavigate(); // Envio para demais telas

    const handleClick = (livro) => { // Quando clicado sera direcionado para a tela de cadastro com os campos preenchidos com o item em questao
        navigate(`/CadastrarLivros/${livro.codLivro}`);
    };

    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        <th>PATRIMÔNIO</th>
                        <th>TÍTULO</th>
                        <th>ISBN-13</th>
                        <th>AUTOR</th>
                        <th>CATEGORIA/CURSO</th>
                    </tr>
                </thead>

                <tbody>
                    {vetor.map(obj => (
                        <tr key={obj.id} onClick={() => handleClick(obj)}>
                            <td>{obj.patrimonio}</td>
                            <td>{obj.titulo}</td>
                            <td>{obj.isbn}</td>
                            <td>{obj.codAutor.nome}</td>
                            <td>{obj.codCurso.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableLivros;