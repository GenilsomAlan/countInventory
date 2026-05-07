export const verificarEncerramentoDaContagem = () =>{
    const linhas = document.querySelectorAll(".linha")

    return [...linhas].every(linha => {
        const btn = linha.querySelector(".status-btn")
        return btn.dataset.editing === "true"
    })
}