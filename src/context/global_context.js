import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/global_reducer'
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE
} from '../actions';

const initialState = {
    isSidebarOpen: false
};

//context
const GlobalContext = React.createContext();

//provider
export const GLobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }

    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }
    
    const valuesToShare = {
        openSidebar,
        closeSidebar,
        ...state
    }

    return (
        <GlobalContext.Provider value={valuesToShare}>
            {children}
        </GlobalContext.Provider>
    )
}

//use context
export const useGLobalContext = () => {
    return useContext(GlobalContext)
}
