import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  const starsArr = Array.from({length: 5}, (_,idx) => {
    return idx + 1
  })

  return <Wrapper>    
      {starsArr.map(star => {
        return (
            <span key={star}>
              {stars >= star ? 
                <BsStarFill/> : stars >= (star - 0.5) ? 
                <BsStarHalf/> : <BsStar/>}
            </span>
            )
      })}
    <p className='reviews'>({reviews} customer reviews)</p> 
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
