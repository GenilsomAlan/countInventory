window.addEventListener("load", function(){
        const dados = document.getElementById("list")
        const arrayDados = [...dados.children]
        console.log(arrayDados.length)

        let id = 1

        for(id; id <= arrayDados.length; id++){
                const buttonStatus = document.getElementById(`item${id}`)
                const buttonEdit = document.getElementById(`itemID${id}`)
                const caixas = document.getElementById(`caixas${id}`)
                const pacotes = document.getElementById(`pacotes${id}`)
                const macos = document.getElementById(`macos${id}`)

                buttonStatus.addEventListener("click", () =>{
                        const styleCss = this.window.getComputedStyle(buttonStatus)
                        const buttonBkg = styleCss.backgroundColor

                        if(buttonBkg === "rgb(255, 69, 0)" || buttonBkg === "orangered"){
                                buttonStatus.style.backgroundColor = "green"
                                buttonStatus.value = 1
                        }else if(buttonBkg === "rgb(0, 128, 0)" || buttonBkg === "green"){
                                buttonStatus.style.backgroundColor = "orangered"
                                buttonStatus.value = 0
                        }                
                })

                buttonEdit.addEventListener("click", () =>{

                        const caixasEdit = buttonEdit.value
                        
                        if(caixasEdit === "true"){
                                console.log("Salvando o item de id: ", buttonEdit.id)
                                caixas.contentEditable = "false"
                                pacotes.contentEditable = "false"
                                macos.contentEditable = "false"
                                buttonEdit.innerText = "Editar"
                                buttonEdit.value = false
                        }else{
                                console.log("entrou no else", caixasEdit)
                                console.log("Alterando o item de id: ", buttonEdit.id)
                                caixas.contentEditable = "true"
                                pacotes.contentEditable = "true"
                                macos.contentEditable = "true"
                                buttonEdit.innerText = "Salvar"
                                buttonEdit.value = true
                        }
                })
        }        
})