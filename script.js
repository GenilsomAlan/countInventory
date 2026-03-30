window.addEventListener("load", function(){
        const dados = document.getElementById("list")
        const arrayDados = [...dados.children]
        console.log(arrayDados.length)

        let id = 1

        for(id; id <= arrayDados.length; id++){
                const itemOne = document.getElementById(`item${id}`)

                itemOne.addEventListener("click", () =>{
                        const styleCss = this.window.getComputedStyle(itemOne)
                        const buttonBkg = styleCss.backgroundColor

                        if(buttonBkg === "rgb(255, 69, 0)" || buttonBkg === "orangered"){
                                itemOne.style.backgroundColor = "green"
                                itemOne.value = 1
                        }else if(buttonBkg === "rgb(0, 128, 0)" || buttonBkg === "green"){
                                itemOne.style.backgroundColor = "orangered"
                                itemOne.value = 0
                        }                
                })
        }

        
})