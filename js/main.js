import { changeData, classBody, iniciarComEstadoSalvo } from "./table.js"
import { initializeEffects } from "./events.js"
import { restaurarEstado, carregarEstado, limparEstado } from "./storage.js"
import { saveData } from "./saveData.js"
import { setUpDivergencesPage } from "./divergences.js"
import { getById, removeElement } from "./helpers.js"
import { IDS } from "./constants.js"
import { getJsonData } from "./xlsx-reader.js"

const gerarTabelaBtn = getById(IDS.generate)
const mainGet = getById(IDS.mainGet)

document.addEventListener("DOMContentLoaded", () => {
    verificarEstadoSalvo()
    configurarGeracaoTabela()
    configurarReset()
})

const verificarEstadoSalvo = () => {
    const estadoSalvo = carregarEstado()

    if (!estadoSalvo || estadoSalvo.length === 0) return

    iniciarAplicacaoComEstado()
}

const iniciarAplicacaoComEstado = () => {
    if (mainGet) {
        removeElement(mainGet)
    }

    classBody()
    iniciarComEstadoSalvo()
    initializeEffects()
    setUpDivergencesPage()
    saveData()
}

const configurarGeracaoTabela = () => {
    if (!gerarTabelaBtn) return

    gerarTabelaBtn.addEventListener("click", () => {
        const json = getJsonData()
        if (!json) {
            alert("Importe o arquivo .xlsx")
            return
        }
        iniciarNovaTabela(json)
    })
}

const iniciarNovaTabela = (json) => {
    if (mainGet) {
        removeElement(mainGet)
    }

    classBody()
    changeData(json)
    restaurarEstado()
    initializeEffects()
    setUpDivergencesPage()
    saveData()
}

const configurarReset = () => {
    document.addEventListener("click", (event) => {
        const target = event.target
        if (target.id !== IDS.reset) return

        limparEstado()
        window.location.reload()
    })
}