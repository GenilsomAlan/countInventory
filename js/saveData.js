import { getById } from "./helpers.js"
import { IDS } from "./constants.js"
import { createTableHeader } from "./layout.js"
import { day } from "./helpers.js"

export const saveData = () => {
    const saveBtn = getById(IDS.save)

    if (!saveBtn) return

    saveBtn.addEventListener("click", (event) => {
        event.preventDefault()
        printTable(IDS.list)
    })
}
const printTable = (id) => {

    const element = document.getElementById(id) || document.getElementById("resultadoDivergencias")

    if (!element) {
        console.error("Conteúdo para impressão não encontrado")
        return
    }

    const conteudo = element.innerHTML

    const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']")).map(style => style.outerHTML).join("")

    const win = window.open("", "", "height=700,width=900")

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
                    ${createTableHeader()}
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