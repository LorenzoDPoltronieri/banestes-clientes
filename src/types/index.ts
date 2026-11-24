
//Representa um Cliente do banco(Tanto pessoa fisica como pessoa juridica).
export interface Cliente {
    id: string;
    cpfCnpj: string;                 // CPF (11 dígitos) ou CNPJ (14 dígitos)
    rg?: string;                     // Opcional, pois empresas não possuem RG
    dataNascimento: Date;            // data de verdade, não texto
    nome: string;
    nomeSocial?: string;             // Opcional 
    email: string;
    endereco: string;
    rendaAnual: number;
    patrimonio: number;
    estadoCivil: "Solteiro" |"Casado" | "Viúvo" | "Divorciado";
    codigoAgencia: number;           // Liga o cliente a uma Agencia.
}

//Representa a conta bancaria do cliente
export interface Conta {
    id: string;
    cpfCnpjCliente: string;          // Liga a conta ao Cliente
    tipo: "corrente" | "poupanca";
    saldo: number;
    limiteCredito: number;
    creditoDisponivel: number;
}

//representa a agência do banco 
export interface Agencia {
    id: string;
    codigo: number;                   // é esse campo que o cliente usa pra se ligar
    nome: string;
    endereco: string;
}