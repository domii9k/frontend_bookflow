import useSWR from 'swr';
import { fetchCursos } from "../../../api/Curso/apiCurso";
import { useEffect, useState } from 'react';
import '../DropDown.css';

const fetcher = () => fetchCursos();

const DropDownCurso = ({ selecionado, valorObj }) => {
    const [dropdown, setDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Novo estado para armazenar o valor digitado

    useEffect(() => {
        if (valorObj) {
            setSearchTerm(valorObj.descricao);
        } else {
            setSearchTerm(""); // Valor padrão caso `valorObj` esteja indefinido ou incompleto
        }
    }, [valorObj]);

    // Usando SWR para buscar os cursos
    const { data, error, isLoading } = useSWR('fetchCursos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    // Se ocorrer algum erro na requisição
    if (error) {
        console.error('Erro ao carregar cursos:', error);
        return <p>Erro ao carregar cursos!</p>;
    }

    // Carregando dados
    if (isLoading || !data) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        );
    }

    const { lista: cursos } = data;

    // Filtra os cursos com base na descricao digitado
    const filtered = (cursos || []).filter((curso) => {
        const descricao = curso?.descricao || ""; // Garante string
        const term = searchTerm?.toLowerCase() || ""; // Garante string para searchTerm

        return (
            descricao.toLowerCase().includes(term)
        );
    });

    // Selecionar curso e notificar o componente pai
    const handleSelect = (curso) => {
        setSearchTerm(curso.descricao); // Atualiza o valor do campo de pesquisa
        setDropdown(true); // Fecha o dropdown
        selecionado(curso); // Envia o curso selecionado ao componente pai
    };

    // Atualiza o termo de pesquisa enquanto digita
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value); // Atualiza o termo de pesquisa
        setDropdown(true); // Abre o dropdown quando o usuário começa a digitar
    };

    return (
        <div className="dropdown-container">
            <label className="inputLabel"> Curso:
                <input
                    name="curso"
                    type="text"
                    placeholder="Digite o nome do curso"
                    value={searchTerm} // Mostra o termo de pesquisa no input
                    onClick={() => setDropdown(!dropdown)} // Abre/fecha o dropdown
                    onChange={handleInputChange} // Atualiza o termo de pesquisa
                />
            </label>

            {dropdown && (
                <div className="dropdown">
                    <ul>
                        {filtered.length > 0 ? (
                            filtered.map((curso) => (
                                <li
                                    key={curso.codCurso}
                                    onClick={() => handleSelect(curso)} // Seleciona o curso
                                    className="dropdown-item"
                                >
                                    {curso.descricao}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">Nenhum curso encontrado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDownCurso;
