const headerTitle = `<header><h1>Inventário</h1></header>`
const cabecalho = `<div class="cabecalho"><div class="reservado"><p>Reservado</p></div><div class="posicao"><p>Posição</p></div><div class="caixas"><p>Caixas</p></div><div class="pacotes"><p>Pacotes</p></div><div class="macos">
    <p>Maços</p></div><div class="sku"><p>SKU</p></div><div class="descricao"><p>Descrição</p></div><div class="observacao"><p>Observação</p></div><div class="status"><p>Status</p></div><div class="edite"><p>Editar</p></div></div><div class="dados" id="list"></div>`
const footer = `<div class="buttonsOptions"><button id="save" class="save-btn">Salvar</button><button id="showDivergences" class="divergences-btn">Mostrar Divergências</button></div>`
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
const divsItems = (item) =>{
    return `<div class="reservado"><p>${item.reservado}</p></div><div class="posicao"><p>${item.posicao}</p></div><div class="caixas">${item.caixas}</div><div class="pacotes">${item.pacotes}</div><div class="macos">${item.macos}</div><div class="sku">
    <p>${item.sku}</p></div><div class="descricao"><p>${item.descricao}</p></div><div class="observacao"><p>${item.observacao}</p></div><div class="status"><button class="status-btn" data-editing="false">*</button></div><div class="edite"><button class="edit-btn" data-editing="false">Editar</button></div>`
}

const changeData = (json) =>{
    newElement('header', 'body', headerTitle)
    newElement('main', 'body', cabecalho)
    newElement('footer', 'body', footer)

    const btnDivergences = document.getElementById("showDivergences")//
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

    const container = document.getElementById("list")
    let id = 1

    json.forEach(item => {

        const div = document.createElement("div")

        div.id = `line${id}`
        div.classList.add("linha")

        div.innerHTML = line(item, id)

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
const verificarEncerramentoDaContagem = () => {
    const linhas = document.querySelectorAll('.linha')
    
    return [...linhas].every(linha =>{
        const btn = linha.querySelector('.status-btn')
        return btn.dataset.editing === "true"
    })
}
const saveData = () =>{
    const saveBtn = document.getElementById('save')
    saveBtn.addEventListener('click', () => {
        printBtn('list')
    })
}

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
        saveData()
    }else{
        alert("Importe o arquivo .xlsx")
    }
})
const salvarEstado = (estado) =>{
    localStorage.setItem("inventarioEstado", JSON.stringify(estado))
}
const limparEstado = () =>{
    localStorage.removeItem("inventarioEstado")
}

const printBtn = (id) =>{
    // win.document.write(`<html><head><title>Relatório de contagem de Estoque -------- ${day()}</tilte>`)
    // win.document.write(style)
    // win.document.write(`</head><body>`)
    // win.document.write(contentPrint)
    // win.document.write('</body><foote><p>Hora início:______ Hora fim:_______ Ass Responsavel:___________________________ Ass Conferente:___________________________</p></footer></html>')
    // win.document.close()
    // win.print()
    const conteudo = document.getElementById(id).innerHTML

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
                </style>
            </head>
            <body>
                ${cabecalho}
                ${conteudo}
                <foote><p>Hora início:______ Hora fim:_______ Ass Responsavel:____________ Ass Conferente:____________ </p></footer>
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