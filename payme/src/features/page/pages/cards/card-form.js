import "./card-form.css";
export const AddCardForm = () => {
    const containerForm = document.getElementById('card-form-container');

    containerForm.innerHTML = `
        <div>
            <div class="card-container">
                <form id="card-form">
                    <div class="form-group">
                        <div class="form-column">
                            <label for="balance">Balance</label>
                            <input required type="number" name="balance" id="balance" placeholder="$20.00">
                        </div>
                        <div class="form-column">
                            <label for="cvv">ccv</label>
                            <input required type="text" name="cvv" id="cvv" placeholder="ccv">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-column">
                            <label for="card-number">Card Number</label>
                            <input required type="text" name="card_number" id="card-number" placeholder="**** **** **** ****">
                        </div>
                        <div class="form-column">
                            <label for="expiry-date">Expiration Date</label>
                            <input required type="date" name="expiry_date" id="expiry-date" placeholder="25 January 2025">
                        </div>
                    </div>
                    <button type="submit" class="btn">Add Card</button>
                </form>
            </div>
        </div>
    `;
};
