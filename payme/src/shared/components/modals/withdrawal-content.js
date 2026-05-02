export const withdrawalContent = ({ cards }) => `
    <header class="modal__header">
                <h2 class="modal__title">
                    Withdrawal data
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
    </header>
    <div class="modal-content-content">
        <div class="modal__content">
            <form id="withdrawal-form" class="transfer-inputs">
                <label for="withdrawal_card_select" class="name">My Cards</label>
                <select required name="withdrawal_card_select">                    
                    <option disabled>Select a card</option>                
                    ${cards.map(
    (element) =>
        `<option value="${element.card_number}">Card Number ${element.card_number} - Balance ${element.balance}</option>`
)
        .join("")}  
                </select>  

                <div class="input-container">
                    <label for="amount" class="name">Amount</label>
                    <input required id="amount" name="amount" placeholder="$70,000" type="number"
                        class="input">
                </div>

                <input class="input" type="submit" value="Make Withdrawal">
            </form>
        </div>
    </div>`