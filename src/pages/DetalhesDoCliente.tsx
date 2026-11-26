import { Link, useParams } from "react-router-dom";

export function DetalhesDoCliente(){
    const{id} = useParams();

    return(
        <section>
            <Link to="/">Voltar para a lista.</Link>
            <h1>Detalhes</h1>
            <p>Cliente Selecionado: {id}</p>
        </section>
    );
}