import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  // SIDEBAR_OPEN,
  // SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}

//context
const ProductsContext = React.createContext()

//provider
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchProducts = async (url) => {
    dispatch({type: GET_PRODUCTS_BEGIN})
    try {
      const resp = await axios.get(url,{ headers: { Accept: 'application/json' } })  
      dispatch({type: GET_PRODUCTS_SUCCESS, payload: resp.data})      
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR})  
    }
  }

  const fetchSingleProduct = async (url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN})
    try {
      const resp = await axios.get(url)
      const singleProduct = resp.data;
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR})
    }
  }
  
  useEffect(() => {
    fetchProducts(url)
  },[])

  const valuesToShare = {
    fetchSingleProduct,
    ...state
  }

  return (
    <ProductsContext.Provider value={valuesToShare}>
      {children}
    </ProductsContext.Provider>
  )
}

// hook
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
