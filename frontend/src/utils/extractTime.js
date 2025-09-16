export function extractTime(dateString) {
    const date = new Date(dateString)
    const hours = padZero(date.getHours())
    const minutes = padZero(date.getMinutes())
    return `${hours}:${minutes}`
}

// HELPER TO PREFIX SINGLE-DIGITS WITH ZERO
function padZero(number) {
    return number.toString().padStart(2, "0")
}