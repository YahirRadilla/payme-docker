import './delete-account.css';

export const DeleteAccount = () => {

    const mainSection = document.getElementById('main-section');
    mainSection.innerHTML = `
        <div class="container-forms">
            <div class="container-elements">
                <div>
                    <label class="titles-content">Delete Account Information</label>
                </div>
                <div>
                    <span class="warning-alert">Warning: This action cannot be undone. Once completed, your account will be permanently deleted.</span>
                </div>
            </div>
            
            <button class="input-delete modal__btn confirmation">Permanently delete account</button>
            
        </div>
    `;
};