import { createHeader, createTableHeader, createFooter } from "./layout.js"
import { CLASSES, IDS } from "./constants.js"
import { newElement, createLineHTML } from "./ui.js"
import { carregarEstado } from "./storage.js"
import { removeElement, getById } from "./helpers.js"

export const classBody = () =>{
    const body = document.body
    if(body){
        body.classList.remove("body")
        body.classList.toggle("bodyTable")
    }
}

const renderLayout = () => {
    newElement('header', 'body', createHeader())
    newElement('main', 'body', createTableHeader())
    newElement('footer', 'body', createFooter())
}

export const createLineElement = (item, id) => {
    const div = document.createElement("div")
    div.id = `line${id}`
    div.classList.add(CLASSES.linha)
    div.innerHTML = createLineHTML(item, id)
    if(item.status === "true"){
        div.classList.add(CLASSES.linhaOk)
    }
    return div
}

export const renderTable = (data) => {
    const container = getById(IDS.list)
    if (!container) return

    data.forEach((item, index) => {
        const id = index + 1
        const line = createLineElement(item, id)
        container.appendChild(line)
    })
}

export const changeData = (json) =>{
    renderLayout()
    renderTable(json)
}

export const iniciarComEstadoSalvo = () =>{
    const mainGet = getById(IDS.mainGet)

    if (mainGet) {
        removeElement(mainGet)
    }

    classBody()
    renderLayout()

    const estado = carregarEstado()
    if(!estado) return

    renderTable(estado)
}

export const clearTable = () => {
    const container = document.getElementById("list")
    if (!container) return
    container.innerHTML = ""
}