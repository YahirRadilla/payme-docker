import "./transactions-table.css";
import { formatToYearMonthDay } from '../../utils/helpers/format-date'

export const AddTransactions = ({ transactions }) => {
    const containerTransactions = document.getElementById("transactions-container");
    console.log(transactions)
    containerTransactions.innerHTML = `
        <div class="transactions-card">
    <div class="transactions-scroll">
        <table class="transactions-table">
            <thead>
                <tr>
                    <th>Description</th>   
                    <th>Folio</th>                  
                    <th>Type</th>
                    <th>Source Card</th>
                    <th>Destination Card</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${transactions.map(
        (element) =>
            `<tr>
                            <td data-label="Description">${element.message.length === 0 ? 'No description' : element.message}</td>                            
                            <td data-label="Type">${element.folio}</td>
                            <td data-label="Type">${element.type}</td>
                            <td data-label="Source Card">${'****' + element.source_card.substring(13, 16)}</td>
                            <td data-label="Destination Card"> ${element.destination_card ? '****' + element.destination_card.substring(13, 16) : 'none'}</td>
                            <td data-label="Date">${formatToYearMonthDay(element.created_at)}</td>
                            <td data-label="Amount" class="${element.type !== 'income' ? 'negative-amount' : 'positive-amount'}">${element.type !== 'income' ? '-' : '+'}$${element.amount}</td>
                        </tr>`
    )
            .join("")}
                
            </tbody>
        </table>
    </div>
</div>
    `;
};
