
import type { Agencia, Cliente, Conta } from "../types";

// Uma linha do CSV como chega do papaparse: chave e valor, tudo texto
export type LinhaCsv = Record<string, string>;

//Limpa e deixa somente numeros
export function apenasDigitos(valor: string): string {
    return valor.replace(/\D/g, "");
}

// Normaliza CPF/CNPJ: deixa só os dígitos e devolve os zeros à esquerda
// que o Google Sheets remove (ele trata o CPF como número).
// Retorna null se o valor for inválido.
export function normalizarCpfCnpj(valor: string): string | null {
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




// Normalização dos clientes

// Converte uma linha crua do CSV em um Cliente válido.
// Retorna null (descarta a linha) se faltar algum dado essencial.
export function normalizarCliente(linha: LinhaCsv): Cliente | null {

  const id = campoOpcional(linha.id);
  const cpfCnpj = normalizarCpfCnpj(linha.cpfCnpj ?? "");
  const nome = campoOpcional(linha.nome);
  const dataNascimento = corrigirData(linha.dataNascimento ?? "");
  const estadoCivil = paraEstadoCivil(linha.estadoCivil ?? "");
  const rendaAnual = textoParaNumero(linha.rendaAnual ?? "");
  const patrimonio = textoParaNumero(linha.patrimonio ?? "");
  const codigoAgencia = textoParaNumero(linha.codigoAgencia ?? "");

  // Números são conferidos com "=== null" porque 0 é um valor válido
  // (e o "!" consideraria 0 como falso)
  if (
    !id ||
    !cpfCnpj ||
    !nome ||
    !dataNascimento ||
    !estadoCivil ||
    rendaAnual === null ||
    patrimonio === null ||
    codigoAgencia === null
  ) {
    console.warn("Cliente descartado por dados inválidos:", linha);
    return null;
  }

  return {
    id,
    cpfCnpj,
    // "ISENTO" é mantido e informa que o cliente (empresa) não possui RG
    rg: campoOpcional(linha.rg),
    dataNascimento,
    nome,
    nomeSocial: campoOpcional(linha.nomeSocial),
    // email e endereço vazios não descartam o cliente, a tela mostra "Não informado"
    email: campoOpcional(linha.email) ?? "",
    endereco: campoOpcional(linha.endereco) ?? "",
    rendaAnual,
    patrimonio,
    estadoCivil,
    // Agencia inexistente é mantida: a tela de detalhes avisa o usuário
    codigoAgencia,
  };
}


//Normalização de conta, mesma logica que a Normalização de clientes

// Ex.: a conta CNT-108 tem CPF "0" e é descartada.
export function normalizarConta(linha: LinhaCsv): Conta | null {
  const id = campoOpcional(linha.id);
  // Mesma normalização do cliente: garante que os CPFs dos dois lados sejam os mesmos
  const cpfCnpjCliente = normalizarCpfCnpj(linha.cpfCnpjCliente ?? "");
  const tipo = paraTipoConta(linha.tipo ?? "");
  const saldo = textoParaNumero(linha.saldo ?? "");
  const limiteCredito = textoParaNumero(linha.limiteCredito ?? "");
  const creditoDisponivel = textoParaNumero(linha.creditoDisponivel ?? "");

  if (
    !id ||
    !cpfCnpjCliente ||
    !tipo ||
    saldo === null ||
    limiteCredito === null ||
    creditoDisponivel === null
  ) {
    console.warn("Conta descartada por dados inválidos:", linha);
    return null;
  }

  return { id, cpfCnpjCliente, tipo, saldo, limiteCredito, creditoDisponivel };
}

//Normalização das agencias, mesma logica que contas e clientes.

export function normalizarAgencia(linha: LinhaCsv): Agencia | null {
  const id = campoOpcional(linha.id);
  const codigo = textoParaNumero(linha.codigo ?? "");
  const nome = campoOpcional(linha.nome);

  if (!id || codigo === null || !nome) {
    console.warn("Agência descartada por dados inválidos:", linha);
    return null;
  }

  return {
    id,
    codigo,
    nome,
    endereco: campoOpcional(linha.endereco) ?? "",
  };
}