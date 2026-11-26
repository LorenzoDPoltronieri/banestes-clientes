import type { Cliente } from "../types";

//Coloca o cpf e o CNPJ que antes eram xxxxxxxxxx como xxx.xxx.xxx.-xx
export function formatarCpfCnpj(valor: string): string {
    if(valor.length === 11){
        return `${valor.slice(0,3)}.${valor.slice(3,6)}.${valor.slice(6,9)}-${valor.slice(9)}`
    }
    if(valor.length === 14) {
        return `${valor.slice(0, 2)}.${valor.slice(2, 5)}.${valor.slice(5, 8)}/${valor.slice(8, 12)}-${valor.slice(12)}`
    }
    return valor;
}

//Coloca a pessoa como PJ ou PF
export function tipoPessoa(cpfCnpj: string): "PF" | "PJ" {
    return cpfCnpj.length === 14 ? "PJ" : "PF";
}

//formata a moeda 
const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL", 
});

// Traz a moeda formatada para R$....
export function formatarMoeda(valor: number): string {
   return formatadorMoeda.format(valor);
}

//Data com o modelo que se usa no Brasil.
export function formatarData(data: Date): string {
  return data.toLocaleDateString("pt-BR");
}

// O nome social, quando existe, tem prioridade.
export function nomeExibicao(cliente: Cliente): string {
  return cliente.nomeSocial ?? cliente.nome;
}