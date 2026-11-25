import { useEffect } from "react";
import { buscarCsv, URL_CLIENTES, URL_CONTAS, URL_AGENCIAS } from "./services/api";
import { normalizaCpfCnpj, textoParaNumero,  campoOpcional} from "./utils/normalizar";

function App() {
    // Teste temporário: busca as 3 abas e mostra no console do navegador
    useEffect(()=> {  
        // Testes temporários das funções de normalização
      console.log("CPF curto:", normalizaCpfCnpj("11122233"));         // "00011122233"
      console.log("CPF com pontos:", normalizaCpfCnpj("111.222.333-44")); // "11122233344"
      console.log("CPF zero:", normalizaCpfCnpj("0"));                 // null
      console.log("Número:", textoParaNumero("85000.00"));                   // 85000
      console.log("Número vazio:", textoParaNumero(""));                     // null
      console.log("Número inválido:", textoParaNumero("abc"));               // null
      console.log("RG vazio:", campoOpcional(""));                      // undefined
      console.log("RG ok:", campoOpcional(" MG123 "));                  // "MG123"
      buscarCsv(URL_CLIENTES).then((dados)=>console.log("Clientes:", dados));
      buscarCsv(URL_CONTAS).then((dados)=>console.log("Contas:", dados));
      buscarCsv(URL_AGENCIAS).then((dados)=>console.log("Agências:", dados));
    } , []);

    return <h1>Clientes Banestes</h1>;

}

export default App;