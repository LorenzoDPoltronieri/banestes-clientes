import Papa from "papaparse";

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
