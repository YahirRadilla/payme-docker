import './edit-profile.css'


export const EditProfile = ({ userFirstName, userLastName, userEmail, userPhoneNumber }) => {

    const mainSection = document.getElementById('main-section');
    mainSection.innerHTML = `
    <form id="form" class="form-style" action="">
        <div class="container-forms">
            <div class="container-elements">
                <label class="titles-content">Edit Profile Information</label>
                <div class="inline-inputs">
                    <div class="input-container">
                        <label for="name" class="name">First Name:</label>
                        <input required id="name" name="firstName" placeholder="Enter your name" type="text" class="input" value="${userFirstName}">
                    </div>
                    <div class="input-container">
                        <label for="lastname" class="name">Last Name:</label>
                        <input id="lastname" name="lastName" placeholder="Enter your last name" type="text" class="input" value="${userLastName}">
                    </div>
                    <div class="input-container">
                        <label for="email" class="name">E-Mail:</label>
                        <input required id="email" name="email" placeholder="Enter your email" type="email" class="input" value="${userEmail}">
                    </div>
                    <div class="input-container">
                        <label for="phone" class="name">Phone Number:</label>
                        <input required id="phone" name="phone" placeholder="Enter your phone number" type="number"
                            class="input" value="${userPhoneNumber}">
                    </div>
                </div>
            </div>
            <input class="input" type="submit" value="Update Profile">
        </div>
    </form>
    `;
};