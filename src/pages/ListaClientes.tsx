import { Link } from "react-router-dom";
import { useDados } from "../context/useDados";
import { formatarCpfCnpj, tipoPessoa, nomeExibicao } from "../utils/formatar";



//Pagina inicial
export function ListaClientes() {
    const{clientes, agencias} = useDados();


// Devolve o nome da agência pelo código, ou um aviso se ela não existir
function nomeDaAgencia(codigo: number): string{
    const agencia = agencias.find((a) => a.codigo === codigo);
    return agencia ? agencia.nome : "Agencia não encontrada";
}

return(
    <section>
            <h1>Clientes</h1>

            <table>
                <caption>Lista de Clientes Banestes</caption>
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
                    {clientes.map((cliente) =>(
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
    </section>
)

}