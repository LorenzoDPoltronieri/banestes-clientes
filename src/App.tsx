import { useEffect } from "react";
import { buscarCsv, URL_CLIENTES, URL_CONTAS, URL_AGENCIAS } from "./services/api";

function App() {
    // Teste temporário: busca as 3 abas e mostra no console do navegador
    useEffect(()=> {
      buscarCsv(URL_CLIENTES).then((dados)=>console.log("Clientes:", dados));
      buscarCsv(URL_CONTAS).then((dados)=>console.log("Contas:", dados));
      buscarCsv(URL_AGENCIAS).then((dados)=>console.log("Agências:", dados));
    } , []);

    return <h1>Clientes Banestes</h1>;

}

export default App;