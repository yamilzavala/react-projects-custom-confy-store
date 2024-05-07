import { filterBy, orderBy } from '../utils/helpers'
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  // let maxPrice;
  // if(action.payload) {
  //   maxPrice = Math.max(...action.payload.map(product => product.price))
  // } 
 
  if(action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
         ...state.filters,
         max_price: 30000,//maxPrice,
         price: 30000, //maxPrice,
      }
    }
  }
  if(action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
      list_view: false
    }
  }
  if(action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
      list_view: true
    }
  }
  if(action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload
    }
  }
  if(action.type === SORT_PRODUCTS) {
    const {sort, filtered_products} = state;
    const tempProducts = [...filtered_products]
    return {
      ...state,
      filtered_products: orderBy(sort, tempProducts)
    }
  }
  if(action.type === FILTER_PRODUCTS) {
    const {all_products} = state;
    let tempProducts = [...all_products];
    tempProducts = filterBy(state.filters, tempProducts);
    return {
      ...state,
      filtered_products: tempProducts
    }
    
    // return {
    //   ...state,
    //   filtered_products: orderBy(sort, tempProducts)
    // }
  }
  if(action.type === UPDATE_FILTERS) {   
    const {name, value} = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value
      }
    }
  }
  if(action.type === CLEAR_FILTERS) { 
    return {
      ...state,
      filters: {
        ...action.payload.filters
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
