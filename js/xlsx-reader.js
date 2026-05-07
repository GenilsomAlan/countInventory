import { IDS } from "./constants.js"

let jsonData = null

const inputBTN = document.getElementById(IDS.input)

inputBTN.addEventListener('change', (event) => {
    const archive = event.target.files[0]

    if(!archive) return

    const reader = new FileReader()
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, {type: "array"})
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        jsonData = XLSX.utils.sheet_to_json(sheet, { defval: ""})
        // console.log(jsonData)
    }
    reader.readAsArrayBuffer(archive)
})

export const getJsonData = () => {
    return jsonData
}