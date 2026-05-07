const headerTitle = `<header><h1>Inventário</h1></header>`
const cabecalho = `<div class="cabecalho"><div class="reservado"><p>Reservado</p></div><div class="posicao"><p>Posição</p></div><div class="caixas"><p>Caixas</p></div><div class="pacotes"><p>Pacotes</p></div><div class="macos">
    <p>Maços</p></div><div class="sku"><p>SKU</p></div><div class="descricao"><p>Descrição</p></div><div class="observacao"><p>Observação</p></div><div class="status"><p>Status</p></div><div class="edite"><p>Editar</p></div></div><div class="dados" id="list"></div>`
const footer = `<div class="buttonsOptions"><button id="save" class="save-btn" type="button">Salvar</button><button id="showDivergences" class="divergences-btn">Mostrar Divergências</button><button id="reset" class="reset-btn" type="button" onclick="resetPage()">Importar novo relatório</button></div>`
const line = (item, id) =>{ 
    return `<div class="reservado"><p>${item.Reservado ?? 0}</p></div><div class="posicao"><p>${item["Endereços"] ?? "-"}</p></div><div class="caixas" data-original="${item.Caixas ?? 0}" id="caixas${id}">${item.Caixas ?? 0}</div>
    <div class="pacotes" data-original="${item.Pacotes ?? 0}" id="pacotes${id}">${item.Pacotes ?? 0}</div><div class="macos" data-original="${item["Maços"] ?? 0}" id="macos${id}">${item["Maços"] ?? 0}</div><div class="sku" id="sku${id}">${item.Item ?? "-"}</div>
    <div class="descricao"><p>${item["Descrição"] ?? "-"}</p></div><div class="observacao"><p>${item["Observação"]}</p></div><div class="status"><button class="status-btn" id="item${id}" data-editing="false">*</button></div>
    <div class="edite"><button class="edit-btn" id="itemID${id}" data-editing="false">Editar</button></div>`
}
const htmlDivergencias = () => {
    return `<header><h1>Divergências Encontradas</h1></header><main><div class="cabecalho"><div class="reservado"><p>Reservado</p></div><div class="posicao"><p>Posição</p></div><div class="caixas"><p>Caixas</p></div><div class="pacotes"><p>Pacotes</p>
    </div><div class="macos"><p>Maços</p></div><div class="sku"><p>SKU</p></div><div class="descricao"><p>Descrição</p></div><div class="observacao"><p>Observação</p></div><div class="status"><p>Status</p></div><div class="edite"><p>Editar</p></div></div>
    <div class="dados" id="resultadoDivergencias"></div></main>`
}
const divsItems = (item, id) =>{
    return `<div class="reservado"><p>${item.reservado}</p></div><div class="posicao"><p>${item.posicao}</p></div><div class="caixas" data-original="${item.originalCaixas}">${item.caixas}</div><div class="pacotes" data-original="${item.originalPacotes}">${item.pacotes}</div><div class="macos" data-original="${item.originalMacos}">${item.macos}</div><div class="sku" data-original="${item.originalSku}">
    <p>${item.sku}</p></div><div class="descricao"><p>${item.descricao}</p></div><div class="observacao"><p>${item.observacao}</p></div><div class="status"><button class="status-btn" id="item${id}" data-editing="false">*</button></div><div class="edite"><button class="edit-btn" id="itemID${id}" data-editing="false">Editar</button></div>`
}
const changeData = (json) =>{
    newElement('header', 'body', headerTitle)
    newElement('main', 'body', cabecalho)
    newElement('footer', 'body', footer)

    setUpDivergencesPage()

    const container = document.getElementById("list")   

    json.forEach((item, index) => {
        const id = index + 1
        const div = document.createElement("div")

        div.id = `line${id}`
        div.classList.add("linha")

        div.innerHTML = line(item, id)

        container.appendChild(div)
    })
}
const setUpDivergencesPage = () =>{
    const btnDivergences = document.getElementById("showDivergences")//

    if(!btnDivergences) return

    btnDivergences.addEventListener("click", () =>{
        const divergencias = coletarDivergencias()

        // document.body.innerHTML = htmlDivergencias()
        // const main = document.querySelector("main")
        // main.innerHTML = htmlDivergencias()
        const listContainer = document.getElementById("list")
        listContainer.innerHTML = ""

        const container = document.getElementById("list") || document.getElementById("resultadoDivergencias")

        if(divergencias.length === 0){
            container.innerHTML = "<p>Não foram encontradas divergências</p>"
            return
        }

        divergencias.forEach((item, index) => {
            const id = index + 1
            const div = document.createElement("div")
            div.classList.add("linha")

            div.innerHTML = divsItems(item, id)

                container.appendChild(div)
        })

        setTimeout(() => {
            initializeEffects()
        }, 0)

    })
}
const newElement = (element, father, content) => {
    const elementFather = document.querySelector(father)
    const newElementCreated = document.createElement(element)
    newElementCreated.innerHTML = content
    elementFather.appendChild(newElementCreated)
}
const verificarEncerramentoDaContagem = () => {
    const linhas = document.querySelectorAll('.linha')
    
    return [...linhas].every(linha =>{
        const btn = linha.querySelector('.status-btn')
        return btn.dataset.editing === "true"
    })
}
const saveData = () =>{
    const saveBtn = document.getElementById('save')
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault()
        printBtn('list')
    })
}
const coletarDivergencias = () => {
    const linhas = document.querySelectorAll('.linha')
    const divergencias = []

    linhas.forEach(linha =>{
        const caixas = linha.querySelector('.caixas')
        const pacotes = linha.querySelector('.pacotes')
        const macos = linha.querySelector('.macos')

        const originalCaixas = Number(caixas.dataset.original) || 0
        const atualCaixas = Number(caixas.innerText) || 0
        const originalPacotes = Number(pacotes.dataset.original) || 0
        const atualPacotes = Number(pacotes.innerText) || 0
        const originalMacos = Number(macos.dataset.original) || 0
        const atualMacos = Number(macos.innerText) || 0
        

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
 const removeElement = (element) =>{
    element.remove()
}
const inputBTN = document.getElementById("input-btn")
let json
inputBTN.addEventListener("change", (event) => {
    const archive = event.target.files[0]

    if(!archive) return

    const reader = new FileReader()
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, {type: "array"})
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        json = XLSX.utils.sheet_to_json(sheet, { defval: ""})
        // console.log(json)
    }
    reader.readAsArrayBuffer(archive)
})
const gerarTabela = document.getElementById("gerar")
const mainGetDT = document.getElementById("mainGet")
gerarTabela.addEventListener('click', () =>{
    if(json){
        removeElement(mainGetDT)
        classBody()
        changeData(json)
        restaurarEstado()
        initializeEffects()
        saveData()
    }else{
        alert("Importe o arquivo .xlsx")
    }
})
const salvarEstado = () =>{
    const estado = capturaEstadoAtual()

    // console.log("salvando: ", estado)

    localStorage.setItem("inventarioEstado", JSON.stringify(estado))
}
const limparEstado = () =>{
    localStorage.removeItem("inventarioEstado")
}
const printBtn = (id) =>{
    const element = document.getElementById(id) || document.getElementById("resultadoDivergencias")

    if(!element){
        console.error("Conteúdo para impressão não encontrado")
        return
    }

    const conteudo = element.innerHTML

    const styles = Array.from(
        document.querySelectorAll("style, link[rel='stylesheet']")
    ).map(el => el.outerHTML).join("")

    const win = window.open('', '', 'height=700,width=900')

    win.document.write(`
        <html>
            <head>
                <title>Relatório de Inventário</title>
                ${styles}
                <style>
                    body { padding: 20px; }
                    footer { margin-top: 20px}
                </style>
            </head>
            <body>
                <header id="cabecalhoPrint"><p>Relatório de contagem de Estoque -------- ${day()}</p></header>
                ${cabecalho}
                ${conteudo}
                <footer><p>Hora início:_____ Hora fim:______ Ass Responsavel:______________ Ass Conferente:______________ </p></footer>
            </body>
        </html>
    `)

    win.document.close()
    win.focus()

    setTimeout(() => {
        win.print()
        win.close()
    }, 500)
}
const day = () =>{
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = String(data.getFullYear())
    return  `${dia}/${mes}/${ano}`
}
const capturaEstadoAtual = () =>{
    const linhas = document.querySelectorAll('.linha')
    const estado = []

    linhas.forEach((linha, index) => {
        const id = index + 1

        estado.push({
            id,
            caixas: document.getElementById(`caixas${id}`).innerHTML,
            pacotes: document.getElementById(`pacotes${id}`).innerHTML,
            macos: document.getElementById(`macos${id}`).innerHTML,
            sku: document.getElementById(`sku${id}`).innerHTML,
            status: document.getElementById(`item${id}`).dataset.editing,
            reservado: linha.querySelector('.reservado').innerText,
            posicao: linha.querySelector('.posicao').innerText,
            descricao: linha.querySelector('.descricao').innerText,
            observacao: linha.querySelector('.observacao').innerText,
            editando: linha.querySelector('.edit-btn').dataset.editing,
            originalCaixas: linha.querySelector('.caixas').dataset.original,
            originalPacotes: linha.querySelector('.pacotes').dataset.original,
            originalMacos: linha.querySelector('.macos').dataset.original,
            originalSku: linha.querySelector('.sku').dataset.original
        })
    })
    return estado   
}
const carregarEstado = () =>{
    const salvo = localStorage.getItem("inventarioEstado")

    if(!salvo) return

    return JSON.parse(salvo)
}
const restaurarEstado = () =>{
    const estado = carregarEstado()
    if(!estado) return

    estado.forEach(item =>{
        const id = item.id

        document.getElementById(`caixas${id}`).innerHTML = item.caixas
        document.getElementById(`pacotes${id}`).innerHTML = item.pacotes
        document.getElementById(`macos${id}`).innerHTML = item.macos
        document.getElementById(`sku${id}`).innerHTML = item.sku
        document.getElementById(`reservado${id}`).innerHTML = item.reservado
        document.getElementById(`posicao${id}`).innerHTML = item.posicao
        document.getElementById(`descricao${id}`).innerHTML = item.descricao
        document.getElementById(`observacao${id}`).innerHTML = item.observacao

        const btn = document.getElementById(`item${id}`)
        const line = document.getElementById(`line${id}`)
        const editBtn = document.getElementById(`itemID${id}`)

        if(item.editando === "true"){
            line.classList.add("linha-editing")

            const caixas = document.getElementById(`caixas${id}`)
            const pacotes = document.getElementById(`pacotes${id}`)
            const macos = document.getElementById(`macos${id}`)
            const sku = document.getElementById(`sku${id}`)

            caixas.contentEditable = true
            pacotes.contentEditable = true
            macos.contentEditable = true
            sku.contentEditable = true

            editBtn.innerHTML = "Salvar"
            editBtn.dataset.editing = "true"
        }

        if(item.status === "true"){
            btn.classList.add("ativo")
            line.classList.add("linha-ok")
            btn.innerHTML = "&#10003;"
            btn.dataset.editing = "true"
        }
    })
}
document.addEventListener("DOMContentLoaded", () =>{
    const estadoSalvo = carregarEstado()

    if(estadoSalvo && estadoSalvo.length > 0){
        iniciarComEstadoSalvo()
    }
})
const iniciarComEstadoSalvo = () => {
    const mainGet = document.getElementById("mainGet")

    if (mainGet) {
        removeElement(mainGet)
    }

    classBody()

    newElement('header', 'body', headerTitle)
    newElement('main', 'body', cabecalho)
    newElement('footer', 'body', footer)

    const container = document.getElementById("list")

    const estado = carregarEstado()

    estado.forEach(item => {
        const div = document.createElement("div")

        div.id = `line${item.id}`
        div.classList.add("linha")

        div.innerHTML = `
            <div class="reservado" id="reservado${item.id}">${item.reservado}</div>
            <div class="posicao" id="posicao${item.id}">${item.posicao}</div>
            <div class="caixas" data-original="${item.originalCaixas}" id="caixas${item.id}">${item.caixas}</div>
            <div class="pacotes" data-original="${item.originalPacotes}" id="pacotes${item.id}">${item.pacotes}</div>
            <div class="macos" data-original="${item.originalMacos}" id="macos${item.id}">${item.macos}</div>
            <div class="sku" data-original="${item.originalSku}" id="sku${item.id}">${item.sku}</div>
            <div class="descricao" id="descricao${item.id}">${item.descricao}</div>
            <div class="observacao" id="observacao${item.id}">${item.observacao}</div>
            <div class="status">
                <button class="status-btn ${item.status === "true" ? "ativo" : ""}" 
                        id="item${item.id}" 
                        data-editing="${item.status}">
                    ${item.status === "true" ? "&#10003;" : "*"}
                </button>
            </div>
            <div class="edite">
                <button class="edit-btn" id="itemID${item.id}" data-editing="false">
                    Editar
                </button>
            </div>
        `

        if(item.status === "true"){
            div.classList.add("linha-ok")
        }

        container.appendChild(div)
    })

    initializeEffects()
    setUpDivergencesPage()
    saveData()
}
const resetPage = () =>{
        limparEstado()
        window.location.reload()
}
const back = (dataJson) =>{
    changeData(dataJson)
    initializeEffects()
}