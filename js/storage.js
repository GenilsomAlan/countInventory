import { CLASSES } from "./constants.js"

const STORAGE_KEY = "inventarioEstado"

export const salvarEstado = () =>{
    const estado = capturaEstadoAtual()

    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado))
}
export const carregarEstado = () =>{
    const salvo = localStorage.getItem(STORAGE_KEY)

    if(!salvo) return

    return JSON.parse(salvo)
}
export const limparEstado = () =>{
    localStorage.removeItem(STORAGE_KEY)
}
export const capturaEstadoAtual = () =>{
    const linhas = document.querySelectorAll('.linha')
    return [...linhas].map(getLineData)
}
const getLineData = (linha, index) =>{
    const id = index + 1
    const caixas = linha.querySelector(".caixas")
    const pacotes = linha.querySelector(".pacotes")
    const macos = linha.querySelector(".macos")
    const sku = linha.querySelector(".sku")
    const statusBtn = linha.querySelector(".status-btn")
    const editBtn = linha.querySelector(".edit-btn")
    return {
        id,
        caixas: caixas.innerHTML,
        pacotes: pacotes.innerHTML,
        macos: macos.innerHTML,
        sku: sku.innerHTML,
        status: statusBtn.dataset.editing,
        reservado: linha.querySelector('.reservado').innerText,
        posicao: linha.querySelector('.posicao').innerText,
        descricao: linha.querySelector('.descricao').innerText,
        observacao: linha.querySelector('.observacao').innerText,
        editando: editBtn.dataset.editing,
        originalCaixas: caixas.dataset.original,
        originalPacotes: pacotes.dataset.original,
        originalMacos: macos.dataset.original,
        originalSku: sku.dataset.original
    }
}
export const restaurarEstado = () =>{
    const estado = carregarEstado()
    if(!estado) return
    estado.forEach(restoreLineState)
}
const restoreLineState = (item) =>{
    const id = item.id
    setContent(`caixas${id}`, item.caixas)
    setContent(`pacotes${id}`, item.pacotes)
    setContent(`macos${id}`, item.macos)
    setContent(`sku${id}`, item.sku)
    setContent(`reservado${id}`, item.reservado)
    setContent(`posicao${id}`, item.posicao)
    setContent(`descricao${id}`, item.descricao)
    setContent(`observacao${id}`, item.observacao)

    const line = document.getElementById(`line${id}`)
    const statusBtn = document.getElementById(`item${id}`)
    const editBtn = document.getElementById(`itemID${id}`)

    if(item.editando === "true"){
        setEditableState(line, editBtn, true)
    }

    if(item.status === "true"){
        setEditableState(line, statusBtn, false)
    }
}
const setContent = (id, value) =>{
    const element = document.getElementById(id)
    if(!element) return
    element.innerHTML = value
}
const setEditableState = (line, button, editing) =>{
    const editableFields = [".caixas", ".pacotes", ".macos", ".sku"]
    editableFields.forEach((selector) => {
        const field = line.querySelector(selector)
        field.contentEditable = editing
    })
    button.innerHTML = editing ? "Salvar" : "Editar"
    button.dataset.editing = editing

    line.classList.toggle(CLASSES.editing, editing)
}
const setStatusState = (line, button, active) =>{
    button.innerHTML = active ? "&#10003;" : "*"
    button.dataset.editing = active
    button.classList.toggle(CLASSES.ativo, active)
    line.classList.toggle(CLASSES.linhaOk, active)
}
export const salvarDivergenciasEstate = (estado) =>{
    localStorage.setItem("divergenciasEstado", JSON.stringify(estado))
}
export const carregarDivergenciasEstado = () =>{
    const estado = localStorage.getItem("divergenciasEstado")
    if(!estado) return
    return JSON.parse(estado)
}
export const limparDivergenciasEstado = () =>{
    localStorage.removeItem("divergenciasEstado")
}