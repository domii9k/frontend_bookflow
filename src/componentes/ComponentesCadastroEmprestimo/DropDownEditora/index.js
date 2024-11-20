import useSWR from 'swr';
import { fetchEditoras } from "../../../api/Editora/apiEditora";
import { useEffect, useState } from 'react';
import '../DropDown.css';

const fetcher = () => fetchEditoras();

const DropDownEditora = ({ selecionado, valorObj }) => {
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Novo estado para armazenar o valor digitado

    useEffect(() => {
        if (valorObj) {
            setSearchTerm(valorObj.nomeFantasia);
        } else {
            setSearchTerm(""); // Valor padrão caso `valorObj` esteja indefinido ou incompleto
        }
    }, [valorObj]);

    // Usando SWR para buscar os Editoras
    const { data, error, isLoading } = useSWR('fetchEditoras', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Editoras:', error);
        return <p>Erro ao carregar Editoras!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: editoras } = data;

    // Filtra os editoras com base no nome digitado
    const filtered = (editoras || []).filter((editora) => {
        const nomeFantasia = editora?.nomeFantasia || ""; // Garante string
        const term = searchTerm?.toLowerCase() || ""; // Garante string para searchTerm

        return (
            nomeFantasia.toLowerCase().includes(term)
        );
    });

    // Selecionar editora e notificar o componente pai
    const handleSelect = (editora) => {
        setSearchTerm(editora.nomeFantasia); // Atualiza o valor do campo de pesquisa
        setDropdown(true); // Fecha o dropdown
        selecionado(editora); // Envia o editora selecionado ao componente pai
    };

    // Atualiza o termo de pesquisa enquanto digita
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Atualiza o termo de pesquisa
        setDropdown(true); // Abre o dropdown quando o usuário começa a digitar
    };

    return (
        <div className="dropdown-container">
            <label className="inputLabel"> Editora:
                <input
                    name="editora"
                    type="text"
                    placeholder="Digite o nome da editora"
                    value={searchTerm} // Mostra o termo de pesquisa no input
                    onClick={() => setDropdown(!dropdown)} // Abre/fecha o dropdown
                    onChange={handleInputChange} // Atualiza o termo de pesquisa
                />
            </label>

            {dropdown && (
                <div className="dropdown">
                    <ul>
                        {filtered.length > 0 ? (
                            filtered.map((editora) => (
                                <li
                                    key={editora.codEditora}
                                    onClick={() => handleSelect(editora)} // Seleciona a editora
                                    className="dropdown-item"
                                >
                                    {editora.nomeFantasia}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">Nenhuma editora encontrada</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownEditora;
