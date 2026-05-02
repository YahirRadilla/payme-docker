export const Card = ({ cardNumber, expiredDate, cvv, cardName, balance }) => {

    const card = document.getElementById('card-container')
    const cardContent = `
        <div class="card">
            <div class="foreground">
                <div class="credit-card-header">
                <div class="bank"><img src="visa_logo.svg" alt="User"></div>
            </div>
            <div class="credit-card-chip-container">
                <img src="chip.svg" alt="User">
                </div>
                <div class="info-container">
                <p class="serial">${cardNumber}</p>
                <div class="info-card">
                    <p class="expiration">${expiredDate}</p>     
                    <p class="cvv">ccv ${cvv}</p>  
                </div>
                <div class="info-card">
                    <p class="names">${cardName}</p>     
                    <p class="balance">$${balance}</p>  
                </div>
                
            </div>
        </div>
    `;

    card.innerHTML += cardContent
};