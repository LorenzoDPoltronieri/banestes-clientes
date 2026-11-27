import {z} from "zod";
import { apenasDigitos, textoParaNumero, corrigirData } from "../utils/normalizar";

const ESTADOS_CIVIS = ["Solteiro", "Casado", "Viúvo", "Divorciado"]as const;


// Confere se um texto é um número válido e não negativo
function ehValorValido(valor: string): boolean {
    const numero = textoParaNumero(valor);
    return numero !== null && numero >= 0;
}

//regras de validação 
export const clienteSchema = z.object({
    nome: z.string().trim().min(3,"Escreva o nome completo. (minimo de 3 letras)."),
    //Nome social pode ficar vazio
    nomeSocial:z.string().trim(),
    //aceita com e sem pontuação, porem tem que ter 11 ou 14 digitos
    cpfCnpj: z.string().refine((valor) => {
        const digitos = apenasDigitos(valor);
        return digitos.length === 11 || digitos.length === 14;
    }, "Informe um CPF (11 dígitos) ou um CNPJ (14 dígitos)."),


    // Opcional: pode ficar vazio
    rg: z.string().trim(),

    dataNascimento: z
    .string()
    .refine((valor) => corrigirData(valor) !== null, "Informe uma data válida.")
    .refine((valor) =>{
        const data = corrigirData(valor);
        return data !== null && data <= new Date();
    }, "A data não pode esta no futuro"),

    email: z.email("Informe um email valido"),
    
    endereco: z.string().trim().min(5, "Informe o endereço completo."),

    rendaAnual: z.string().refine(ehValorValido, "Informe um valor maior ou igual a zaro."),

    patrimonio: z.string().refine(ehValorValido, "Informe um valor maior ou igual a zero."),

    estadoCivil: z.enum(ESTADOS_CIVIS, "Selecione o estado civil."),

    codigoAgencia: z.string().min(1, "Selecione uma agência."),
});

// O tipo dos dados do formulário, gerado automaticamente a partir das regras
export type ClienteFormulario = z.infer<typeof clienteSchema>;