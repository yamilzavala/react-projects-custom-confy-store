import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  //add item
  if(action.type === ADD_TO_CART) {
    const {amount, product, id, color } = action.payload;
    const tempItem = state.cart.find(product => product.id === id + color)
    if(tempItem) {     
      const newCartState = state.cart.map(cartItem => {
        if(cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if(newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return {...cartItem, amount: newAmount};
        } else {
          return cartItem
        }
      })
      return {
        ...state,
        cart: newCartState,
      }
    } else {
      const newItem = {
        name: product.name,
        amount, 
        id: id + color, 
        color,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return {
        ...state,
        cart: [...state.cart, newItem],
      }     
    }
  }
  //remove item
  if(action.type === REMOVE_CART_ITEM) {
    const newCartState = state.cart.filter(cartItem => cartItem.id !== action.payload)
    return {
      ...state,
      cart: newCartState
    }
  }
  //clear cart
  if(action.type === CLEAR_CART) {    
    return {
      ...state,
      cart: []
    }
  }
  //toggle amount
  if(action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, value} = action.payload;
    const newCartState = state.cart.map(item => {
      if(item.id === id) {
        if(value === 'inc' ){
          let newAmount = item.amount + 1;
          if(newAmount > item.max) {
            newAmount = item.max;
          }
          return {...item, amount: newAmount}
        } 
        if(value === 'dec' ){
          let newAmount = item.amount - 1;
          if(newAmount < 1) {
            newAmount = 1;
          }
          return {...item, amount: newAmount}
        }       
      }
      return item;      
    })

    return {
      ...state,
      cart: newCartState
    }
  }
  //totals
  if(action.type === COUNT_CART_TOTALS) {
    const {total_amount, total_items} = state.cart.reduce((total, cartItem) => {
      const {amount, price} = cartItem;
      total.total_amount += (amount * price)
      total.total_items += amount;
      return total
    }, {total_amount: 0, total_items: 0})
    return {
      ...state,
      total_items,
      total_amount
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
