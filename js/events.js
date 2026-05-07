import { salvarEstado } from "./storage.js"
import { verificarEncerramentoDaContagem } from "./utils.js"
import { IDS, CLASSES } from "./constants.js"
import { getById } from "./helpers.js"

export const initializeEffects = () =>{
        const container = getById(IDS.list) || getById(IDS.resultadoDivergencias)

        if(!container) return

        if(container.dataset.listener === "true") return
        container.addEventListener("click", handleClick)
        container.dataset.listener = "true"
        updateButtonsState()
}
const handleClick = (event) =>{
        const target = event.target

        if(target.classList.contains("status-btn")){
                toggleStatus(target)
                return
        }

        if(target.classList.contains("edit-btn")){
                toggleEdit(target)
                return
        }
}
const toggleStatus = (buttonStatus) =>{
        const line = buttonStatus.closest(".linha")
        const buttonEdit = line.querySelector(".edit-btn")

        if(buttonEdit.dataset.editing === "true"){
                alert("Salve as alterações antes de mudar o status")
                return
        }

        buttonStatus.classList.toggle(CLASSES.ativo)
        line.classList.toggle(CLASSES.linhaOk)

        const ativo = buttonStatus.classList.contains(CLASSES.ativo)

        buttonStatus.innerHTML = ativo ? "&#10003;" : "*"
        buttonStatus.dataset.editing = ativo ? "true" : "false"

        salvarEstado()
        updateButtonsState()
}
const toggleEdit = (buttonEdit) =>{
        const line = buttonEdit.closest(".linha")
        const buttonStatus = line.querySelector(".status-btn")

        if(buttonStatus.dataset.editing === "true"){
                alert("Desative o status antes de editar")
                return
        }

        const editing = buttonEdit.dataset.editing === "true"

        if(editing){
                disableEdition(line, buttonEdit)
        }else{
                enableEdition(line, buttonEdit)
        }
        salvarEstado()
}
const enableEdition = (line, buttonEdit) =>{
        setEditable(line, true)
        buttonEdit.innerText = "Salvar"
        buttonEdit.dataset.editing = "true"
        line.classList.add(CLASSES.editing)
}
const disableEdition = (line, buttonEdit) =>{
        setEditable(line, false)
        buttonEdit.innerText = "Editar"
        buttonEdit.dataset.editing = "false"
        line.classList.remove(CLASSES.editing)
}
const setEditable = (line, editable) =>{
        const caixas = line.querySelector(".caixas")
        const pacotes = line.querySelector(".pacotes")
        const macos = line.querySelector(".macos")
        const sku = line.querySelector(".sku")

        caixas.contentEditable = editable
        pacotes.contentEditable = editable
        macos.contentEditable = editable
        sku.contentEditable = editable
}
const updateButtonsState = () =>{
        const divergencesBtn = document.querySelector(".divergences-btn")
        const saveBtn = getById(IDS.save)

        if (!divergencesBtn || !saveBtn) return

        const completed = verificarEncerramentoDaContagem()
        divergencesBtn.disabled = !completed
        saveBtn.disabled = !completed
        divergencesBtn.classList.toggle("divergences-btn-ativo", completed)
        saveBtn.classList.toggle("save-btn-ativo", completed)
}