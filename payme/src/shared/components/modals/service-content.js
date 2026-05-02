export const serviceContent = ({ cards }) => `
<header class="modal__header">
    <h2 class="modal__title">Payment of services</h2>
    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
</header>
<div class="modal-content-content">
    <div class="modal__content">
        <form id="service-form" class="transfer-inputs">
            <div class="input-container">
                <label for="service_card_select" class="name">Source Card</label>
                <select required name="service_card_select" id="transfer-card-select">
                    <option disabled>Select a card</option>
                    ${cards.map(
    (element) =>
        `<option value="${element.card_number}">Card Number ${element.card_number} - Balance ${element.balance}</option>`
)
        .join("")}  
                </select>
            </div>

            <div class="input-container">
                <label for="service_select" class="name">Service</label>
                <select required name="service_select" id="service-select">
                    <option selected>Electricity</option>
                    <option>Water</option>
                    <option>Taxes</option>
                </select>
            </div>

            <div class="input-container">
                <label for="reference" class="name">Reference</label>
                <input required id="reference" name="reference" placeholder="012345678901" type="text" class="input">
            </div>

            <div class="input-container">
                <label for="amount" class="name">Amount to pay</label>
                <input required id="amount" name="amount" placeholder="$70,000" type="text" class="input">
            </div>

            <input class="input" type="submit" value="Pay now">
        </form>
    </div>
</div>
`