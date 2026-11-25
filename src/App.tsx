import { useEffect } from "react";
import { buscarCsv, URL_CLIENTES, URL_CONTAS, URL_AGENCIAS } from "./services/api";
import { corrigirData, paraEstadoCivil, paraTipoConta } from "./utils/normalizar";

function App() {
    // Teste temporário: busca as 3 abas e mostra no console do navegador
    useEffect(()=> {  
          // Testes temporários: data, estado civil e tipo de conta
    console.log("Data ok:", corrigirData("1990-05-14")?.toLocaleDateString("pt-BR")); // "14/05/1990"
    console.log("Data inexistente:", corrigirData("2020-02-31"));     // null
    console.log("Data lixo:", corrigirData("abc"));                   // null
    console.log("Estado civil:", paraEstadoCivil("casado"));     // "Casado"
    console.log("Sem acento:", paraEstadoCivil("VIUVO"));        // "Viúvo"
    console.log("Inválido:", paraEstadoCivil("Namorando"));      // null
    console.log("Tipo conta:", paraTipoConta("Poupança"));       // "poupanca"
    console.log("Tipo inválido:", paraTipoConta("investimento")); // null
      buscarCsv(URL_CLIENTES).then((dados)=>console.log("Clientes:", dados));
      buscarCsv(URL_CONTAS).then((dados)=>console.log("Contas:", dados));
      buscarCsv(URL_AGENCIAS).then((dados)=>console.log("Agências:", dados));
    } , []);

    return <h1>Clientes Banestes</h1>;

}

export default App;