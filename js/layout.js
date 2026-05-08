import { IDS } from "./constants.js"

export const createHeader = () => {
    return `
        <header>
            <h1>Inventário</h1>
        </header>
    `
}

export const createTableHeader = () => {
    return `
        <div class="cabecalho">
            <div class="reservado">
                <p>Reservado</p>
            </div>
            <div class="posicao">
                <p>Posição</p>
            </div>
            <div class="caixas">
                <p>Caixas</p>
            </div>
            <div class="pacotes">
                <p>Pacotes</p>
            </div>
            <div class="macos">
                <p>Maços</p>
            </div>
            <div class="sku">
                <p>SKU</p>
            </div>
            <div class="descricao">
                <p>Descrição</p>
            </div>
            <div class="observacao">
                <p>Observação</p>
            </div>
            <div class="status">
                <p>Status</p>
            </div>
            <div class="edite">
                <p>Editar</p>
            </div>
        </div>
        <div class="dados" id="${IDS.list}"></div>
    `
}

export const createFooter = () => {
    return `
        <div class="buttonsOptions">
            <button id="${IDS.save}" class="save-btn" type="button">Salvar</button>
            <button id="${IDS.divergences}" class="divergences-btn">Mostrar Divergências</button>
            <button id="${IDS.reset}" class="reset-btn" type="button">Importar novo relatório</button>
        </div>
    `
}