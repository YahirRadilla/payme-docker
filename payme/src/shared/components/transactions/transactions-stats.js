import "./transactions-stats.css";

export const AddStatsCard = ({ totalTransfers, totalIncomes, totalWithdrawal }) => {
    const containerStats = document.getElementById("stats-card-container");

    containerStats.innerHTML = `
    <h1 class="card-stats-title">Transactions</h1>
    <div class="stats-card">
        <div class="stat-item">
            <div class="icon-circle blue">
                <img src="transactions-icon.svg" alt="Transactions Icon">
            </div>
            <div class="stat-info">
                <p class="stat-title">Total Transfer</p>
                <p class="stat-value">$${totalTransfers}</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
            <div class="icon-circle green">
                <img src="income-icon.svg" alt="Income Icon">
            </div>
            <div class="stat-info">
                <p class="stat-title">Total Income</p>
                <p class="stat-value">$${totalIncomes}</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
            <div class="icon-circle red">
                <img src="expense-icon.svg" alt="Expense Icon">
            </div>
            <div class="stat-info">
                <p class="stat-title">Total Withdrawals</p>
                <p class="stat-value">$${totalWithdrawal}</p>
            </div>
        </div>
    </div>
    `;
};