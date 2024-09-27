import { Link } from "react-router-dom";
import Card from "../../Card/Card";
import Formulario from "../../Formulario/Formulario";
import Menu from "../../MenuPrincipal/Menu";
import "./Styles.css";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { MdOutlineFavorite } from "react-icons/md";


export default function Home () {

    const [hoteis, setHoteis] = useState([]);
    const [hotelParaEditar, setHotelParaEditar] = useState(null);
    const [pesquisa, setPesquisa] = useState("");
    const [hotelRemovido, setHotelRemovido] = useState(null);
    const [hoteisFavoritos, setHoteisFavoritos] = useState([]);


    const favoritarHotel = (hotel) => {
        setHoteisFavoritos((prev)=> {
            let novosFavoritos;
           if (prev.some((h) => h.id === hotel.id)) {
            return prev.filter((h)=> h.id !== hotel.id);
           } else {
                novosFavoritos = [...prev, hotel];
           }
           
           localStorage.setItem('@hoteisFavoritos', JSON.stringify(novosFavoritos));
           return novosFavoritos;

        });
    }

    const carregarFavoritos = () => {
        const favoritosSalvos = localStorage.getItem('@hoteisFavoritos');
        if (favoritosSalvos) {
            setHoteisFavoritos(JSON.parse(favoritosSalvos));
        }
    }



    const atualizarHoteis = () => {
        const dadosFormularioHotel = localStorage.getItem('@hotel');
        if (dadosFormularioHotel) {
            setHoteis(JSON.parse(dadosFormularioHotel));
        }
    }
    

    const excluirHotel = (id) => {
        const hoteisAtualizados = hoteis.filter((hotel) =>hotel.id !== id);

        if (hoteisAtualizados.length < hoteis.length) {
            setHoteis(hoteisAtualizados);
            localStorage.setItem('@hotel', JSON.stringify(hoteisAtualizados));

            const favoritosAtualizados = hoteisFavoritos.filter((hotel) => hotel.id !== id);
            setHoteisFavoritos(favoritosAtualizados);
            localStorage.setItem('@hoteisFavoritos', JSON.stringify(favoritosAtualizados));

            setHotelRemovido(id);
        }
    }


    useEffect(() => {
        atualizarHoteis();
        carregarFavoritos();
    }, []);


    const pesquisaHotel = hoteis.filter(hotel =>
         hotel.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );


    const editarCard = (hotel) => {
        setHotelParaEditar(hotel);
    }


    return (
        <div>
            <Menu/>
            <div  className="container-barra-busca">
            <input className="barra-busca" type="text" placeholder="Buscar hoteis" 
            onChange={(evento) => setPesquisa(evento.target.value)}
            />
            

            </div>
            <div className="container-hotel">
                
                {pesquisaHotel.length > 0 ? (
                    pesquisaHotel.map((hotel) => (
                        <div className="click-card">
                        <Link className="link" to={`/Detalhes/${hotel.id}`} key={hotel.id}>
                        <Card nome={hotel.nome} cidade={hotel.cidade} estado={hotel.estado} preco={hotel.preco} url_1={hotel.url_1}
                        url_2={hotel.url_2} url_3={hotel.url_3} url_4={hotel.url_4} diaria={hotel.diaria} estrelas={hotel.estrelas}
                        />
                        </Link>
                        <div className="botoes">
                            <FaRegEdit className="editar" color="black" onClick={(evento) => {editarCard(hotel)} }/>
                            <BsTrash3Fill className="excluir" color="red" onClick={() => excluirHotel(hotel.id)}/>
                            <MdOutlineFavorite 
                            className="favoritar"
                             onClick={() => favoritarHotel(hotel)}
                             color={hoteisFavoritos.some((h) => h.id === hotel.id) ? "red" : "black"}
                             />
                        </div>
                    </div>
                    ))
                ) : (
                    <p>Nenhum hotel encontrado</p>
                )}
                 
            </div>
            <div className="container-favoritos">
                <div>
                    <h2>Hotéis Favoritos</h2>
                </div>
                <div  className="container-hotel-favorito">
                    {hoteisFavoritos.length > 0 ? (
                        hoteisFavoritos.map((hotel) => (
                            <Link className="link" to={`/Detalhes/${hotel.id}`} key={hotel.id}>
                            <Card key={hotel.id} {...hotel} />
                            </Link>
                        ))
                    ) : (
                        <p>Nenhum hotel favorito</p>
                    )}
                </div>
            </div>
            <Formulario atualizarHoteis={atualizarHoteis}
            hotelParaEditar={hotelParaEditar}
            hotelRemovido={hotelRemovido}
            />
        </div>
    )
}

