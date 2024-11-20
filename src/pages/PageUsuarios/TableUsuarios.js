const TableUsuarios = ({vetor}) => {
    return (
        <div className="container-table">
            <table>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>USUÁRIO</th>
                        <th>SOBRENOME</th>
                        <th>E-MAIL</th>
                        <th>NÍVEL DE ACESSO</th>
                    </tr>
                </thead>

                <tbody>
                    {vetor.map(obj => (
                        <tr key={obj.id}>
                            <td>{obj.cpf}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.sobrenome}</td>
                            <td>{obj.email}</td>
                            <td>{obj.permissao}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default TableUsuarios;