export const newElement = (element, father, content) =>{
    const elementFather = document.querySelector(father)
    const newElementCreated = document.createElement(element)

    newElementCreated.innerHTML = content

    elementFather.appendChild(newElementCreated)
}
export const createLineHTML = (item, id) =>{ 
    return `
        <div class="reservado" id="reservado${id}">
            <p>${item.Reservado ?? item.reservado ?? 0}</p>
        </div>
        <div class="posicao" id="posicao${id}">
            <p>${item["Endereços"] ?? item.posicao ?? "-"}</p>
        </div>
        <div class="caixas" data-original="${item.Caixas ?? item.originalCaixas ?? 0}" id="caixas${id}">
            ${item.Caixas ?? item.caixas ?? 0}
        </div>
        <div class="pacotes" data-original="${item.Pacotes ?? item.originalPacotes ?? 0}" id="pacotes${id}">
            ${item.Pacotes ?? item.pacotes ?? 0}
        </div>
        <div class="macos" data-original="${item["Maços"] ?? item.originalMacos ?? 0}" id="macos${id}">
            ${item["Maços"] ?? item.macos ?? 0}
        </div>
        <div class="sku" data-original="${item.originalSku ?? ""}" id="sku${id}">
            ${item.Item ?? item.sku ?? "-"}
        </div>
        <div class="descricao" id="descricao${id}">
            <p>${item["Descrição"] ?? item.descricao ?? "-"}</p>
        </div>
        <div class="observacao" id="observacao${id}">
            <p>${item["Observação"] ?? item.observacao ?? "-"}</p>
        </div>
        <div class="status">
            <button class="status-btn ${item.status === "true" ? "ativo" : ""}" id="item${id}" data-editing="${item.status ?? "false"}">
                ${item.status === "true" ? "✓" : "*"}
            </button>
        </div>
        <div class="edite">
            <button class="edit-btn" id="itemID${id}" data-editing="${item.editando ?? "false"}">
                ${item.editando === "true" ? "Salvar" : "Editar"}
            </button>
        </div>
    `
}
export const createDivergenceLine = (item, id) => {
    return `
        <div class="reservado">
            <p>${item.reservado}</p>
        </div>
        <div class="posicao">
            <p>${item.posicao}</p>
        </div>
        <div class="caixas">
            ${item.caixas}
        </div>
        <div class="pacotes">
            ${item.pacotes}
        </div>
        <div class="macos">
            ${item.macos}
        </div>
        <div class="sku">
            <p>${item.sku}</p>
        </div>
        <div class="descricao">
            <p>${item.descricao}</p>
        </div>
        <div class="observacao">
            <p>${item.observacao}</p>
        </div>
        <div class="status">
            <button class="status-btn" id="item${id}" data-editing="false">*</button>
        </div>
        <div class="edite">
            <button class="edit-btn" id="itemID${id}" data-editing="false">Editar</button>
        </div>
    `
}