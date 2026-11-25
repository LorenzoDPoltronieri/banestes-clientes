import { useEffect } from "react";
import { carregarDados } from "./services/api";

function App() {
    useEffect(()=> {  
          // Testes temporários: carrega os dados ja normalizados
        carregarDados()
          .then((dados) => console.log("Dados limpos,", dados))
          .catch((erro) => console.error("Falha ao carregar dados,", erro));
    } , []);

    return <h1>Clientes Banestes</h1>;
}

export default App;