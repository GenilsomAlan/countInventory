initializeEffects = () =>{
        const dados = document.getElementById("list") || document.getElementById("resultadoDivergencias")

        if(!dados || !dados.children.length) return

        const arrayDados = [...dados.children]
        arrayDados.forEach((linha, index) =>{
                const id = index + 1

                const buttonStatus = linha.querySelector(".status-btn")
                const buttonEdit = linha.querySelector(".edit-btn")
                const caixas = linha.querySelector(".caixas")
                const pacotes = linha.querySelector(".pacotes")
                const macos = linha.querySelector(".macos")
                const line = linha
                const sku = linha.querySelector(".sku")
                const divergencesBtn = document.getElementsByClassName("divergences-btn")[0]
                const save_btn = document.getElementById("save")

                if(divergencesBtn && save_btn){
                        divergencesBtn.disabled = true
                        save_btn.disabled = true
                }

                buttonStatus.addEventListener("click", () =>{
                        if(buttonEdit.dataset.editing === "true"){
                                alert("Salve as alterações antes de mudar o status")
                                return
                        }

                        buttonStatus.classList.toggle("ativo")
                        line.classList.toggle("linha-ok")

                        if(buttonStatus.classList.contains("ativo")){
                                buttonStatus.innerHTML = "&#10003;"
                                buttonStatus.dataset.editing = "true"
                        }else{
                                buttonStatus.innerHTML = "*"
                                buttonStatus.dataset.editing = "false"
                        }

                        salvarEstado()

                        if(divergencesBtn && save_btn && verificarEncerramentoDaContagem()){
                                divergencesBtn.classList.add("divergences-btn-ativo")
                                save_btn.classList.add("save-btn-ativo")
                                divergencesBtn.disabled = false
                                save_btn.disabled = false
                                return
                        }
                        if(divergencesBtn && save_btn){
                                divergencesBtn.classList.remove("divergences-btn-ativo")
                                save_btn.classList.remove("save-btn-ativo")
                                divergencesBtn.disabled = true
                                save_btn.disabled = true
                        }

                        salvarEstado()
                })

                if(divergencesBtn && save_btn){
                        divergencesBtn.disabled = true
                        save_btn.disabled = true
                }

                buttonEdit.addEventListener("click", () =>{
                        if(buttonStatus.dataset.editing === "true"){
                                alert("Desative o status antes de editar")
                                return
                        }

                        const editing = buttonEdit.dataset.editing === "true"

                        if(editing){
                                caixas.contentEditable = false
                                pacotes.contentEditable = false
                                macos.contentEditable = false
                                sku.contentEditable = false

                                buttonEdit.innerText = "Editar"
                                buttonEdit.dataset.editing = "false"

                                line.classList.remove("linha-editing")
                                salvarEstado()
                        }else{
                                caixas.contentEditable = true
                                pacotes.contentEditable = true
                                macos.contentEditable = true
                                sku.contentEditable = true

                                buttonEdit.innerText = "Salvar"
                                buttonEdit.dataset.editing = "true"

                                line.classList.add("linha-editing")
                        }
                })
        })
}
const classBody = () =>{
    const bodyClass = document.querySelector('body')
    if(bodyClass){
        bodyClass.classList.remove("body")
        bodyClass.classList.toggle("bodyTable")
    }
}