import { coletarDivergencias } from "../divergences.js"
import { createDivergenceLine, newElement } from "../ui.js"
import { createTableHeader } from "../layout.js"
import { initializeEffects } from "../events.js"
import { renderSavedStatePage } from "./mainPage.js"
import { carregarDivergenciasEstado, salvarDivergenciasEstate, limparDivergenciasEstado } from "../storage.js"

export const renderDivergencesPage = () => {
    document.body.dataset.page = "divergences"
    
    const divergenciasSalvas = carregarDivergenciasEstado()
    const divergencias = divergenciasSalvas && divergenciasSalvas.length > 0 ? divergenciasSalvas : coletarDivergencias()

    if(!divergenciasSalvas) salvarDivergenciasEstate(divergencias)

    document.body.innerHTML = ""

    newElement("header", "body", "<h1>Divergências Encontradas</h1>")
    newElement("main", "body", 
         `
            ${createTableHeader()}
            <div class="buttonsOptions">
                <button id="backButton">
                    Voltar
                </button>
            </div>
        `
    )

    configurarBotaoVoltar()

    const container = document.getElementById("list")

    if (!divergencias.length) {
        container.innerHTML = "<p>Não foram encontradas divergências</p>"
        return
    }

    divergencias.forEach((item, index) => {
        const div = document.createElement("div")
        div.classList.add("linha")
        div.innerHTML = createDivergenceLine(item, index + 1)
        container.appendChild(div)
    })

    initializeEffects()
    configurarBotaoVoltar()
}

const criarBotaoVoltar = () => {
    const footer = document.createElement("footer")
    footer.innerHTML = `
        <div class="buttonsOptions">
            <button id="backButton" class="save-btn" type="button">
                Voltar ao Relatório
            </button>
        </div>
    `
    document.body.appendChild(footer)
}

const configurarBotaoVoltar = () => {
    const backButton = document.getElementById("backButton")
    if (!backButton) return

    backButton.addEventListener("click", () => {
        document.body.innerHTML = ""
        renderSavedStatePage()
    })
}