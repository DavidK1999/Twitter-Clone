import * as CardActionTypes from '../actionTypes/card'

export const post = (data, route) => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/${route}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type' : 'application/json',
                    'auth-token': window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            dispatch({type: CardActionTypes.POST, value: parsedResponse})
        } catch (error) {
            console.log('Authenticate Error', error)
        }
    }
}

export const getPosts = () => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/all`, {
                headers: {
                    'auth-token' : window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            dispatch({type: CardActionTypes.READ, value: parsedResponse})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getPersonalPosts = () => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/personal`, {
                headers: {
                    'auth-token' : window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            dispatch({type: CardActionTypes.READ, value: parsedResponse})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getProfilePosts = profile => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/profile/${profile}`, {
                headers: {
                    'auth-token' : window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            dispatch({type: CardActionTypes.READ, value: parsedResponse})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getLikedPosts = profile => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/likes/${profile}`, {
                headers: {
                    'auth-token': window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            dispatch({type: CardActionTypes.READ, value: parsedResponse})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getTaggedPosts = tag => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/tagged/${tag}`, {
                headers: {
                    'auth-token': window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            dispatch({type: CardActionTypes.READ, value: parsedResponse})
        } catch (error) {
            console.log(error)
        }
    }
}

export const upvotePost = post => {
    return async dispatch => {
        try {
            console.log(post)
            const response = await fetch(`/api/card/upvote/${post}`, {
                method: 'PUT',
                headers: {
                    'auth-token': window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            dispatch({type: CardActionTypes.UPVOTE, value: parsedResponse})
        } catch (error) {
            console.log(error)
        }
    }
}

export const deletePost = post => {
    return async dispatch => {
        try {
            const response = await fetch(`/api/card/delete/${post}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': window.sessionStorage.token
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse)
           if(parsedResponse.status === 400) return
           if(parsedResponse.status === 200) {
               dispatch({type: CardActionTypes.DELETE, value: post})
            }
        } catch (error) {
            console.log(error)
        }
    }
}



