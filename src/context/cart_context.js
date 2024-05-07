import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || []
}

const initialState = {
  cart: getCartFromLocalStorage(),
  total_amount: 0,
  total_items: 0,
  shipping_fee: 534
}

//context
const CartContext = React.createContext()

//provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItemToCart = (item) => {
    dispatch({type: ADD_TO_CART, payload: item})
  }

  const removeItem = (id) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id})
  }

  const toggleAmount = (id, value) => { 
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT,payload: {id, value}})
   }
  
  const clearCart = () => { 
    dispatch({type: CLEAR_CART})
   }

  useEffect(() => {
    dispatch({type: COUNT_CART_TOTALS})
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },[state.cart])

  const valuesToShare = {
    addItemToCart,
    removeItem,
    toggleAmount,
    clearCart,
    ...state
  }

  return (
    <CartContext.Provider value={valuesToShare}>{children}</CartContext.Provider>
  )
}

// make sure use - hook
export const useCartContext = () => {
  return useContext(CartContext)
}
