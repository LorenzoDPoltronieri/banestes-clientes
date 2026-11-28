import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDados } from "../context/useDados";
import { Campo } from "../components/Campo";
import { clienteSchema } from "../schemas/clienteSchema";
import type { ClienteFormulario } from "../schemas/clienteSchema";
import { apenasDigitos, corrigirData, textoParaNumero } from "../utils/normalizar";
import type { Cliente } from "../types";

// Página de cadastro de cliente, com validação pelo schema do Zod
export function NovoCliente() {
  const { clientes, agencias, adicionarCliente } = useDados();
  const navegar = useNavigate();

  // O React Hook Form controla os campos e usa o schema do Zod para validar
const {
  register,
  handleSubmit,
  setError,
  formState: {errors, isSubmitting },
} = useForm<ClienteFormulario>({
  resolver: zodResolver(clienteSchema),
  defaultValues: {
      nome: "",
      nomeSocial: "",
      cpfCnpj: "",
      rg: "",
      dataNascimento: "",
      email: "",
      endereco: "",
      rendaAnual: "",
      patrimonio: "",
      codigoAgencia: "",
    },
  });

  //liga cada campo ao seu respectivo erro.
  function ariaDoCampo(campo: keyof ClienteFormulario) {
    return {
       "aria-invalid": errors[campo] ? true : undefined,
       "aria-describedby": errors[campo] ? `${campo}-erro` : undefined,
    };
  }


   // Só é chamada se TODOS os campos passarem pelas regras do schema
  function salvar(dados: ClienteFormulario) {
    const cpfCnpj = apenasDigitos(dados.cpfCnpj);

    // Não permite cadastrar um CPF/CNPJ que já existe
    if (clientes.some((cliente) => cliente.cpfCnpj === cpfCnpj)) {
      setError("cpfCnpj", { message: "Já existe um cliente com este CPF/CNPJ." });
      return;
   }

   // Converte os textos do formulário para o formato da interface Cliente.
    // O "!" é seguro aqui: o schema já garantiu que a data e os valores são válidos.
    const novoCliente: Cliente = {
      id: crypto.randomUUID(), // id gerado no front-end, como pede o enunciado
      cpfCnpj,
      rg: dados.rg || undefined,
      dataNascimento: corrigirData(dados.dataNascimento)!,
      nome: dados.nome,
      nomeSocial: dados.nomeSocial || undefined,
      email: dados.email,
      endereco: dados.endereco,
      rendaAnual: textoParaNumero(dados.rendaAnual)!,
      patrimonio: textoParaNumero(dados.patrimonio)!,
      estadoCivil: dados.estadoCivil,
      codigoAgencia: Number(dados.codigoAgencia),
    };

    adicionarCliente(novoCliente);

    // Leva o usuário para a página do cliente recém-cadastrado
    navegar(`/clientes/${novoCliente.id}`);
  }

  return (
    <section>
      <Link to="/">← Voltar para a lista</Link>
      <h1>Novo cliente</h1>
      <p>Campos marcados com * são obrigatórios.</p>

      {/* noValidate: desliga a validação do navegador, para valerem as mensagens do Zod */}
      <form onSubmit={handleSubmit(salvar)} noValidate>
        <Campo id="nome" rotulo="Nome completo" erro={errors.nome?.message} obrigatorio>
          <input
            id="nome"
            type="text"
            autoComplete="name"
            aria-required="true"
            {...register("nome")}
            {...ariaDoCampo("nome")}
          />
        </Campo>

        <Campo id="nomeSocial" rotulo="Nome social" erro={errors.nomeSocial?.message}>
          <input id="nomeSocial" type="text" {...register("nomeSocial")} {...ariaDoCampo("nomeSocial")} />
        </Campo>

        <Campo id="cpfCnpj" rotulo="CPF ou CNPJ" erro={errors.cpfCnpj?.message} obrigatorio>
          <input
            id="cpfCnpj"
            type="text"
            inputMode="numeric"
            placeholder="Somente números ou com pontuação"
            aria-required="true"
            {...register("cpfCnpj")}
            {...ariaDoCampo("cpfCnpj")}
          />
        </Campo>

        <Campo id="rg" rotulo="RG" erro={errors.rg?.message}>
          <input id="rg" type="text" {...register("rg")} {...ariaDoCampo("rg")} />
        </Campo>

        <Campo
          id="dataNascimento"
          rotulo="Data de nascimento (ou de fundação, para empresas)"
          erro={errors.dataNascimento?.message}
          obrigatorio
        >
          <input
            id="dataNascimento"
            type="date"
            aria-required="true"
            {...register("dataNascimento")}
            {...ariaDoCampo("dataNascimento")}
          />
        </Campo>

        <Campo id="email" rotulo="E-mail" erro={errors.email?.message} obrigatorio>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            {...register("email")}
            {...ariaDoCampo("email")}
          />
        </Campo>

        <Campo id="endereco" rotulo="Endereço" erro={errors.endereco?.message} obrigatorio>
          <input
            id="endereco"
            type="text"
            autoComplete="street-address"
            aria-required="true"
            {...register("endereco")}
            {...ariaDoCampo("endereco")}
          />
        </Campo>

        <Campo id="rendaAnual" rotulo="Renda anual (R$)" erro={errors.rendaAnual?.message} obrigatorio>
          <input
            id="rendaAnual"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            aria-required="true"
            {...register("rendaAnual")}
            {...ariaDoCampo("rendaAnual")}
          />
        </Campo>

        <Campo id="patrimonio" rotulo="Patrimônio (R$)" erro={errors.patrimonio?.message} obrigatorio>
          <input
            id="patrimonio"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            aria-required="true"
            {...register("patrimonio")}
            {...ariaDoCampo("patrimonio")}
          />
        </Campo>

        <Campo id="estadoCivil" rotulo="Estado civil" erro={errors.estadoCivil?.message} obrigatorio>
          <select
            id="estadoCivil"
            defaultValue=""
            aria-required="true"
            {...register("estadoCivil")}
            {...ariaDoCampo("estadoCivil")}
          >
            <option value="" disabled>
              Selecione...
            </option>
            <option value="Solteiro">Solteiro(a)</option>
            <option value="Casado">Casado(a)</option>
            <option value="Divorciado">Divorciado(a)</option>
            <option value="Viúvo">Viúvo(a)</option>
          </select>
        </Campo>

        <Campo id="codigoAgencia" rotulo="Agência" erro={errors.codigoAgencia?.message} obrigatorio>
          <select
            id="codigoAgencia"
            aria-required="true"
            {...register("codigoAgencia")}
            {...ariaDoCampo("codigoAgencia")}
          >
            <option value="" disabled>
              Selecione...
            </option>
            {agencias.map((agencia) => (
              <option key={agencia.id} value={agencia.codigo}>
                {agencia.nome} ({agencia.codigo})
              </option>
            ))}
          </select>
        </Campo>

        <div>
          <button type="submit" disabled={isSubmitting}>
            Cadastrar cliente
          </button>
          <Link to="/">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}
