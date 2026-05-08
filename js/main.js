import { renderMainPage, renderSavedStatePage }from "./pages/mainPage.js"
import { limparEstado } from "./storage.js"
import { getJsonData } from "./xlsx-reader.js"
import { IDS } from "./constants.js"
import { carregarPaginaAtual } from "./storage.js"
import { PAGE_TYPES } from "./constants.js"
import { renderDivergencesPage } from "./pages/divergencesPage.js"

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = carregarPaginaAtual()
    if(currentPage === PAGE_TYPES.DIVERGENCES){
        renderDivergencesPage()
    } else {
        renderSavedStatePage()
    }
    configurarGeracaoTabela()
    configurarReset()
})

const configurarGeracaoTabela = () => { 
    const gerarBtn = document.getElementById(IDS.generate)

    if (!gerarBtn) return

    gerarBtn.addEventListener("click", () => {
        const json = getJsonData()

        if (!json) {
            alert("Importe o arquivo .xlsx")
            return
        }
        renderMainPage(json)
    })
}

const configurarReset = () => {
    document.addEventListener("click", (event) => {
        if (event.target.id !== IDS.reset) return

        limparEstado()
        window.location.reload()
    })
}