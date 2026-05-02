export const depositContent = ({ cards }) => {


    return `
    <header class="modal__header">
                <h2 class="modal__title">
                    Deposit data
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
    </header>
    <div class="modal-content-content">
        <div class="modal__content">
            <form id="deposit-form" class="transfer-inputs">
                <div class="input-container">
                    <label for="deposit-card-select" class="name">Source Card</label>
                    <select required name="depositSourceCard">                    
                        <option disabled>Select a card</option>                
                        ${cards.map(
        (element) =>
            `<option value="${element.card_number}">Card Number ${element.card_number} - Balance ${element.balance}</option>`
    )
            .join("")}  
                    </select>  
                </div>

                <div class="input-container">
                    <label for="deposit-desination-card-select" class="name">Destination Card</label>
                    <select required name="depositDestinationCard">                    
                        <option disabled>Select a card</option>                
                        ${cards.map(
                (element) =>

                    `<option value="${element.card_number}">Card Number ${element.card_number} - Balance ${element.balance}</option>`
            )
            .join("")}  
                    </select>  
                </div>
                
                <div class="input-container">
                    <label for="amount" class="name">Amount</label>
                    <input required id="amount" name="amount" placeholder="$70,000" type="number"
                        class="input">
                </div>


                <input class="input" type="submit" value="Deposit Founds">
            </form>
        </div>
    </div>`}