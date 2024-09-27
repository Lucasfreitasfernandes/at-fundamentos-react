import { useEffect, useState } from "react";
import "./Styles.css";
import { ToastContainer, toast } from "react-toastify";
import { nanoid } from 'nanoid';

export default function Formulario({ atualizarHoteis, hotelParaEditar, hotelRemovido }) {
    const [formState, setFormState] = useState({
        nome: "",
        url_1: "",
        url_2: "",
        url_3: "",
        url_4: "",
        estrelas: "",
        cidade: "",
        estado: "",
        diaria: "",
        descricao: "",
        servicos: ""
    });

    const [editando, setEditando] = useState(false);
    const [idHotel, setIdHotel] = useState(null);
    const [modoEscuro, setModoEscuro] = useState(() => {
        return localStorage.getItem('modoEscuro') === 'true';
    });

    

    useEffect(() => {
        if (hotelParaEditar) {
            setFormState(hotelParaEditar);
            setEditando(true);
            setIdHotel(hotelParaEditar.id);
        }
    }, [hotelParaEditar]);

    useEffect (() => {
        if (hotelRemovido) {
        toast("Hotel removido com sucesso!", {
            style: { background: "green", color: "white" },
            hideProgressBar: true
            });
        }
    }, [hotelRemovido]);


    function salvarHotel() {
        if (formState.nome && formState.url_1 &&
            formState.url_2 && formState.url_3 &&
            formState.url_4 && formState.estrelas &&
            formState.cidade && formState.estado &&
            formState.diaria > 0 && formState.descricao &&
            formState.servicos) {

            const hotelExistente = {
                ...formState,
                id: editando ? idHotel : nanoid(),
            };

            let hoteisSalvos = JSON.parse(localStorage.getItem("@hotel")) || [];

            if (editando) {
                const hoteisAtualizados = hoteisSalvos.map(hotel =>
                    hotel.id === idHotel ? hotelExistente : hotel
                );
                localStorage.setItem("@hotel", JSON.stringify(hoteisAtualizados));
                toast("Hotel editado com sucesso!", {
                    style: { background: "blue", color: "white" },
                    hideProgressBar: true
                });
            } else {
                hoteisSalvos.push(hotelExistente);
                localStorage.setItem("@hotel", JSON.stringify(hoteisSalvos));
                toast("Hotel salvo com sucesso!", {
                    style: { background: "green", color: "white" },
                    hideProgressBar: true
                });
            }

            atualizarHoteis();

            setFormState({
                nome: "",
                url_1: "",
                url_2: "",
                url_3: "",
                url_4: "",
                estrelas: "",
                cidade: "",
                estado: "",
                diaria: "",
                descricao: "",
                servicos: ""
            });
            setEditando(false);
            setIdHotel(null);
        } else {
            if (formState.diaria < 0) {
                toast("O valor da diária deve ser maior que zero.", {
                    style: { background: "orange", color: "white" },
                    hideProgressBar: true
                });
            } else {
                toast("Preencha todos os campos", {
                    style: { background: "red", color: "white" },
                    hideProgressBar: true
                });
            }
        }
        
       

    }

    return (
        <div className={`container-formulario ${modoEscuro ? 'modo-escuro' : ""}`}>
            <form>
                <h1>{editando ? "Editando Hotel" : "Adicionar Hotéis"}</h1>
                <input
                    placeholder="Nome do hotel"
                    value={formState.nome}
                    onChange={(evento) => setFormState({ ...formState, nome: evento.target.value })}
                />
                <div className="container-img1">
                    <input
                        placeholder="URL 1"
                        value={formState.url_1}
                        onChange={(evento) => setFormState({ ...formState, url_1: evento.target.value })}
                    />
                    <input
                        placeholder="URL 2"
                        value={formState.url_2}
                        onChange={(evento) => setFormState({ ...formState, url_2: evento.target.value })}
                    />
                </div>
                <div className="container-img2">
                    <input
                        placeholder="URL 3"
                        value={formState.url_3}
                        onChange={(evento) => setFormState({ ...formState, url_3: evento.target.value })}
                    />
                    <input
                        placeholder="URL 4"
                        value={formState.url_4}
                        onChange={(evento) => setFormState({ ...formState, url_4: evento.target.value })}
                    />
                </div>
                <input
                    placeholder="Classificação de estrelas 1-5"
                    value={formState.estrelas}
                    onChange={(evento) => setFormState({ ...formState, estrelas: evento.target.value })}
                />
                <div className="container-info-local">
                    <input
                        placeholder="Cidade"
                        value={formState.cidade}
                        onChange={(evento) => setFormState({ ...formState, cidade: evento.target.value })}
                    />
                    <input
                        placeholder="Estado"
                        value={formState.estado}
                        onChange={(evento) => setFormState({ ...formState, estado: evento.target.value })}
                    />
                </div>
                <div>
                    <input
                        className="input-info"
                        placeholder="Preço da diária"
                        value={formState.diaria}
                        onChange={(evento) => setFormState({ ...formState, diaria: evento.target.value })}
                    />
                    <input
                        className="input-info"
                        placeholder="Descrição detalhada"
                        value={formState.descricao}
                        onChange={(evento) => setFormState({ ...formState, descricao: evento.target.value })}
                    />
                    <input
                        className="input-info"
                        placeholder="Serviços oferecidos"
                        value={formState.servicos}
                        onChange={(evento) => setFormState({ ...formState, servicos: evento.target.value })}
                    />
                    <button type="button" onClick={salvarHotel}>Salvar</button>
                </div>
                <ToastContainer />
            </form>
        </div>
    );
}

