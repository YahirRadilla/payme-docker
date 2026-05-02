export const confirmationContent = () => {


    return `
    <header class="modal__header">
                <h2 class="modal__title">
                    Are you sure you want to delete your account?
                </h2>
                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
    </header>
    <div class="modal-content-content">
        <p>This action cannot be undone. Once deleted, all your data will be permanently removed.</p>
        <div class="modal__content">
            <div class="confirmation-buttons">                    
                <button id="delete_account" class="confirmation-button input-delete">Yes, Delete</button>
                <button class="confirmation-button modal__close input-cancel">Cancel</button>
            </div>      
        </div>
    </div>`}