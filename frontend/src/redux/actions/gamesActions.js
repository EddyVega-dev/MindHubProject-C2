import Axios from 'axios'

// IMPORTANTE: nombreBackend: rutas/props que deben tener el nombre que se les da en el backend

const gamesActions = {
    getCategories: () => {
        return async (dispatch, getState) => {
            let response = await Axios.get('http://127.0.0.1:4000/api/categories')
            dispatch({
                type: 'GETCATEGORIES',
                payload: response.data.listCategories
            })
        }
    },
    getSpecificGames: categoryId => {
        return async (dispatch, getState) => {
            const response = await Axios.get('http://127.0.0.1:4000/api/games/'+categoryId);
              const info = response.data;
            dispatch({
                type: 'GET_SPECIFIC_GAMES',
                payload: info
            })
        }
    },
    putCommentary: (idGame, content, token) => {
        return async (dispatch, getState) => {
            console.log(idGame, content, token)
            const response = await Axios.post(`http://localhost:4000/api/games/comments`, { idGame, content }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
    },
    getCommentaries: () => {
        return async (dispatch, getState) => {
            const response = await Axios.get(`http://localhost:4000/api/games/comments`)
            console.log(response.data)
            dispatch({
                type: 'GETCOMMENTARIES',
                payload: response.data.comment
            })
        }
    },

}

export default gamesActions