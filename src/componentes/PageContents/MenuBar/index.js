import { useState, useEffect } from "react";
import "./menubar.css";
import iconLogoPrincipal from "../../../assets/logoPrincipal.png";
import iconLogoSecundaria from "../../../assets/logoSecundario.png";
import iconUser from "../../../assets/icon-user.png";
import iconAlunos from "../../../assets/icon-aluno.png";
import iconLivros from "../../../assets/icon-book.png";
import iconEmprestimos from "../../../assets/icon-emprestimos.png";
import iconDevidos from "../../../assets/icon-devidos.png";
import iconRelatorios from "../../../assets/icon-relatorios.png";
import iconConfiguracao from "../../../assets/icon-config.png";
import iconArrowRight from "../../../assets/arrow-right.png";
import iconArrowLeft from "../../../assets/arrow-left.png";
import MenuLink from "./MenuLink"
import useUser from "../../../hook/useUser";
import PermissionGate from "../../../componentes/Permission"

const MenuBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [showText, setShowText] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    useEffect(() => {
        if (openMenu) {
            const timer = setTimeout(() => {
                setShowText(true);
            }, 200);

            return () => clearTimeout(timer);
        } else {
            setShowText(false);
        }
    }, [openMenu]);

    const { user, loading } = useUser();

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <nav className={openMenu ? "menu" : "menu-close"}>
            <ul className="menu-options">
                <li className="menu-options-logo logo">
                    <span>
                        <img className={openMenu ? "icon-logo-principal" : "icon-logo-secundario"} src={openMenu ? iconLogoPrincipal : iconLogoSecundaria} alt="Logo do Sistema de Gerenciamento de Bibliotecas BookFlow" />
                    </span>
                </li>
                <PermissionGate permissions={[user.permissao]}>
                    <MenuLink page="/Usuarios">
                        <span className={openMenu ? "" : "menu-options-pages-close"}>
                            <img className="icon" src={iconUser} alt="Ir para a página Usuários" />
                            <p>{showText ? "Usuários" : ""}</p>
                        </span>
                    </MenuLink>
                </PermissionGate>
                <MenuLink page="/Alunos">
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={iconAlunos} alt="Ir para a página Alunos" />
                        <p>{showText ? "Alunos" : ""}</p>
                    </span>
                </MenuLink>
                <MenuLink page="/Livros">
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={iconLivros} alt="Ir para a página Livros" />
                        <p>{showText ? "Livros" : ""}</p>
                    </span>
                </MenuLink>
                <MenuLink page="/Emprestimos">
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={iconEmprestimos} alt="Ir para a página Empréstimos" />
                        <p>{showText ? "Empréstimos" : ""}</p>
                    </span>
                </MenuLink>
                <li className="menu-options-pages">
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={iconDevidos} alt="Ir para a página Devidos" />
                        <p>{showText ? "Devidos" : ""}</p>
                    </span>
                </li>
                <li className="menu-options-pages">
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={iconRelatorios} alt="Ir para a página Relatórios" />
                        <p>{showText ? "Relatórios" : ""}</p>
                    </span>
                </li>
                <MenuLink page="/Configuracoes">
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={iconConfiguracao} alt="Ir para a página Configurações" />
                        <p>{showText ? "Configurações" : ""}</p>
                    </span>
                </MenuLink>
                <li className="menu-options-pages" onClick={toggleMenu}>
                    <span className={openMenu ? "" : "menu-options-pages-close"}>
                        <img className="icon" src={openMenu ? iconArrowLeft : iconArrowRight} alt="Diminuir menu lateral" />
                        <p>{showText ? "Fechar" : ""}</p>
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default MenuBar;
