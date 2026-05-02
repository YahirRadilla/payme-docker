export const transferContent = ({ cards }) => `
    <header class="modal__header">
                <h2 class="modal__title">
                    Transfer data
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
    </header>
    <div class="modal-content-content">
        <div class="modal__content">
            <form id="transfer-form" class="transfer-inputs">
                <label for="transfer_card_select" class="name">Source Card</label>
                <select required name="transfer_card_select">                    
                    <option disabled>Select a card</option>       
                    ${cards.map(
    (element) =>
        `<option value="${element.card_number}">Card Number ${element.card_number} - Balance ${element.balance}</option>`
)
        .join("")}     
                
                </select>  

                <div class="input-container">
                    <label for="email" class="name">E-Mail</label>
                    <input required id="email" name="email" placeholder="Enter your email" type="email" class="input">
                </div>

                <div class="input-container">
                    <label for="amount" class="name">Amount</label>
                    <input required id="amount" name="amount" placeholder="$70,000" type="number"
                        class="input">
                </div>

                <div class="input-container">
                    <label for="message" class="name">Message (Optional)</label>
                    <input id="message" name="message" placeholder="Your message here" type="text" class="input">
                </div>

                <input class="input" type="submit" value="Make transfer">
            </form>
        </div>
    </div>`