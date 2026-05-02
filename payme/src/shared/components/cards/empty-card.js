export const EmptyCard = () => {

    const emptyCard = document.getElementById('card-container')
    const content = `
        <div class="card">
            <div class="foreground-empty">
                <div class="credit-card-header">
                <div class="bank"></div>
            </div>
            <div class="">
                <img src="chip.svg" alt="User">
                </div>  
            </div>
        </div>
    `;
    emptyCard.innerHTML += content
};