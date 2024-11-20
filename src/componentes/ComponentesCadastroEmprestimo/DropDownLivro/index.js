import useSWR from 'swr';
import { fetchLivros } from "../../../api/Livro/api";
import { useEffect, useState } from 'react';
import '../DropDown.css';

const fetcher = () => fetchLivros();

const DropDownLivro = ({ selecionado, valorObj }) => {
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Novo estado para armazenar o valor digitado

    useEffect(() => {
        if (valorObj) {
            setSearchTerm(valorObj.titulo);
        } else {
            setSearchTerm(""); // Valor padrão caso `valorObj` esteja indefinido ou incompleto
        }
    }, [valorObj]);

    // Usando SWR para buscar os livros
    const { data, error, isLoading } = useSWR('fetchLivros', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Livros:', error);
        return <p>Erro ao carregar Livros!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: livros } = data;

    // Filtra os livros com base no nome digitado
    const filtered = (livros || []).filter((livro) => {
        const titulo = livro?.titulo || ""; // Garante string
        const patrimonio = livro?.patrimonio || ""; // Garante string
        const term = searchTerm?.toLowerCase() || ""; // Garante string para searchTerm
    
        return (
            titulo.toLowerCase().includes(term) ||
            patrimonio.toLowerCase().includes(term)
        );
    });
    

    // Selecionar livro e notificar o componente pai
    const handleSelect = (livro) => {
        setSearchTerm(livro.titulo); // Atualiza o valor do campo de pesquisa
        setDropdown(true); // Fecha o dropdown
        selecionado(livro); // Envia o livro selecionado ao componente pai
    };

    // Atualiza o termo de pesquisa enquanto digita
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Atualiza o termo de pesquisa
        setDropdown(true); // Abre o dropdown quando o usuário começa a digitar
    };

    return (
        <div className="dropdown-container">
            <label className="inputLabel"> Livro:
                <input
                    name="livro"
                    type="text"
                    placeholder="Nome do Livro"
                    value={searchTerm} // Mostra o termo de pesquisa no input
                    onClick={() => setDropdown(!dropdown)} // Abre/fecha o dropdown
                    onChange={handleInputChange} // Atualiza o termo de pesquisa
                />
            </label>

            {dropdown && (
                <div className="dropdown">
                    <ul>
                        {filtered.length > 0 ? (
                            filtered.map((livro) => (
                                <li
                                    key={livro.codLivro}
                                    onClick={() => handleSelect(livro)} // Seleciona o aluno
                                    className="dropdown-item"
                                >
                                    {livro.titulo}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">Nenhum livro encontrado...</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownLivro;
