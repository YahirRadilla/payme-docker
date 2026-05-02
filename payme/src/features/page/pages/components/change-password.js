import './change-password.css';

export const ChangePassword = () => {

    const mainSection = document.getElementById('main-section');
    mainSection.innerHTML = `
    <form id="form" class="form-style" action="">
        <div class="container-forms">
            <div class="container-elements">
                <label class="titles-content">Change Password</label>
                <div class="inline-inputs">
                    <div class="input-container">
                        <label for="password" class="name">Password:</label>
                        <input required id="password" name="password" placeholder="Enter your password" type="password" class="input">
                    </div>
                    <div class="input-container">
                        <label for="confirm_password" class="name">Confirm Password:</label>
                        <input required id="confirm_password" name="confirmPassword" placeholder="Enter your password" type="password" class="input">
                    </div>
                </div>
            </div>
            <input class="input" type="submit" value="Update Profile">
        </div>
    </form
    `;
};