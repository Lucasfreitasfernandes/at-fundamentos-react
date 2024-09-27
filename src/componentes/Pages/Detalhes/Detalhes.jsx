import Menu from "../../MenuPrincipal/Menu";
import { useParams } from "react-router-dom";

import "./Styles.css";


export default function Detalhes ({nome, url_1, url_2, url_3, url_4, descricao, cidade, estado, diaria, servicos}) {

    const { id } = useParams();

    const hoteis = JSON.parse(localStorage.getItem('@hotel'));
    const hotel = hoteis.find(hotelzinho => hotelzinho.id === id);

    if (!hotel) {
        return <p>Hotel não encontrado</p>;
    }


    return (
        <div className="container-detalhes">
                <Menu/>
            <div className="container-sobre-hotel">
                <div className="container-imagens">
                    <img className="imagem-detalhes" src={hotel.url_1}/>
                    <img className="imagem-detalhes" src={hotel.url_2}/>
                    <img className="imagem-detalhes" src={hotel.url_3}/>
                    <img className="imagem-detalhes" src={hotel.url_4}/>
                </div>
 
                <div className="container-texto-detalhes">
                    <h1 className="nome-hotel-detalhes">{hotel.nome}</h1>
                    <p className="descricao-hotel">{hotel.descricao}</p>
                    <p className="bolder-detalhes">Cidade: {hotel.cidade}</p>
                    <p className="bolder-detalhes">Estado: {hotel.estado}</p>
                    <p className="bolder-detalhes">Preço da diária: R$ {hotel.diaria}</p>
                    <h2 className="h2-detalhes">Serviços oferecidos:</h2>
                    <p>{hotel.servicos}</p>

                </div>
                    
            </div>
        </div>
    )
}