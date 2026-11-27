import { Link, useParams } from "react-router-dom";
import { useDados } from "../context/useDados";
import { formatarCpfCnpj, formatarData, formatarMoeda, nomeExibicao, tipoPessoa} from "../utils/formatar";

export function DetalhesDoCliente() {
        const {id} = useParams();
        const {clientes, contas, agencias} = useDados();

        const cliente = clientes.find((c) => c.id === id)

        if(!cliente){
            return (
                <section>
                    <h1>Cliente não encontrado!</h1>
                    <p>
                        Não existe cliente com o identificador "{id}". Clientes cadastrados nesta sessão
                        deixam de existir ao recarregar a página.
                    </p>
                    <Link to ="/">Voltar para lista</Link>
                </section>
            )   ;
        }

        //as contas do cliente ligadas pelo CPF/CNPJ.
        const contasDoCliente = contas.filter((conta) => conta.cpfCnpjCliente === cliente.cpfCnpj);

        //a agencia do cliente ligada pelo ID
        const agencia = agencias.find((a) => a.codigo === cliente.codigoAgencia);

        //saldo de todas as contas do cliente
        const saldoTotal = contasDoCliente.reduce((soma, conta) => soma + conta.saldo, 0);

        //para empresas PJ, data de nascimento é a data de fundação
        const ehEmpresa = tipoPessoa(cliente.cpfCnpj) === "PJ";

        return(
            <section>
                <Link to ="/">Voltar para a lista</Link>
                <h1>{nomeExibicao(cliente)}</h1>

                {/*  todas as informações do cliente*/}
                <section aria-labelledby="titulo-dados">
                    <h2 id="titulo-dados">Dados do Cliente</h2>
                    <dl>
                        <dt>Nome civil</dt>
                        <dd>{cliente.nome}</dd>

                        {/*so aparece se o cliente possuir nome social */}
                        {cliente.nomeSocial &&(
                            <>
                                <dt>Nome Social</dt>
                                <dd>{cliente.nomeSocial}</dd>
                            </>
                        )}

                        <dt>{ehEmpresa ? "CNPJ" : "CPF"}</dt>
                        <dd>{formatarCpfCnpj(cliente.cpfCnpj)}</dd>


                        {/*So aparece se o cliente tiver RG */}
                        {cliente.rg &&(
                            <>
                                <dt>RG</dt>
                                <dd>{cliente.rg}</dd>                           
                            </>
                        )}

                        <dt>{ehEmpresa ? "Data de fundação" : "Data de nascimento"}</dt>
                        <dd>{formatarData(cliente.dataNascimento)}</dd>

                        <dt>Email</dt>
                        <dd>{cliente.email || "Não informado"}</dd>

                        <dt>Endereço</dt>
                        <dd>{cliente.endereco || "Não informado"}</dd>

                        <dt>Renda anual</dt>
                        <dd>{formatarMoeda(cliente.rendaAnual)}</dd>

                        <dt>Patrimônio</dt>
                        <dd>{formatarMoeda(cliente.patrimonio)}</dd>

                        <dt>Estado Civil</dt>
                        <dd>{cliente.estadoCivil}</dd>

                        <dt>Identificador</dt>
                        <dd>{cliente.id}</dd>   
                    </dl>
                </section>


                {/*Todas as contas dos clientes */}
                <section aria-labelledby="titulo-contas">
                        <h2 id="titulo-contas">Contas {(contasDoCliente.length)}</h2>

                        {contasDoCliente.length === 0 ? (
                            <p>Esse cliente não tem contas.</p>
                        ) : (
                           <>
                           <p>Saldo Total: {formatarMoeda(saldoTotal)}</p>
                           <ul>
                                {contasDoCliente.map((conta) => (
                                    <li key = {conta.id}>
                                        <h3>{conta.tipo === "corrente" ? "Conta corrente" : "Conta poupança"}</h3>
                                        <dl>
                                            <dt>Identificador</dt>
                                            <dd>{conta.id}</dd>

                                            <dt>Saldo</dt>
                                            <dd>{formatarMoeda(conta.saldo)}</dd>

                                            <dt>Limite de creditos</dt>
                                            <dd>{formatarMoeda(conta.limiteCredito)}</dd>

                                            <dt>Creditos disponiveis</dt>
                                            <dd>{formatarMoeda(conta.creditoDisponivel)}</dd>
                                        </dl>
                                    </li>
                                ))}
                           </ul>
                           </> 
                        )}

                </section>

                {/*A agencia do cliente */}
                <section aria-labelledby="titulo-agencia">
                    <h2 id="titulo-agencia">Agencia</h2>

                    {agencia ?(
                        <dl>
                            <dt>Nome</dt>
                            <dd>{agencia.nome}</dd>

                            
                            <dt>Codigo</dt>
                            <dd>{agencia.codigo}</dd>

                            
                            <dt>Endereço</dt>
                            <dd>{agencia.endereco || "Não informado"}</dd>

                            <dt>Identificador</dt>
                            <dd>{agencia.id}</dd>
                        </dl>
                    ) : (
                        <p>
                             A agência de código {cliente.codigoAgencia} não foi encontrada nos dados do banco
                        </p>
                    )}
                </section>

            </section>

        )




}