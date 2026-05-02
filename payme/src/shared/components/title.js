export const Title = (name) => {

    const title = document.getElementById('welcome-home')
    title.innerHTML = `
        <h1>Welcome, ${name}</h1>        
    `;
};