const verificarEncerramentoDaContagem = () => {
    const linhas = document.querySelectorAll('.linha')
    
    return [...linhas].every(linha =>{
        const btn = linha.querySelector('.status-btn')
        return btn.classList.contains('ativo')
    })
}

const btnDivergences = document.getElementById("showDivergences")
btnDivergences.addEventListener("click", () =>{
    const divergencias = coletarDivergencias()
    const dadosContagem = getDadosContagem()

    document.body.innerHTML = htmlDivergencias()

    const container = document.getElementById("resultadoDivergencias")

    if(divergencias.length === 0){
        container.innerHTML = "<p>Não foram encontradas divergências</p>"
        return
    }

    divergencias.forEach(item =>{
        const div = document.createElement("div")
        div.classList.add("linha")

        div.innerHTML = divsItems(item)

            container.appendChild(div)

    })
})

const getDadosContagem = () => {
    const linhas = document.getElementById("list")

    console.log(linhas)
}

const coletarDivergencias = () => {
    const linhas = document.querySelectorAll('.linha')
    const divergencias = []

    linhas.forEach(linha =>{
        const caixas = linha.querySelector('.caixas')
        const pacotes = linha.querySelector('.pacotes')
        const macos = linha.querySelector('.macos')

        const originalCaixas = Number(caixas.dataset.original)
        const atualCaixas = Number(caixas.innerText)
        const originalPacotes = Number(pacotes.dataset.original)
        const atualPacotes = Number(pacotes.innerText)
        const originalMacos = Number(macos.dataset.original)
        const atualMacos = Number(macos.innerText)

        if(originalCaixas !== atualCaixas || originalPacotes !== atualPacotes || originalMacos !== atualMacos){
            divergencias.push({
                reservado: linha.querySelector('.reservado').innerText,
                posicao: linha.querySelector('.posicao').innerText, 
                caixas: atualCaixas,
                pacotes: atualPacotes,
                macos: atualMacos,
                sku: linha.querySelector('.sku').innerText,
                descricao: linha.querySelector('.descricao').innerText,
                observacao: linha.querySelector('.observacao').innerText
            })
        }
    })
    return divergencias
}
const htmlDivergencias = () => {
    return `    
     <header>
        <h1>Divergências Encontradas</h1>
    </header>

    <main>
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

        <div class="dados" id="resultadoDivergencias"></div>
    </main>
    `
}

const divsItems = (item) =>{
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

            <div class="pacotes" ">
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
                <button class="status-btn" data-editing="false">*</button>
            </div>

            <div class="edite">
                <button class="edit-btn" data-editing="false">Editar</button>
            </div>
        `
}