export function formatCardNumber(cardNumber) {

    return cardNumber.toString().replace(/(\d{4})(?=\d)/g, "$1 ");
}