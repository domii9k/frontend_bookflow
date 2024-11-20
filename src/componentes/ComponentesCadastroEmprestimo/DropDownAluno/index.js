import useSWR from 'swr';
import { fetchAlunos } from "../../../api/Aluno/api";
import { useEffect, useState } from 'react';
import '../DropDown.css';

const fetcher = () => fetchAlunos();

const DropDownAluno = ({ selecionado, valorObj }) => {
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Novo estado para armazenar o valor digitado

    useEffect(() => {
        if (valorObj) {
            setSearchTerm(valorObj.nomeCompleto);
        } else {
            setSearchTerm(""); // Valor padrão caso `valorObj` esteja indefinido ou incompleto
        }
    }, [valorObj]);

    // Usando SWR para buscar os alunos
    const { data, error, isLoading } = useSWR('fetchAlunos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar Alunos:', error);
        return <p>Erro ao carregar alunos!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: alunos } = data;

    console.log("Dados carregados:", alunos);
    console.log("Termo de busca:", searchTerm);

    // Filtra os alunos com base no nome digitado
    const filtered = (alunos || []).filter((aluno) => {
        const nomeCompleto = aluno?.nomeCompleto || ""; // Garante string
        const ra = aluno?.ra || ""; // Garante string
        const term = searchTerm?.toLowerCase() || ""; // Garante string para searchTerm
    
        return (
            nomeCompleto.toLowerCase().includes(term) ||
            ra.toLowerCase().includes(term)
        );
    });

    // Selecionar aluno e notificar o componente pai
    const handleSelect = (aluno) => {
        setSearchTerm(aluno.nomeCompleto); // Atualiza o valor do campo de pesquisa
        setDropdown(true); // Fecha o dropdown
        selecionado(aluno); // Envia o aluno selecionado ao componente pai
    };

    // Atualiza o termo de pesquisa enquanto digita
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Atualiza o termo de pesquisa
        setDropdown(true); // Abre o dropdown quando o usuário começa a digitar
    };

    return (
        <div className="dropdown-container">
            <label className="inputLabel"> Aluno:
                <input
                    name="aluno"
                    type="text"
                    placeholder="Digite o nome do aluno"
                    value={searchTerm} // Mostra o termo de pesquisa no input
                    onClick={() => setDropdown(!dropdown)} // Abre/fecha o dropdown
                    onChange={handleInputChange} // Atualiza o termo de pesquisa
                />
            </label>

            {dropdown && (
                <div className="dropdown">
                    <ul>
                        {filtered.length > 0 ? (
                            filtered.map((aluno) => (
                                <li
                                    key={aluno.codAluno}
                                    onClick={() => handleSelect(aluno)} // Seleciona o aluno
                                    className="dropdown-item"
                                >
                                    {aluno.nomeCompleto}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">Nenhum aluno encontrado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownAluno;
