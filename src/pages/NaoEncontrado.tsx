import { Link } from "react-router-dom";

export function NaoEncontrado() {
    return(
        <section>
            <h1>Página não encontrada</h1>
            <p>O endereço acessado não existe</p>
            <Link to="/">Ir para a lista de Clientes</Link>
        </section>
    );
}