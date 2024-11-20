import useSWR from 'swr';
import { fetchAutores } from "../../../api/Autor/apiAutor";
import { useEffect, useState } from 'react';
import '../DropDown.css';

const fetcher = () => fetchAutores();

const DropDownAutor = ({ selecionado, valorObj }) => {
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Novo estado para armazenar o valor digitado

    useEffect(() => {
        if (valorObj) {
            setSearchTerm(valorObj.nome);
        } else {
            setSearchTerm(""); // Valor padrão caso `valorObj` esteja indefinido ou incompleto
        }
    }, [valorObj]);

    // Usando SWR para buscar os autores
    const { data, error, isLoading } = useSWR('fetchAutores', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Autores:', error);
        return <p>Erro ao carregar autores!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: autores } = data;

    // Filtra os autores com base no nome digitado
    const filtered = (autores || []).filter((autor) => {
        const nome = autor?.nome || ""; // Garante string
        const term = searchTerm?.toLowerCase() || ""; // Garante string para searchTerm

        return (
            nome.toLowerCase().includes(term)
        );
    });

    // Selecionar autor e notificar o componente pai
    const handleSelect = (autor) => {
        setSearchTerm(autor.nome); // Atualiza o valor do campo de pesquisa
        setDropdown(true); // Fecha o dropdown
        selecionado(autor); // Envia o autor selecionado ao componente pai
    };

    // Atualiza o termo de pesquisa enquanto digita
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Atualiza o termo de pesquisa
        setDropdown(true); // Abre o dropdown quando o usuário começa a digitar
    };

    return (
        <div className="dropdown-container">
            <label className="inputLabel"> Autor:
                <input
                    name="autor"
                    type="text"
                    placeholder="Digite o nome do autor"
                    value={searchTerm} // Mostra o termo de pesquisa no input
                    onClick={() => setDropdown(!dropdown)} // Abre/fecha o dropdown
                    onChange={handleInputChange} // Atualiza o termo de pesquisa
                />
            </label>

            {dropdown && (
                <div className="dropdown">
                    <ul>
                        {filtered.length > 0 ? (
                            filtered.map((autor) => (
                                <li
                                    key={autor.codAutor}
                                    onClick={() => handleSelect(autor)} // Seleciona o autor
                                    className="dropdown-item"
                                >
                                    {autor.nome}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">Nenhum autor encontrado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownAutor;
