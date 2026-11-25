
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