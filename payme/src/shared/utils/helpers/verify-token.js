import { HandleApi } from "../api";

export const monitorUserSession = async () => {
    const checkSession = async () => {

        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const hasCookie = cookies.some(cookie => cookie.startsWith('access_token='));
        if (!hasCookie) {

            const verifyToken = await HandleApi.verifyToken();

            if (verifyToken.status !== 200) {
                window.location.href = '/login';
            }
        }
    };


    await checkSession();
    setInterval(checkSession, 5000);
};
