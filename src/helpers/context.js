import React, { useContext , useReducer } from 'react'
import { reducer } from './reducer'

import data from '../data/data'

const AppContext = React.createContext()

const initialState = {
    comments : data.comments,
    currentUser : data.currentUser,
    stateID:5
}
const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    //DELETE / REPLY / COMMENT
    const addComment = (value) => {
        dispatch({type:"ADD_COMMENT",payload:{value}})
    }
    const addReply = (value,id)=>{
        dispatch({type:"ADD_REPLY",payload:{value,id}})   
    }
    const addToReply = (value,id)=>{
        dispatch({type:"ADD_TO_REPLY",payload:{value,id}})   
    }
    // const deleteComment = (id) => {
    //     dispatch({type:"DELETE_COMMENT",payload:{id}})
    //     console.log(id);
    // }

    const incrementScore = (value) => {
        return value+1
    }
    const decrementScore = (value) => {
        return value-1
    }
    return ( 
        <AppContext.Provider value={{
            ...state,
            addComment,
            addReply,
            addToReply,
            incrementScore,
            decrementScore
        }}>
            {children}
        </AppContext.Provider>
        );
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext , AppProvider};