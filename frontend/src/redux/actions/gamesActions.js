import Axios from 'axios'

// IMPORTANTE: nombreBackend: rutas/props que deben tener el nombre que se les da en el backend

const gamesActions = {
    getGames: () => {
        return async (dispatch, getState) => {
            let response = await Axios.get('https://api.rawg.io/api/games?page=1')
            dispatch({
                type: 'GETGAMES',
                payload: { games: response.data }
            })
        }
    },
    /* getCategories: () => {
        return async (dispatch, getState) => {
            let response = await Axios.get('https://api.rawg.io/api/games?page=1')
            dispatch({
                type: 'GETCATEGORIES',
                payload: { categories: response.data.results }
            })
        }
    } */
}

export default gamesActions