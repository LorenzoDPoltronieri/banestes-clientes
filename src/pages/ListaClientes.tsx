import { useState } from "react";
import { Link } from "react-router-dom";
import { useDados } from "../context/useDados";
import { formatarCpfCnpj, tipoPessoa, nomeExibicao } from "../utils/formatar";
import { simplificarTexto, apenasDigitos, } from "../utils/normalizar";


//Pagina inicial
export function ListaClientes() {
    const{clientes, agencias} = useDados();

    //Oque o usuario digitou na caixa de busca.
    const[busca, SetBusca] = useState("");
    

    //Simplifica o formato do texto e dos numero para a busca
    const termoTexto = simplificarTexto(busca);
    const termoDigitos = apenasDigitos(busca);

    //
    const clientesFiltrados = clientes.filter((cliente) => {
         // Busca vazia, mostra todos
        if (termoTexto === "") return true;

        //confere o nome ignorando maiusculos e acentos.
        const nomeConfere =
            simplificarTexto(cliente.nome).includes(termoTexto) ||
            simplificarTexto(cliente.nomeSocial ?? "").includes(termoTexto);


    // Confere o CPF/CNPJ só se a busca tiver algum número
        const documentoConfere = termoDigitos !== "" && cliente.cpfCnpj.includes(termoDigitos);

            return nomeConfere || documentoConfere;
});
 
// Devolve o nome da agência pelo código, ou um aviso se ela não existir
function nomeDaAgencia(codigo: number): string{
    const agencia = agencias.find((a) => a.codigo === codigo);
    return agencia ? agencia.nome : "Agencia não encontrada";
}

// Texto da contagem no singular ou plural
const textoResultado = 
    clientesFiltrados.length === 1
    ?"1 Cliente Encontrado" : `${clientesFiltrados.length} Clientes encontrados`;



return(
    <section>
            <h1>Clientes</h1>

            {/*campo de busca*/}
            <div>
                <label htmlFor="busca">Buscar por ou CPF/CNPJ</label>
                <input
                id="busca"
                type="search"
                value={busca}
                onChange={(e) => SetBusca(e.target.value)}
                placeholder="EX.: Ana ou 111.222.333-44"
                />
            </div>

              {/* aria-live: o leitor de tela anuncia a contagem quando ela muda */}
              <p aria-live="polite">{textoResultado}</p>

            {clientesFiltrados.length ===0 ? (
                <div>
                    <p>Nenhum Cliente encontrado para "{busca}".</p>
                    <button type="button" onClick={() =>SetBusca("")}>
                        Limpar busca
                    </button>
                </div>
            ) : (
        <table>
          <caption>Lista de clientes do banco</caption>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">CPF/CNPJ</th>
              <th scope="col">Tipo</th>
              <th scope="col">Agência</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{nomeExibicao(cliente)}</td>
                <td>{formatarCpfCnpj(cliente.cpfCnpj)}</td>
                <td>{tipoPessoa(cliente.cpfCnpj)}</td>
                <td>{nomeDaAgencia(cliente.codigoAgencia)}</td>
                <td>
                  <Link
                    to={`/clientes/${cliente.id}`}
                    aria-label={`Ver detalhes de ${nomeExibicao(cliente)}`}
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}