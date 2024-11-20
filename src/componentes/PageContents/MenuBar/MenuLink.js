import { Link, useLocation } from "react-router-dom"

const MenuLink = ({ children, page }) => {

    // Destaca icone no menu quando selecionada a pagina do mesmo
    const localizacao = useLocation();

    return (
        <Link to={page}>
            <li className={`menu-options-pages ${localizacao.pathname === page ? 'option-select' : ''}`}>{children}</li>
        </Link>
    )
}

export default MenuLink;