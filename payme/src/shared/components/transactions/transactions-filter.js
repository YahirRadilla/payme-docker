import { HandleApi } from "../../utils/api";
import "./transactions-filter.css";
import { AddTransactions } from "./transactions-table";


export const AddFilters = async ({ id }) => {
    const filterContainer = document.getElementById('filter-container');

    filterContainer.innerHTML = `
        <div class="filter-container">            
            <div class="filter-input">
                <input id='date_filter' type="date">
                <select id='type_filter'>
                    <option selected value"">Select a type</option>
                    <option value="transfer">Transfer</option>
                    <option value="payment">Payment</option>
                    <option value="income">Income</option>
                    <option value="withdrawal">Withdrawal</option>
                </select>
            </div>
            <button id='filter_button' class="filter-button">Filter</button>
        </div>
    `;

    const filterButton = document.getElementById('filter_button');
    filterButton.addEventListener('click', async () => {
        const dateFilter = document.getElementById('date_filter');
        const typeFilter = document.getElementById('type_filter');

        const { data: filterTransactions } = await HandleApi.getTransactionsFilter({
            id,
            dateTransaction: dateFilter.value || null,
            type: typeFilter.value === 'Select a type' ? null : typeFilter.value,
        });


        AddTransactions({ transactions: filterTransactions });
    });
};
