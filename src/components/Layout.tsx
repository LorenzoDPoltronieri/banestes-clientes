import { Link, NavLink, Outlet } from "react-router-dom";
import { useDados } from "../context/useDados";

// Estrutura comum a todas as páginas: cabeçalho, conteúdo e rodapé.
// Também cuida das telas de carregamento e erro, para não repetir em cada página.
export function Layout() {
  const { carregando, erro } = useDados();

//decide oque aparece na tela principal.
 function renderizarConteudo(){
    if (carregando){
        return <p role="status">Carregando Dados...</p>;
    }

        //caso venha a ocorrer erros
    if (erro){
        return(
            <div role ="alert">
                <p>{erro}</p>
                <button type="button" onClick={() => window.location.reload()}>Tentar Novamente</button>
            </div>
        );
    }

    return<Outlet />;

 }


//se der tudo certo vem para essa parte onde mostra o endereço atual
 return (
    <>
    <header>
        <Link to="/">Clientes Banestes</Link>
        <nav aria-label="Navegação principal">
            <NavLink to="/" end>
                Clientes
            </NavLink>
          <NavLink to="/clientes/novo">Novo cliente</NavLink>
        </nav>
    </header>
    
    <main>{renderizarConteudo()}</main>

    <footer>
        <p>Projeto desenvolvido para teste pratico do Banestes.</p>
    </footer>

    </>
 );
}