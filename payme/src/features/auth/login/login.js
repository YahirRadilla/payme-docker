import { notyf } from '../../../shared/components/toast.js'
import { HandleApi } from '../../../shared/utils/api.js'


export async function getLogged(data) {
    const login = await HandleApi.login({ email: data.email, password: data.password })

    if (login.success) {
        notyf.success(login.message)
        const verifyToken = await HandleApi.verifyToken()
        if (verifyToken.status === 200) {

            const encodedId = btoa(login.data.id);
            localStorage.setItem('userId', encodedId);
            window.location.href = '/';
        }
        return
    }
    notyf.error(login.message)

}
