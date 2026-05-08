# Inventário

Sistema web para importação, conferência e análise de relatórios de inventário em formato `.xlsx`.

A aplicação permite carregar planilhas de estoque, editar contagens diretamente na interface, marcar itens conferidos, visualizar divergências e gerar relatórios para impressão.

---

# Funcionalidades

## Importação de planilhas Excel

* Leitura de arquivos `.xlsx` diretamente no navegador
* Conversão automática da planilha em tabela HTML interativa
* Processamento utilizando a biblioteca `xlsx`

---

## Edição dinâmica da tabela

* Edição inline dos campos:

  * Caixas
  * Pacotes
  * Maços
  * SKU
* Alternância entre modo edição e modo visualização
* Destaque visual para linhas em edição

---

## Controle de conferência

* Marcação de itens como conferidos (`OK`)
* Bloqueio de edição após confirmação
* Liberação automática dos botões de ação apenas quando todas as linhas forem conferidas

---

## Sistema de divergências

* Comparação entre:

  * valores originais da planilha
  * valores editados pelo operador
* Geração automática da página de divergências
* Navegação entre:

  * relatório principal
  * página de divergências

---

## Persistência de estado

O sistema utiliza `localStorage` para manter:

* dados do relatório principal
* dados das divergências
* página atualmente aberta
* status de edição e conferência

Mesmo após atualizar a página (`F5`), o sistema restaura automaticamente o estado anterior.

---

## Impressão de relatórios

* Geração de layout para impressão
* Inclusão automática de:

  * data
  * cabeçalho
  * área de assinatura
* Preservação dos estilos CSS na impressão

---

# Estrutura atual do projeto

```txt
src/
│
├── pages/
│   ├── mainPage.js
│   └── divergencesPage.js
│
├── constants.js
├── divergences.js
├── events.js
├── helpers.js
├── layout.js
├── main.js
├── saveData.js
├── storage.js
├── table.js
├── ui.js
├── utils.js
└── xlsx-reader.js
```

---

# Arquivos principais

## `main.js`

Ponto de entrada da aplicação.

Responsável por:

* inicialização do sistema
* geração do relatório
* controle de reset
* restauração de páginas

---

## `storage.js`

Gerenciamento completo de persistência via `localStorage`.

Controla:

* estado do inventário
* estado das divergências
* página atual

---

## `events.js`

Centraliza os eventos da aplicação:

* edição
* status
* habilitação de botões
* atualização de estado

---

## `table.js`

Responsável pela renderização:

* layout principal
* linhas da tabela
* carregamento de estados salvos

---

## `divergences.js`

Controla:

* coleta de divergências
* validação
* abertura da página de divergências

---

## `pages/mainPage.js`

Renderização da página principal do inventário.

---

## `pages/divergencesPage.js`

Renderização da página de divergências.

---

# Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript Vanilla (ES Modules)
* LocalStorage API
* SheetJS (`xlsx`)

---

# Como executar

## 1. Clone o projeto

```bash
git clone <repositorio>
```

---

## 2. Abra o projeto

Recomenda-se utilizar um servidor local.

Exemplo com VSCode:

* Instale a extensão `Live Server`
* Clique em `Open with Live Server`

---

## 3. Utilize o sistema

1. Importe um arquivo `.xlsx`
2. Clique em `Gerar Relatório`
3. Edite os valores necessários
4. Marque as linhas como conferidas
5. Visualize divergências
6. Gere impressão do relatório

---

# Melhorias futuras

* Exportação para PDF
* Exportação para Excel
* Sistema de autenticação
* Backend com banco de dados
* Histórico de inventários
* Filtros e pesquisa
* Dashboard de métricas
* Responsividade mobile
* Virtualização de tabelas grandes
* Sistema de múltiplos usuários

---

# Objetivo do projeto

O objetivo principal é criar uma aplicação leve e eficiente para conferência operacional de inventário, mantendo:

* simplicidade
* performance
* persistência local
* facilidade de manutenção
* arquitetura modular

---
