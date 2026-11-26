import { useContext } from "react";
import { DadosContext } from "./dadosContext";

// Atalho para as telas lerem o "quadro de avisos"
export function useDados() {
    const contexto = useContext(DadosContext);
    // Se alguém usar fora do DadosProvider, avisa com uma mensagem clara
    if(!contexto) {
        throw new Error("UseDados precisa ser usado dentro do <DadosProvider>");
    }
    return contexto;
}
