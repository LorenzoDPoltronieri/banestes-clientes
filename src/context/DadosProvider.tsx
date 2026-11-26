import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Agencia, Cliente, Conta } from "../types";
import { carregarDados } from "../services/api";
import { DadosContext } from "./dadosContext";

// Busca os dados da planilha e os pendura no "quadro de avisos"
export function DadosProvider({ children }: { children: ReactNode }) {
  //As caixinhas que guardam os dados
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  //Busca os dados uma vez, quando o sistema abre
  useEffect(() => {
    carregarDados()
      .then((dados) => {
        setClientes(dados.clientes);
        setAgencias(dados.agencias);
        setContas(dados.contas);
      })
      .catch((e: unknown) => {
        console.error(e);
        setErro("Não foi possível carregar os dados. Por favor, tente novamente.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  //Adiciona um cliente novo no começo da lista (fica só em memória)
  function adicionarCliente(novo: Cliente) {
    setClientes((atuais) => [novo, ...atuais]);
  }

  //Pendura tudo no quadro e desenha o que está dentro do Provider
  return (
    <DadosContext.Provider
      value={{ clientes, contas, agencias, carregando, erro, adicionarCliente }}
    >
      {children}
    </DadosContext.Provider>
  );
}