import { useDados } from "./context/useDados";

function App() {
  // Lê o "quadro de avisos"
  const { clientes, contas, agencias, carregando, erro } = useDados();

  //enquanto os dados não chegam
  if (carregando) {
    return <p>Carregando dados...</p>;
  }

  //se deu erro, mostra a mensagem e um botão para recarregar a página
  if (erro) {
    return (
      <div role="alert">
        <p>{erro}</p>
        <button onClick={() => window.location.reload()}>Tentar de novo</button>
      </div>
    );
  }

  //deu tudo certo (teste temporário)
  return (
    <main>
      <h1>Clientes Banestes</h1>
      <p>
        {clientes.length} clientes, {contas.length} contas e {agencias.length} agências carregados.
      </p>
    </main>
  );
}

export default App;