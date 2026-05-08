import { renderTable, clearTable } from "./table.js"
import { initializeEffects } from "./events.js"
import { IDS } from "./constants.js"
import { getById } from "./helpers.js"
import { renderDivergencesPage } from "./pages/divergencesPage.js"

export const coletarDivergencias = () => {
    const linhas = document.querySelectorAll('.linha')
    const divergencias = []

    linhas.forEach(linha =>{
        const caixas = linha.querySelector('.caixas')
        const pacotes = linha.querySelector('.pacotes')
        const macos = linha.querySelector('.macos')

        const originalCaixas = Number(caixas.dataset.original) || 0
        const atualCaixas = Number(caixas.innerText) || 0
        const originalPacotes = Number(pacotes.dataset.original) || 0
        const atualPacotes = Number(pacotes.innerText) || 0
        const originalMacos = Number(macos.dataset.original) || 0
        const atualMacos = Number(macos.innerText) || 0

        const hasDivergence = originalCaixas !== atualCaixas || originalPacotes !== atualPacotes || originalMacos !== atualMacos

        if(!hasDivergence) return

        divergencias.push({
            reservado: linha.querySelector('.reservado').innerText,
            posicao: linha.querySelector('.posicao').innerText, 
            caixas: atualCaixas,
            pacotes: atualPacotes,
            macos: atualMacos,
            sku: linha.querySelector('.sku').innerText,
            descricao: linha.querySelector('.descricao').innerText,
            observacao: linha.querySelector('.observacao').innerText,
            originalCaixas,
            originalPacotes,
            originalMacos
        })
    })
    return divergencias
}
export const setUpDivergencesPage = () =>{
    const btn = getById(IDS.divergences)
    if(!btn) return
    btn.addEventListener("click", () =>{
        renderDivergencesPage()
    })
}
const handleDivergences = () => {
    const divergences = coletarDivergencias()
    clearTable()
    if(divergences.length === 0){
        renderEmptyMensage()
        return
    }
    renderTable(divergences)
    initializeEffects()
}
const renderEmptyMensage = () => {
    const container = getById(IDS.list)
    if(!container) return
    container.innerHTML = "<p>Nenhuma divergência encontrada</p>"
}