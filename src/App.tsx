import { useEffect, useState } from "react";
import { buscarCsv, URL_CLIENTES, URL_CONTAS, URL_AGENCIAS } from "./services/api";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const cacheBuscarCsv = [ "cache-buscar-csv" ];

function App() {
    // Teste temporário: busca as 3 abas e mostra no console do navegador
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000,
          
        }
      }
    });
    
    const query = useQuery({
      queryKey: cacheBuscarCsv,
      queryFn: async () => await buscarCsv(URL_CLIENTES).then((dados)=>console.log("Clientes:", dados))
      // buscarCsv(URL_CONTAS).then((dados)=>console.log("Contas:", dados));
      // buscarCsv(URL_AGENCIAS).then((dados)=>console.log("Agências:", dados));
    });

    function handleAtualizarValorCache() {
      queryClient.setQueryData(cacheBuscarCsv, (data: any) => {
        return data;
      });
    }

    return <QueryClientProvider client={queryClient}>
      {query.isSuccess ? <>dados carregados</> : <>Carregando...</>}
    </QueryClientProvider>

}

export default App;