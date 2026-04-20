initializeEffects = () =>{
        const dados = document.getElementById("list")
        const arrayDados = [...dados.children]
        arrayDados.forEach((linha, index) =>{
                const id = index + 1

                const buttonStatus = document.getElementById(`item${id}`)
                const buttonEdit = document.getElementById(`itemID${id}`)
                const caixas = document.getElementById(`caixas${id}`)
                const pacotes = document.getElementById(`pacotes${id}`)
                const macos = document.getElementById(`macos${id}`)
                const line = document.getElementById(`line${id}`)
                const sku = document.getElementById(`sku${id}`)
                const divergencesBtn = document.getElementsByClassName("divergences-btn")[0]
                
                divergencesBtn.disabled = true

                buttonStatus.addEventListener("click", () =>{
                        if(buttonEdit.dataset.editing === "true"){
                                alert("Salve as alterações antes de mudar o status")
                                return
                        }

                        buttonStatus.classList.toggle("ativo")
                        line.classList.toggle("linha-ok")

                        if(buttonStatus.classList.contains("ativo")){
                                buttonStatus.innerText = "OK"
                                buttonStatus.dataset.editing = "true"
                        }else{
                                buttonStatus.innerText = "*"
                                buttonStatus.dataset.editing = "false"
                        }

                        if(verificarEncerramentoDaContagem()){
                                divergencesBtn.classList.add("divergences-btn-ativo")
                                divergencesBtn.disabled = false
                                return
                        }
                        divergencesBtn.classList.remove("divergences-btn-ativo")
                })
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
