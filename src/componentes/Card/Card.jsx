import { FaStar } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";
import "./Styles.css";

export default function Card ({nome, cidade, estado, diaria, estrelas, url_1}) {
    return (
        <div className="container-card">
            <img className="imagem-card" src={url_1}/>
            <h5 className="h5-card">{nome}</h5>
            <div className="votos">
                <div className="container-estrelas">
                    {[...Array(Number(estrelas) || 0)].map((_,indice) => (
                    <FaStar key={indice} className="estrelas-card" color="yellow" />
                    ))}
                </div>
            <div>
            </div>   
            </div>
            <div className="container-informacao">
                    <p className="paragrafo-info">Cidade: {cidade}</p>
                    <p className="paragrafo-info">Estado: {estado}</p>
                    <p className="paragrafo-info">Diaria: R${diaria}</p>
            </div>

        </div>
    )
}