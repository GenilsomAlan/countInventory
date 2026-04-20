const headerTitle = `<header><h1>Inventário</h1></header>`
const cabecalho = `<div class="cabecalho"><div class="reservado"><p>Reservado</p></div><div class="posicao"><p>Posição</p></div><div class="caixas"><p>Caixas</p></div><div class="pacotes"><p>Pacotes</p></div><div class="macos">
<p>Maços</p></div><div class="sku"><p>SKU</p></div><div class="descricao"><p>Descrição</p></div><div class="observacao"><p>Observação</p></div><div class="status"><p>Status</p></div><div class="edite"><p>Editar</p></div></div><div class="dados" id="list"></div>`
const footer = `<div class="buttonsOptions"><!--<button id="save" class="save-btn">Salvar</button>--><button id="showDivergences" class="divergences-btn">Mostrar Divergências</button></div>`


const changeData = (json) =>{
    const bodyClass = document.querySelector('body')
    if(bodyClass){
        bodyClass.classList.remove("body")
        bodyClass.classList.toggle("bodyTable")
    }

    newElement('header', 'body', headerTitle)
    newElement('main', 'body', cabecalho)
    newElement('footer', 'body', footer)

    const container = document.getElementById("list")
    let id = 1

    json.forEach(item => {

        const div = document.createElement("div")

        div.id = `line${id}`
        div.classList.add("linha")

        div.innerHTML = `
            <div class="reservado">
                <p>${item.Reservado ?? 0}</p>
            </div>

            <div class="posicao">
                <p>${item["Endereços"] ?? "-"}</p>
            </div>

            <div class="caixas" data-original="${item.Caixas ?? 0}" id="caixas${id}">
                ${item.Caixas ?? 0}
            </div>

            <div class="pacotes" data-original="${item.Pacotes}" id="pacotes${id}">
                ${item.Pacotes}
            </div>

            <div class="macos" data-original="${item["Maços"]}" id="macos${id}">
                ${item["Maços"]}
            </div>

            <div class="sku" id="sku${id}">
                ${item.Item ?? "-"}
            </div>

            <div class="descricao">
                <p>${item["Descrição"] ?? "-"}</p>
            </div>

            <div class="observacao">
                <p>${item["Observação"]}</p>
            </div>

            <div class="status">
                <button class="status-btn" id="item${id}" data-editing="false">*</button>
            </div>

            <div class="edite">
                <button class="edit-btn" id="itemID${id}" data-editing="false">Editar</button>
            </div>
        `
        container.appendChild(div)
        id++
    })
    initializeEffects()
}

const newElement = (element, father, content) => {
    const elementFather = document.querySelector(father)
    const newElementCreated = document.createElement(element)
    newElementCreated.innerHTML = content
    elementFather.appendChild(newElementCreated)
}