export const $ = (selector) => document.querySelector(selector)

export const $$ = (selector) => document.querySelectorAll(selector)

export const getById = (id) => document.getElementById(id)

export const removeElement = (element) => element.remove()

export const day = () => {
    const date = new Date()
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}