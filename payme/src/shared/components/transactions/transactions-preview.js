import "./transactions-preview.css";
export const AddTransactionPreview = ({ description, date, type, amount }) => {
    let iconSrc;
    switch (type) {
        case 'transfer':
            iconSrc = 'transfer-icon.svg';
            break;
        case 'payment':
            iconSrc = 'payment-sheet-icon.svg';

            break;
        case 'income':
            iconSrc = 'income-icon.svg';
            break;
        case 'withdrawal':
            iconSrc = 'withdrawal-icon.svg';
            break;
        default:
            iconSrc = 'income-icon.svg';
            break;
    }

    const contentTransaction = document.getElementById('transactions-preview')
    const content = `
    <div class="transaction-card ${type}">
        <div class="icon-details-container">
            <div class="icon-container">
                <img id="transaction-icon" class="deposit-icon" src="${iconSrc}" title="${type}">
            </div>
            <div class="transaction-details">
                <span>${description}</span>
                <p>${date}</p>
            </div>
        </div>
        <div class="transaction-amount">
            <span>$${amount}</span>
        </div>

    </div>
    `;
    contentTransaction.innerHTML += content
};
