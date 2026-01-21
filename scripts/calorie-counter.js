import { formatFormAfterSubmit } from "./formatting.js"

export const form = document.getElementById('data-input')
form.addEventListener('submit', (event) => {
    // Avoid site refresh
    event.preventDefault()

    // Check and delete table from previous run if exists
    let containerDiv = document.getElementById('container')
    let oldTable = document.getElementById('output-table')
    if (oldTable) {
        containerDiv.removeChild(oldTable)
    } else {
        // Format the form after it was submitted
        formatFormAfterSubmit()
    }

    // Parse data
    const formData = new FormData(form)
    const gender = formData.get('gender')
    const age = Number(formData.get('age'))
    let weight = Number(formData.get('weight'))
    const height = Number(formData.get('height'))
    const goalWeight = Number(formData.get('weight-goal'))
    const activityMultiplier = getActivityMultiplier(formData.get('activity'))
    const numOfWeeks = Number(formData.get('num-of-weeks'))

    let weightDifference = (goalWeight - weight) * 2
    let weeklyWeightDifference = weightDifference / numOfWeeks
    let dailyDifferenceGoal = (3500 * weeklyWeightDifference) / 7

    const div = document.createElement("div")
    div.id = 'output-table'
    div.className = 'flex-item'
    const table = document.createElement("table")
    const headerRow = table.insertRow()
    const headers = ["Week", "Calorie intake", "Estimated weight"]

    headers.forEach(headerText => {
        const headerCell = document.createElement("th")
        headerCell.innerText = headerText
        headerRow.appendChild(headerCell)
    })

    for (let i = 1; i <= numOfWeeks; i++) {
        let BMR = calculateBMR(gender, weight, height, age)
        // Corrigated with activity level
        let TDEE = (BMR * activityMultiplier) + dailyDifferenceGoal
        weight += (weeklyWeightDifference / 2)

        // Create illustrated output
        let row = table.insertRow()
        let cellData = [i, TDEE, weight]
        cellData.forEach(cellData => {
            const cell = document.createElement("td")
            // Create one to 2 decimals rounded number to output
            cell.innerText = Math.round((cellData + Number.EPSILON) * 100) / 100
            row.appendChild(cell)
        })
    }
    div.appendChild(table)
    const formDiv = document.getElementById('form-div')
    formDiv.parentElement.insertBefore(div, formDiv)
})

/**
 * Returns the multiplier based on activity "type"
 * @param activity: A string represantation of activity level
 */
function getActivityMultiplier(activity) {
    switch (activity) {
        case 'none':
            return 1.25
        case 'light':
            return 1.375
        case 'moderate':
            return 1.55
        case 'high':
            return 1.725
        case 'extra':
            return 1.9
        default:
            return 0
    }
}
/**
 * Calculates Basal Metabolic Rate (BMR)
 * @param {*} gender gender
 * @param {*} weight weight in kgs
 * @param {*} height height in cm
 * @param {*} age age in years
 * @returns BMR
 */
function calculateBMR(gender, weight, height, age) {
    const base = (10 * weight) + (6.25 * height) - (5 * age)

    return gender == 'male' ? base + 5 : base - 161
}