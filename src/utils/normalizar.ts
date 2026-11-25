
import type { Cliente, Conta } from "../types";

//Limpa e deixa somente numeros
export function apenasDigitos(valor: string): string {
    return valor.replace(/\D/g, "");
}

// Normaliza CPF/CNPJ: deixa só os dígitos e devolve os zeros à esquerda
// que o Google Sheets remove (ele trata o CPF como número).
// Retorna null se o valor for inválido.
export function normalizaCpfCnpj(valor: string): string | null {
    const digitos = apenasDigitos(valor);

    // Vazio ou só zeros (ex.: a conta CNT-108 tem CPF "0"): inválido
    if (digitos === "" || /^0+$/.test(digitos)) return null;

    // Se o numero de digitos for menor que 11, ele completa com os 0 a esquerda.
    if (digitos.length <= 11) return digitos.padStart(11, "0");

    // Se o numero de digitos for menor que 14, ele completa com os 0 a esquerda.
    if (digitos.length <= 14) return digitos.padStart(14, "0");

    // Mais de 14 dígitos não é nem CPF nem CNPJ
    return null;
}


    //convertendo os textos para numero
    // O number("") da 0, e não um erro.
    // O .trim() tira todos os espaços do final e do começo 
export function textoParaNumero(valor: string): number | null {
    if (valor.trim() === "") return null;
    const numero = Number(valor);
    return Number.isNaN(numero) ? null : numero;    //operador ternario / condição ? a : b  
}

    //Campos opicionais como RG e Nome social 
export function campoOpcional(valor: string | undefined): string | undefined {
    const limpo = valor?.trim();                    //
    return limpo ? limpo : undefined;               //operador tenario
}


    //Função utilizada para tirar os acentos e colocar tudo minusculo.
export function simplificarTexto(valor: string): string{
    return valor
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");             // Remove os acentos que anteriormente foram separados das letras

}


// Não usamos new Date porque ele interpreta como meia-noite UTC,
// e no Brasil (UTC-3) a data vira o dia anterior.
export function corrigirData(valor: string): Date | null {
    const partes = valor.trim().split("-");                //O split divide o texto onde possui "-"
    if (partes.length !== 3) return null;

    const [ano, mes, dia] = partes.map(Number);

    const data = new Date(ano, mes - 1, dia);

    if(
        data.getFullYear() !== ano ||
        data.getMonth() !== mes -1 ||
        data.getDate() !== dia
    ){
        return null;
    }
    return data;
}


// Valores aceitos, tirados direto da interface Cliente.
// Se alguém escrever um valor que não existe aqui, o Codigo reclama.

const ESTADOS_CIVIS: Cliente["estadoCivil"][] = ["Solteiro", "Casado", "Divorciado", "Viúvo"]

// Converte o texto da planilha para um estado civil válido.
export function paraEstadoCivil(valor: string): Cliente["estadoCivil"] | null {
    const procurado = simplificarTexto(valor);
    const encontrado = ESTADOS_CIVIS.find((opcao) => simplificarTexto(opcao) === procurado);
    return encontrado ?? null;
}

const TIPOS_CONTA: Conta["tipo"][] = ["corrente", "poupanca"];
// Converte o texto da planilha para um tipo de conta válido.
export function  paraTipoConta(valor: string): Conta["tipo"] | null {
    const procurado = simplificarTexto(valor);
    const encontrado = TIPOS_CONTA.find((opcao) => opcao === procurado);
    return encontrado ?? null
}