// API github
const URL_BASE = 'https://api.github.com/users'

// Funcion que conecta con la API github
const request = async (url) => {
    const response = await fetch(url)
    const responseJson = await response.json()
    return responseJson
}

// FUNCION QUE OBTIENE EL ENDPOINT DEL USUARIO
const getUser = async (userName) => {
    const url = `${URL_BASE}/${userName}`
    const response = await request(url)

    try {
        refreshName(response.avatar_url, response.name, response.login, response.public_repos, response.location, response.type)
        console.log('mostrar json usuario', response)
    } catch (error) {
        console.log('Error', error)
    }
}

// FUNCION QUE OBTIENE EL ENDPOINT DE LOS REPOSITORIOS DEL USUARIO
const getRepo = async (userName, page, perPage) => {
    const url = `${URL_BASE}/${userName}/repos?page=${page}&per_page=${perPage}`
    console.log('mostrar repos', url)
    const response = await request(url)
    try {
        const divRepo = document.getElementById('repositorios')
        divRepo.innerHTML = ''
        for (let i = 0; i < response.length; i++) {
            refreshRepo(response[i].name, response[i].clone_url)
        }
        console.log('mostrar json repos', response)
    } catch (error) {
        console.log('Error', error)
    }
}

// FUNCION QUE AGREGA LOS DATOS DEL USUARIO AL DOM
const refreshName = (avatar, name, login, quantity, location, type) => {
    const divName = document.getElementById('usuario-info')
    divName.innerHTML = `
        <img src="${avatar}" alt="${name}" height="200px" width="200px">
        <p>Nombre de usuario: ${name}</p>
        <p>Nombre de login: ${login}</p>
        <p>Cantidad de repositorios: ${quantity}</p>
        <p>Localidad: ${location}</p>
        <p>Tipo de usuario: ${type}</p>
        `
}

// FUNCION QUE PINTA EL LISTADO DE REPOSITORIOS DEL USUARIO
const refreshRepo = (nameRepo, cloneURL) => {
    const divRepo = document.getElementById('repositorios')
    divRepo.innerHTML += `
        <a href="${cloneURL}" target="_blank"><h3>${nameRepo}</h3></a>
    `
}

// FUNCION QUE ESPERA QUE TODO EL DOM SE CARGUE Y EJECUTA EL JS Y FUNCIONES
document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.getElementById('btn-submit')

    // FUNCION QUE ESCUCHA EL BOTON ENVIAR Y EJECUTA LAS FUNCIONES getRepo getUser
    btn.addEventListener('click', async () => {
        const inputName = document.getElementById('nombre').value
        const inputPage = document.getElementById('pagina').value
        const inputRepo = document.getElementById('repoPagina').value

        // getUser(inputName)
        // getRepo(inputName, inputPage, inputRepo)

        // CONSTANTE QUE ALMACENA UNA PROMESA DE LAS FUNCIONES get
        const resp = await new Promise.all([getUser(inputName), getRepo(inputName, inputPage, inputRepo)])

        resp()
    })
})
