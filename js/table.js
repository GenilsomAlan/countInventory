import { createHeader, createTableHeader, createFooter } from "./layout.js"
import { CLASSES, IDS } from "./constants.js"
import { newElement, createLineHTML } from "./ui.js"
import { carregarEstado } from "./storage.js"
import { removeElement, getById } from "./helpers.js"

export const classBody = () =>{
    //armazena a tag body do documento
    const body = document.body
    //verifica se a tag existe
    if(body){
        // remove a classe body
        body.classList.remove("body")
        // adiciona a classe bodyTable
        body.classList.toggle("bodyTable")
    }
}

const renderLayout = () => {
    // cria os elementos usados na pagina: header, body e footer
    newElement('header', 'body', createHeader())
    newElement('main', 'body', createTableHeader())
    newElement('footer', 'body', createFooter())
}

export const createLineElement = (item, id) => {
    // pega o elemento "pai"
    const div = document.createElement("div")
    // seta um id para a linha
    div.id = `line${id}`
    // seta uma clase para a linha
    div.classList.add(CLASSES.linha)
    //seta no html o que for retornado pela função, neste caso o codigo html de como a linha será montada
    div.innerHTML = createLineHTML(item, id)
    // verfica os status da linha
    if(item.status === "true"){
        // seta a classe linhaok na linha
        div.classList.add(CLASSES.linhaOk)
    }
    // retorna o elemento criado
    return div
}

export const renderTable = (data) => {
    // pega a div que irá receber as linhas da tabela
    const container = getById(IDS.list)
    // verfifica se o container existe
    if (!container) return
    //iteração para "colar" os dados nas linhas de acordo com um indice
    data.forEach((item, index) => {
        // itera sobre o indice
        const id = index + 1
        // cria uma nova linha na tabela
        const line = createLineElement(item, id)
        // adicina o elemento criado no container
        container.appendChild(line)
    })
}

export const changeData = (json) =>{
    renderLayout()
    renderTable(json)
}

export const iniciarComEstadoSalvo = (estadoSalvo) =>{
    //paga o elemento de tag mainGet
    // const mainGet = getById(IDS.mainGet)
    // verifica se o elemento existe
    // if (mainGet) {
    // remove o elemento
    //     removeElement(mainGet)
    // }
    // altera a classe do elemento body
    classBody()
    // renderiza o layout
    renderLayout()
    //carrega o estado salvo no localStorage
    const estado = estadoSalvo
    //verifica se o estado existe
    if(!estado) return
    // renderiza os dados salvos em uma tabela
    renderTable(estado)
}

export const clearTable = () => {
    const container = document.getElementById("list")
    if (!container) return
    container.innerHTML = ""
}