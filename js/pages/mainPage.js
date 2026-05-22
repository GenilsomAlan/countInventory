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
    //salva no localStorage a informação de qual é a pagina atual, no caso main
    salvarPaginaAtual(PAGE_TYPES.MAIN)
    //insere na tag body o data-page main
    document.body.dataset.page = "main"
    //carrega o estado salvo no localStorage
    const estadoSalvo = carregarEstado()
    //verifica se há algo salvo
    if (!estadoSalvo || estadoSalvo.length === 0) {
        return
    }
    //se houver um estado salvo, pega a div responsavel pelo import do arquivo
    const mainGet = getById(IDS.mainGet)
    //verfifica se a div exste
    if (mainGet) {
        //remove a div responsavel pelo import
        removeElement(mainGet)
    }
    // altera a classe da tag body
    classBody()
    // reabre a pagina com os dados salvos anteriormente
    iniciarComEstadoSalvo(estadoSalvo)
    // ativa os efeitos da pagina
    initializeEffects()
    setUpDivergencesPage()
    saveData()
}