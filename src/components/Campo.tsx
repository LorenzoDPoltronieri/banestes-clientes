import type{ ReactNode } from "react";

interface CampoProps{
    id: string;                    // o id do campo (liga o rótulo e a mensagem de erro)
    rotulo: string;                // o texto do rotulo
    erro?: string;                 // a mensagem de erro se houver
    obrigatorio?: boolean;
    children: ReactNode;          // o campo em si (input ou select)
}
// Estrutura de um campo do formulário: rótulo + campo + mensagem de erro
export function Campo({id, rotulo, erro, obrigatorio = false, children }: CampoProps) {
    return(
        <div>
            <label htmlFor={id}>
                {rotulo}
                {obrigatorio && <span aria-hidden="true"> *</span>}
            </label>

            {children}

            {erro && (
                <p id={`${id}-erro`} role="alert">{erro}</p>
            )}
        </div>
    )
}