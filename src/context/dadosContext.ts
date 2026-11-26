import { createContext } from "react";
import type {Agencia, Cliente, Conta} from "../types";


// O que fica à mostra em um "quadro"
export interface DadosContextValor{
    clientes: Cliente[];
    contas: Conta[];
    agencias: Agencia[];
    carregando: boolean;
    erro: string | null;
    adicionarCliente: (novo: Cliente) => void;
}

export const DadosContext = createContext<DadosContextValor | null>(null);