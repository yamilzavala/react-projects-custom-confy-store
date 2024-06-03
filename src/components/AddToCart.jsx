import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({product}) => {
  const {colors, id, stock} = product;
  const [mainColor, setMainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1);
  const {addItemToCart} = useCartContext()
  const increase = () => {
    if(amount > stock) return;
    setAmount(amount + 1)
  }

  const decrease = () => {
    if(amount === 1) return;
    setAmount(amount - 1)
  }


  const addToCart = () => {
    const item = {
      id,
      color: mainColor,
      amount,
      product
    }
    addItemToCart(item)
  }

  return <Wrapper>
    {/* colors */}
    <div className="colors">
      <span>Colors: </span>
      <div>
        {colors.map((color,idx) => (
          <button key={idx} className={color === mainColor ? 'active color-btn' : 'color-btn'} style={{backgroundColor: color}} onClick={() => setMainColor(color)}>
            {color === mainColor && <FaCheck/>}
          </button>
        ))}
      </div>
    </div>

    {/* amount */}
    <div className="btn-container">
      <AmountButtons increase={increase} decrease={decrease} amount={amount} stock={stock}/>
      <Link to='/cart' className='btn' onClick={addToCart}>Add to cart</Link>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
    text-align: center;
  }
`
export default AddToCart
