import './footer.css';

export const createFooter = () => {

    const footer = document.getElementById('footer');

    footer.innerHTML = `
        <footer class="footer-page">
            <div class="footer-container">
                <img src="logo.svg" alt="Logo" class="logo">
                &copy; 2024 PayMe. all rights reserved.
            </div>
        </footer>
    `;
};