const verificarEncerramentoDaContagem = () => {
    const linhas = document.querySelectorAll('.linha')
    
    return [...linhas].every(linha =>{
        const btn = linha.querySelector('.status-btn')
        return btn.classList.contains('ativo')
    })
}

const btnDivergences = document.getElementById("showDivergences")
btnDivergences.addEventListener("click", () =>{
    coletarDivergencias()
})

const coletarDivergencias = () => {
    const linhas = document.querySelectorAll('.linha')
    const divergencias = []

    linhas.forEach(linha =>{
        const caixas = linha.querySelector('.caixas')
        const pacotes = linha.querySelector('.pacotes')
        const macos = linha.querySelector('.macos')

        const originalCaixas = Number(caixas.dataset.original)
        const atualCaixas = Number(caixas.innerText)
        const originalPacotes = Number(pacotes.dataset.original)
        const atualPacotes = Number(pacotes.innerText)
        const originalMacos = Number(macos.dataset.original)
        const atualMacos = Number(macos.innerText)

        if(originalCaixas !== atualCaixas || originalPacotes !== atualPacotes || originalMacos !== atualMacos){
            divergencias.push({
                reservado: linha.querySelector('.reservado').innerText,
                posicao: linha.querySelector('.posicao').innerText, 
                caixas: atualCaixas,
                pacotes: atualPacotes,
                macos: atualMacos,
                sku: linha.querySelector('.sku').innerText,
                descricao: linha.querySelector('.descricao').innerText,
                observacao: linha.querySelector('.observacao').innerText
            })
        }
    })
    return divergencias
}