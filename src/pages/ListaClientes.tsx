import { Link } from "react-router-dom";
import { useDados } from "../context/useDados";

export function ListaClientes() {
    const{clientes} = useDados();

    return (
        <section>
            <h1>Clientes</h1>
            <p>{clientes.length} Clientes cadastrados</p>

            <Link to="/clientes/CLI-001">Ver cliente teste (CLI-001)</Link>
        </section>
    );
}