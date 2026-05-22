import { renderMainPage, renderSavedStatePage }from "./pages/mainPage.js"
import { limparDivergenciasEstado, limparEstado } from "./storage.js"
import { getJsonData } from "./xlsx-reader.js"
import { IDS } from "./constants.js"
import { carregarPaginaAtual } from "./storage.js"
import { PAGE_TYPES } from "./constants.js"
import { renderDivergencesPage } from "./pages/divergencesPage.js"

//Event listener executa a função anonima assim que a pagina finaliza o carregamento
document.addEventListener("DOMContentLoaded", () => {
    //armazena o valor retornado da função atribuida
    const currentPage = carregarPaginaAtual()
    //se a pagina for a de divergencias irá renderizar a pagina de divergencias
    if(currentPage === PAGE_TYPES.DIVERGENCES){
        renderDivergencesPage()
    } else {
        renderSavedStatePage()
    }
    configurarGeracaoTabela()
    initializeGlobalEvents()
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
const initializeGlobalEvents = () => {
    document.addEventListener("click", handleGlobalClick)
}
const handleGlobalClick = (event) => {
    const target = event.target
    if(target.id === IDS.reset){
        limparEstado()
        limparDivergenciasEstado()
        localStorage.removeItem("currentPage")
        window.location.reload()
    }
}