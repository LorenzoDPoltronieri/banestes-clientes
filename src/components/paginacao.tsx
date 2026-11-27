interface PaginacaoProps {
    paginaAtual: number;
    totalPaginas: number;
    aoMudarPagina: (pagina: number) => void;
}

export function Paginacao({paginaAtual, totalPaginas, aoMudarPagina}: PaginacaoProps) {
    // Com uma pagina so, nao ha o que paginar
    if(totalPaginas <= 1) return null;

return (
    <nav aria-label="Paginação da lista de clientes">
      <button
        type="button"
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
      >
        Anterior
      </button>

      <span>
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        type="button"
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
      >
        Próxima
      </button>
    </nav>
);
}