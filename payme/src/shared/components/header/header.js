import './header.css'
import './user-dropdown.css'
import { HandleApi } from '../../utils/api.js'
import { notyf } from '../toast.js'


const handleLogOutClick = async () => {
    localStorage.removeItem('userId');
    const data = await HandleApi.logout()
    notyf.success(data.message)
    window.location.href = `/login`
}

const handleConfigClick = () => {
    window.location.href = `/user-settings`
}

export const createHeader = () => {


    const header = document.getElementById('header')
    header.innerHTML = `
        <header style="border-bottom: 1px solid #ddd; box-shadow: 0 -6px 10px 5px rgba(0,0,0,0.5);">
            <div class="container">
                <nav class="navbar">
                    <div class="navbar-left">
                        <img src="logo.svg" alt="Logo" class="logo">
                        <ul class="nav-links">
                            <li><a href="/" class="nav-link" id="homeLink">Home</a></li>
                            <li><a href="/transactions" class="nav-link" id="transactionsLink">Transactions</a></li>
                            <li><a href="/cards" class="nav-link" id="cardsLink">Cards</a></li>
                        </ul>
                    </div>
                    <button class="burger-menu" id="burgerMenu">
                        <span> </span>
                        <span> </span>
                        <span> </span>
                    </button>
                    <div class="navbar-right">
                        <span id="username"></span>
                        <label class="popup">
                        <input type="checkbox" />
                        <div tabindex="0" class="burger">
                            <svg
                            viewBox="0 0 24 24"
                            fill="white"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >a
                            <path
                                d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
                            ></path>
                            </svg>
                        </div>
                        <nav class="popup-window">
                            <ul>
                            <li>
                                <button id="userSettingsButton">Settings</button>
                            </li>
                            <li>
                                <button id="logoutButton">Log out</button>
                            </li>
                            </ul>
                        </nav>
                        </label>
                    </div>
                </nav>
            </div>
        </header>
        <aside class="side-menu" id="sideMenu">
            <div class="sideMenu-elements">
                <button id="closeSideMenu" class="close-menu-button">X</button>
                <ul>
                    <li><a href="/" class="nav-link" id="sideHomeLink">Home</a></li>
                    <li><a href="/transactions" class="nav-link" id="sideTransactionsLink">Transactions</a></li>
                    <li><a href="/cards" class="nav-link" id="sideCardsLink">Cards</a></li>
                </ul>
            </div>
            <img src="logo.svg" alt="Logo" class="logo">
        </aside>
    `;

    const logoutButton = document.getElementById('logoutButton');
    const userSettingsButton = document.getElementById('userSettingsButton');

    const burgerMenu = document.getElementById('burgerMenu');
    const sideMenu = document.getElementById('sideMenu');
    const closeSideMenu = document.getElementById('closeSideMenu');

    logoutButton.addEventListener('click', handleLogOutClick);
    userSettingsButton.addEventListener('click', handleConfigClick)



    const currentPath = window.location.pathname;
    if (currentPath === '/') {
        document.getElementById('homeLink').classList.add('active');
    } else if (currentPath === '/transactions') {
        document.getElementById('transactionsLink').classList.add('active');
    } else if (currentPath === '/cards') {
        document.getElementById('cardsLink').classList.add('active');
    }

    if (currentPath === '/') {
        document.getElementById('sideHomeLink').classList.add('active');
    } else if (currentPath === '/transactions') {
        document.getElementById('sideTransactionsLink').classList.add('active');
    } else if (currentPath === '/cards') {
        document.getElementById('sideCardsLink').classList.add('active');
    }

    burgerMenu.addEventListener('click', () => {
        sideMenu.classList.toggle('active');

        window.addEventListener('mousedown', outsideClose);
    });

    const outsideClose = (event) => {
        if (!sideMenu.contains(event.target) && !burgerMenu.contains(event.target) || closeSideMenu.contains(event.target)) {
            sideMenu.classList.remove('active');
            window.removeEventListener('mousedown', outsideClose);
        }
    }
};

