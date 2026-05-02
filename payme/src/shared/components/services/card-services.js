import "./card-services.css";
export const AddCardServices = () => {
    const containerServices = document.getElementById('card-services-container');

    containerServices.innerHTML = `
    <div>
        <div class="services-card">
            <div class="services-list">
                <button class="transfer service-item transfer-item">
                    <span class="transfer icon transfer-item"></span>
                    <span class="transfer text transfer-item">Transfer</span>
                </button>
                <button class="payment service-item payment-item ">
                    <span class="payment icon payment-item"></span>
                    <span class="payment text payment-item">Payment of services</span>
                </button>
                <button class="deposit service-item deposit-item">
                    <span class="deposit icon deposit-item"></span>
                    <span class="deposit text deposit-item">Deposit</span>
                </button>
                <button class="withdrawal service-item withdrawal-item">
                    <span class="withdrawal icon withdrawal-item"></span>
                    <span class="withdrawal text withdrawal-item">Withdrawal</span>
                </button>
            </div>
        </div>
    </div>
    `;
};
