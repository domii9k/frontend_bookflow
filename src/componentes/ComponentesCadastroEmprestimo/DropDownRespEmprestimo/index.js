import useSWR from 'swr';
import { fetchUsuarios } from "../../../api/Usuario/api";
import { useEffect, useState } from 'react';
import '../DropDown.css';

const fetcher = () => fetchUsuarios();

const DropDownRespEmprestimo = ({ selecionado, valorObj, titulo }) => {
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Novo estado para armazenar o valor digitado

    useEffect(() => {
        if (valorObj) {
            setSearchTerm(valorObj.nome);
        } else {
            setSearchTerm(""); // Valor padrão caso `valorObj` esteja indefinido ou incompleto
        }
    }, [valorObj]);

    // Usando SWR para buscar os livros
    const { data, error, isLoading } = useSWR('fetchUsuarios', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Usuarios:', error);
        return <p>Erro ao carregar Usuarios!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: usuarios } = data;

    // Filtra os usuarios com base no nome digitado
    const filtered = (usuarios || []).filter((usuario) => {
        const nome = usuario?.nome || ""; // Garante string
        const sobrenome = usuario?.sobrenome || ""; // Garante string
        const permissao = usuario?.permissao || ""; // Garante string
        const term = searchTerm?.toLowerCase() || ""; // Garante string para searchTerm

        return (
            nome.toLowerCase().includes(term) ||
            sobrenome.toLowerCase().includes(term) ||
            permissao.toLowerCase().includes(term)
        );
    });

    // Selecionar usuario e notificar o componente pai
    const handleSelect = (usuario) => {
        setSearchTerm(usuario.nome); // Atualiza o valor do campo de pesquisa
        setDropdown(true); // Fecha o dropdown
        selecionado(usuario); // Envia o usuario selecionado ao componente pai
    };

    // Atualiza o termo de pesquisa enquanto digita
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Atualiza o termo de pesquisa
        setDropdown(true); // Abre o dropdown quando o usuário começa a digitar
    };

    return (
        <div className="dropdown-container">
            <label className="inputLabel"> {titulo}
                <input
                    name="usuario"
                    type="text"
                    placeholder="Responsavel pelo Emprestimo"
                    value={searchTerm} // Mostra o termo de pesquisa no input
                    onClick={() => setDropdown(!dropdown)} // Abre/fecha o dropdown
                    onChange={handleInputChange} // Atualiza o termo de pesquisa
                />
            </label>

            {dropdown && (
                <div className="dropdown">
                    <ul>
                        {filtered.length > 0 ? (
                            filtered.map((usuario) => (
                                <li
                                    key={usuario.codUsuario}
                                    onClick={() => handleSelect(usuario)} // Seleciona o aluno
                                    className="dropdown-item"
                                >
                                    {usuario.nome + " " + usuario.sobrenome}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">Nenhum usuario encontrado...</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownRespEmprestimo;
