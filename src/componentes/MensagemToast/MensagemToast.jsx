import {toast, ToastContainer} from "react-toastify";

export default function MensagemToastComp ({mensagem}) {
    if (mensagem) {
        toast(mensagem, {
            style: { background: "blue", color: "white" },
            hideProgressBar: true,
            autoClose: 3000,
        });
    }

    return <ToastContainer />;
}