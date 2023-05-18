// API github
const URL_BASE = 'https://api.github.com/users';

// Funcion que conecta con la API github
const request = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json()
    try {
        console.log('mostrar json', responseJson);
    } catch (error) {
        console.log('Error', error);
    }
}

/* tomar usuario de la API, 
nombre de usuario "name"
login "login"
cantidad de repos "public_repos"
localidad "location"
tipo de usuario "type"
https://api.github.com/users/Nayarethnain 
https://api.github.com/users/{user}/repos?page={pagina}&per_page={cantidad_repos}
https://api.github.com/users/Nayarethnain/respos?page=1&per_page=3
*/

const getUser = async (userName) => {
    const url = `${URL_BASE}/${userName}`;
    const response = await request(url);
    try {
        console.log('mostrar json usuario', response);
    } catch (error) {
        console.log('Error', error);
    }
}

const getRepo = async (userName, page, perPage) => {
    const url = `${URL_BASE}/${userName}/repos?page=${page}&per_page=${perPage}`;
    console.log('mostrar repos', url);
    const response = await request(url);
    try {
        console.log('mostrar json repos', response);
    } catch (error) {
        console.log('Error', error);
    }


}

document.addEventListener('DOMContenidoLoaded', async () => {
    await getUser('Nayaretnain')
    await getRepo('Nayarethnain', 1, 3)
})







