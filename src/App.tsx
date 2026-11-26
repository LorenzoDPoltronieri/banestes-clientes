import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Layout } from "./components/Layout";
import { ListaClientes } from "./pages/ListaClientes";
import { DetalhesDoCliente } from "./pages/DetalhesDoCliente";
import { NaoEncontrado } from "./pages/NaoEncontrado";
import { NovoCliente } from "./pages/NovoCliente";

// Define qual página aparece em cada endereço
 function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<ListaClientes />} />
            <Route path="/clientes/novo" element={<NovoCliente />} />
            <Route path="/clientes/:id" element={<DetalhesDoCliente />} />
            <Route path="*" element={<NaoEncontrado/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
 }

 export default App;