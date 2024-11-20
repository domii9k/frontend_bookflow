import Header from "../Header";
import MenuBar from "../MenuBar";
import "./layout.css"

const Layout = ({ children }) => {
    return (
        <main>
            <MenuBar />
            <section>
                <Header />
                <div className="LayoutContent">
                    {children}
                </div>
            </section>
        </main>
    )
}

export default Layout;
