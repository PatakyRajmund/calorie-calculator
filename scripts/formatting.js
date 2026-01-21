import { form } from "./calorie-counter.js"
const selectActivity = document.getElementById('select-activity')
selectActivity.addEventListener('blur', () => {
    const age = document.getElementById('submit')
    const color = window.getComputedStyle(age).backgroundColor
    console.log(color)
    selectActivity.style.backgroundColor = color

})

export function formatFormAfterSubmit() {
    const formElements = form.querySelectorAll("input,select")
    formElements.forEach(node => {
        node.className = "selected"
    })
}