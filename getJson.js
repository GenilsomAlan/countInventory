document.addEventListener("DOMContentLoaded", () => {

    fetch('betha.json')
        .then(response => response.json())
        .then(data => {

            const container = document.getElementById("list");

            // 🔥 REMOVE DUPLICADOS (baseado em SKU + Endereco)
            const itensUnicos = [];
            const mapa = new Set();

            data.forEach(item => {
                const chave = `${item.SKU}-${item.Endereco}`;

                if (!mapa.has(chave)) {
                    mapa.add(chave);
                    itensUnicos.push(item);
                }
            });

            let id = 1;

            itensUnicos.forEach(item => {

                const div = document.createElement("div");

                div.id = `line${id}`;
                div.classList.add("linha");

                div.innerHTML = `
                    <div class="reservado">
                        <p>${item["Resv.Normal"] ?? 0}</p>
                    </div>

                    <div class="posicao">
                        <p>${item.Endereco ?? "-"}</p>
                    </div>

                    <div class="caixas" id="caixas${id}">
                        <p>${item["Dispon.Exped."] ?? 0}</p>
                    </div>

                    <div class="pacotes" id="pacotes${id}">
                        <p>0</p>
                    </div>

                    <div class="macos" id="macos${id}">
                        <p>0</p>
                    </div>

                    <div class="sku">
                        <p>${item.SKU ?? "-"}</p>
                    </div>

                    <div class="descricao">
                        <p>${item.Descricao ?? "-"}</p>
                    </div>

                    <div class="observacao">
                        <p>OK</p>
                    </div>

                    <div class="status">
                        <button class="status-btn" id="item${id}" value="0">*</button>
                    </div>

                    <div class="edite">
                        <button class="edit-btn" id="itemID${id}" value="false">Editar</button>
                    </div>
                `;

                container.appendChild(div);
                id++;
            });
            initializeEffects();
        })
        .catch(error => console.error("Erro ao carregar JSON:", error));

});




























































































































// fetch('betha.json')
// .then(response => response.json())
// .then(data => {
//     let id = 1
//     const container = document.getElementById("list")
//     //console.log(data)
//     //console.log(data[0])
//     data.forEach(item => {
//         const div = document.createElement("div")
//         div.innerHTML = `
//             <div class="reservado">
//                 <p>${item["Resv.Normal"]}</p>
//             </div>
//             <div class="posicao">
//                 <p>${item.Endereco}</p>
//             </div>
//             <div class="caixas" id="caixas${id}">
//                 <p>${item["Dispon.Exped."]}</p>
//             </div>
//             <div class="pacotes" id="pacotes${id}">
//                 <p>${0}</p>
//             </div>
//             <div class="macos" id="macos${id}">
//                 <p>${0}</p>
//             </div>
//             <div class="sku">
//                 <p>${item.SKU}</p>
//             </div>
//             <div class="descricao">
//                 <p>${item.Descricao}</p>
//             </div>
//             <div class="observacao">
//                 <p>${"OK"}</p>
//             </div>
//             <div class="status">
//                 <button class="status-btn" id="item${id}" value=0>*</button>
//             </div>
//             <div class="edite">
//                 <button class="edit-btn" id="itemID${id}" value=false>Editar</button>
//             </div>
//         `
//         div.id = `line${id}`
//         id = id + 1
//         container.appendChild(div)        
//     });
// })
// .catch(error => console.error("Erro: ", error));
