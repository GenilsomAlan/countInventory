fetch('betha.json')
.then(response => response.json())
.then(data => {
    let id = 1
    const container = document.getElementById("list")
    //console.log(data)
    //console.log(data[0])
    data.forEach(item => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="reservado">
                <p>${item["Resv.Normal"]}</p>
            </div>
            <div class="posicao">
                <p>${item.Endereco}</p>
            </div>
            <div class="caixas" id="caixas${id}">
                <p>${item["Dispon.Exped."]}</p>
            </div>
            <div class="pacotes" id="pacotes${id}">
                <p>${0}</p>
            </div>
            <div class="macos" id="macos${id}">
                <p>${0}</p>
            </div>
            <div class="sku">
                <p>${item.SKU}</p>
            </div>
            <div class="descricao">
                <p>${item.Descricao}</p>
            </div>
            <div class="observacao">
                <p>${"OK"}</p>
            </div>
            <div class="status">
                <button class="status-btn" id="item${id}" value=0>OK</button>
            </div>
            <div class="edite">
                <button class="edit-btn" id="itemID${id}" value=false>Editar</button>
            </div>
        `
        id = id + 1
        container.appendChild(div)        
    });
})
.catch(error => console.error("Erro: ", error));
