initializeEffects = () =>{
        const dados = document.getElementById("list")
        const arrayDados = [...dados.children]
        for(let id = 1; id <= arrayDados.length; id++){
                const buttonStatus = document.getElementById(`item${id}`)
                const buttonEdit = document.getElementById(`itemID${id}`)
                const caixas = document.getElementById(`caixas${id}`)
                const pacotes = document.getElementById(`pacotes${id}`)
                const macos = document.getElementById(`macos${id}`)
                const line = document.getElementById(`line${id}`)

                buttonStatus.addEventListener("click", () =>{
                        if(buttonEdit.value === "true"){
                                alert("Salve as alterações antes de mudar o status")
                        }else{
                                const styleCssButton = window.getComputedStyle(buttonStatus)
                                const styleColorLine = window.getComputedStyle(line)
                                defineColor(styleCssButton.backgroundColor, "rgb(255, 69, 0)", "rgb(6, 185, 6)", buttonStatus)
                                defineColor(styleColorLine.backgroundColor, "rgb(255, 255, 255)", "rgb(79, 253, 79)", line)
                                defineTextEndValueButton(buttonStatus)
                        }
                })
                buttonEdit.addEventListener("click", () =>{
                        if(buttonStatus.innerText === "OK"){
                                alert("Desative o status antes de editar")
                        }else{
                                editItems(buttonEdit, caixas)
                                editItems(buttonEdit, pacotes)
                                editItems(buttonEdit, macos)
                                defineColor(window.getComputedStyle(line).backgroundColor, "rgb(255, 255, 255)", "rgb(187, 191, 187)", line)
                        }                
                })
        }
}
defineColor = (color, newColorValue0, newColorValue1, elementt) =>{
         if(color === newColorValue0){
                elementt.style.backgroundColor = newColorValue1
        }else if(color === newColorValue1){
                elementt.style.backgroundColor = newColorValue0
        }
}
defineTextEndValueButton = (button) =>{
        if(button.innerText === "*"){
                button.innerText = "OK"
                button.dataset.editing = 1
        }else if(button.innerText === "OK"){
                button.innerText = "*"
                button.dataset.editing = 0
        }
}
editItems = (buttonEdit, item) =>{
         if(item.contentEditable === "true"){
                console.log("Salvando o item de id: ", buttonEdit.id)
                item.contentEditable = "false"
                buttonEdit.innerText = "Editar"
                buttonEdit.value = "false"
        }else{
                console.log("Alterando o item de id: ", buttonEdit.id)
                item.contentEditable = "true"
                buttonEdit.innerText = "Salvar"
                buttonEdit.value = "true"
        }
}