
import '../../../../style.css'
import '../../../shared/components/404/404.css'
import '../../../features/page/pages/profile/user-settings.css'
import '../../../features/page/pages/cards/cards.css'
import { getAuth } from '../../../features/auth/getAuth.js'
import { getHome } from '../../../features/page/pages/home/home.js'
import { getCards } from '../../../features/page/pages/cards/cards.js'
import { createHeader } from '../../components/header/header.js'
import { createFooter } from '../../components/footer/footer.js'
import { UserSettings } from '../../../features/page/pages/profile/user-settings.js'
import { getTransactions } from '../../../features/page/pages/transactions/transactions.js'
import { HandleApi } from '../api.js'

const navigate = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};


const setName = async () => {
    const encodedId = localStorage.getItem('userId');
    const userId = atob(encodedId);
    const { data: user } = await HandleApi.getUser({ id: userId })
    const userNameElement = document.getElementById('username')
    userNameElement.innerText = user[0].first_name + " " + user[0].first_lastname
}


const routes = {
  404: "/404.html",
  "/login": "/login.html",
  "/register": "/register.html",
  "/": "/home.html",
  "/transactions": "/transactions.html",
  "/user-settings": "/user-settings.html",
  "/cards": "/cards.html"
};


const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    console.log("Path:", path);
    console.log("Route:", route);
    try {
        const response = await fetch(route);
        if (!response.ok) throw new Error("Failed to load page");
        const html = await response.text();
        document.getElementById("main-page").innerHTML = html;
        document.title = path.slice(1) || 'Home'

        switch (path) {
            case '/':
                getHome()
                createHeader()
                createFooter()
                setName()
                break
            case '/transactions':
                createHeader()
                getTransactions()
                createFooter()
                setName()
                break
            case '/register':
                getAuth()
                break
            case '/login':
                getAuth()
                break
            case '/user-settings':
                createHeader()
                UserSettings()
                createFooter()
                setName()
                break
            case '/cards':
                createHeader()
                getCards()
                createFooter()
                setName()
                break

        }


    } catch (error) {
        console.error("Error loading route:", error);
        document.getElementById("main-page").innerHTML = "<h1>Error loading page</h1>";
    }
};


window.onpopstate = handleLocation;
window.route = navigate;

handleLocation();
