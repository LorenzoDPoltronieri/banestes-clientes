import Papa from "papaparse";
import type { Agencia, Cliente, Conta } from "../types";
import { normalizarCliente, normalizarConta, normalizarAgencia } from "../utils/normalizar";



const BASE_URL = "https://docs.google.com/spreadsheets/d/1LkyaeCgiyaIN1IxXnbZQPmVMIcht3PIxMDUXHsvczK0/gviz/tq?tqx=out:csv&sheet="

export const URL_CLIENTES = BASE_URL + "clientes";
export const URL_CONTAS = BASE_URL + "contas";
export const URL_AGENCIAS = BASE_URL + "agencias";

export async function buscarCsv(url: string): Promise<Record<string, string>[]> {
    
    const resposta =  await fetch(url);

    //Valida se o servidor não respondeu com o "erro 404".
    if (!resposta.ok) {
        throw new Error(`Erro ao buscar dados (status ${resposta.status})`);
    }

    //Lê o corpo da resposta como texto
    const texto = await resposta.text();

    //Organiza o texto 
    const resultado = Papa.parse<Record<string, string>>(texto, {
        header: true,
        skipEmptyLines: true,
    });
    
    return resultado.data;

}

// Formato dos dados já limpos que o sistema inteiro vai usar

export interface bancoDados {
    clientes: Cliente[]
    contas: Conta[]
    agencias: Agencia[]
}


// Remove os itens null de uma lista. O "item is T" avisa o TypeScript
// que, depois do filtro, a lista só tem itens válidos.
function semNulos<T>(lista: (T | null)[]): T[] {
  return lista.filter((item): item is T => item !== null);
}

// Busca as 3 abas AO MESMO TEMPO e devolve tudo normalizado.
export async function carregarDados(): Promise<bancoDados> {
  const [linhasClientes, linhasContas, linhasAgencias] = await Promise.all([
    buscarCsv(URL_CLIENTES),
    buscarCsv(URL_CONTAS),
    buscarCsv(URL_AGENCIAS),
  ]);

    return {
    clientes: semNulos(linhasClientes.map(normalizarCliente)),
    contas: semNulos(linhasContas.map(normalizarConta)),
    agencias: semNulos(linhasAgencias.map(normalizarAgencia)),
  };
}