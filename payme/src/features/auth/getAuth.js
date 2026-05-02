import { notyf } from '../../shared/components/toast.js'
import { getLogged } from './login/login.js';
import { getRegistered } from './register/register.js';
import { HandleApi } from '../../shared/utils/api'
import '../../features/auth/register/register.css'
import '../../features/auth/login/login.css'

const path = window.location.pathname;



const validateForm = (data) => {

    if (path === '/register') {

        if (data.data.phone.length !== 10) {
            notyf.error('Must be 10 numbers');
            return false
        }
        if (data.data.password.length < 8) {
            notyf.error('Passwords Must be at least 8 characters');
            return
        }
        if (data.data.password !== data.data.confirmPassword) {
            notyf.error('Passwords doesn´t match');
            return false
        }

        return true
    }
    return true
}


const isLogged = async () => {
    const verifyToken = await HandleApi.verifyToken()

    if (verifyToken.status === 200) {
        window.location.href = '/'
    }
}

export const getAuth = async () => {

    await isLogged()

    const form = document.getElementById('form')
    form.addEventListener('submit', async e => {
        e.preventDefault()

        const data = Object.fromEntries(
            new FormData(e.target)
        )

        const isValid = validateForm({ data })

        if (!isValid) return

        if (path === '/login') await getLogged(data)

        if (path === '/register') await getRegistered(data)

    })


}



