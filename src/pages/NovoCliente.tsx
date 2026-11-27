import { clienteSchema } from "../schemas/clienteSchema";

// Página de cadastro de cliente (versão provisória, completada na próxima parte)
export function NovoCliente() {
  // Teste temporário das regras de validação
  const resultado = clienteSchema.safeParse({
    nome: "Lorenzo",
    nomeSocial: "",
    cpfCnpj: "111.222",
    rg: "",
    dataNascimento: "2099-01-01",
    email: "lorenzo-sem-arroba",
    endereco: "Rua",
    rendaAnual: "-10",
    patrimonio: "abc",
    estadoCivil: "Namorando",
    codigoAgencia: "",
  });
    // Mostra só a lista de erros, de um jeito fácil de ler
  if (!resultado.success) {
    console.log(
      "Erros:",
      resultado.error.issues.map((erro) => `${erro.path.join(".")}: ${erro.message}`),
    );
  }

  return (
    <section>
      <h1>Novo cliente</h1>
      <p>O formulário de cadastro vai aparecer aqui.</p>
    </section>
  );
}