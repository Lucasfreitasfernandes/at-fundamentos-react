import "./Styles.css";
import { Link } from "react-router-dom";


export default function Menu() {
    return (
        <div className="container-menu">
            <nav className="nav-menu">
                <h1 className="nome-hotel">HOTEISZITOS</h1>
                <ul>
                    <Link className="link-inicio" to={"/"}>
                    <li>INÍCIO</li>
                    </Link>
                    <li>USUÁRIOS</li>
                    <li>CONFIGURAÇÕES</li>
                </ul>
            </nav>
        </div>
    )
}