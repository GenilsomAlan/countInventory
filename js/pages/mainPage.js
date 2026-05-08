import { changeData, classBody, iniciarComEstadoSalvo } from "../table.js"
import { restaurarEstado, carregarEstado } from "../storage.js"
import { initializeEffects } from "../events.js"
import { saveData } from "../saveData.js"
import { setUpDivergencesPage } from "../divergences.js"
import { getById, removeElement } from "../helpers.js"
import { IDS } from "../constants.js"
import { salvarPaginaAtual } from "../storage.js"
import { PAGE_TYPES } from "../constants.js"

export const renderMainPage = (json) => {
    salvarPaginaAtual(PAGE_TYPES.MAIN)
    document.body.dataset.page = "main"
    const mainGet = getById(IDS.mainGet)

    if(mainGet) {
        removeElement(mainGet)
    }

    classBody()
    changeData(json)
    restaurarEstado()
    initializeEffects()
    setUpDivergencesPage()
    saveData()
}

export const renderSavedStatePage = () => {
    salvarPaginaAtual(PAGE_TYPES.MAIN)
    document.body.dataset.page = "main"
    const estadoSalvo = carregarEstado()

    if (!estadoSalvo ||
        estadoSalvo.length === 0) {
        return
    }

    const mainGet = getById(IDS.mainGet)

    if (mainGet) {
        removeElement(mainGet)
    }

    classBody()
    iniciarComEstadoSalvo()
    initializeEffects()
    setUpDivergencesPage()
    saveData()
}