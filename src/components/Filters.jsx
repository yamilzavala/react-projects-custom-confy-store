import React, { useState } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: { text, category, company, color, min_price, max_price, price, freeShipping },
    updateFilters,
    clearFilters,
    all_products
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const colors = getUniqueValues(all_products, 'colors');
  const companies = getUniqueValues(all_products, 'company');

  const clearFiltersHandler = () => {
    clearFilters()
  }

  return <Wrapper>
    <form onSubmit={e => e.preventDefault()}>
      {/*start search input */}
      <div className="form-control">
        <input placeholder='search' name='text' type="text" className='search-input' value={text} onChange={updateFilters}/>
      </div>
      {/*end search input */}

      {/*start category */}
      <div className='form-control'>
      <h5>category</h5>
        {
          categories.map((currentCategory, idx) => {
            return (
              <button 
              key={idx} 
              name='category'
              type='button'
              onClick={updateFilters}
              className={category === currentCategory.toLowerCase() ? 'button active' : 'button'}
              >
                {currentCategory}
              </button>
            )
          })
        }
      </div>
      {/*end category */}

      {/*start companies */}
      <div className="form-control">
      <h5>companies</h5>
        <select className='company' name="company" onChange={updateFilters} value={company}>
          {
            companies.map((currentCompany, idx) => {
              return (
                <option 
                key={idx} 
                value={currentCompany}
                >    
                  {currentCompany}            
                </option>
              )
            })
          }
        </select>
      </div>
      {/*end companies */}

      {/*start colors */}
      <div className="form-control">
        <h5>colors</h5>
        <div className="colors">
          {
            colors.map((currentColor, idx) => {
              if(currentColor === 'all') return <button  name='color' data-color={currentColor} className={currentColor === color ? 'all-btn active' : 'all-btn'} onClick={updateFilters}>all</button>
              return (
                <button 
                name='color'
                key={idx} 
                data-color={currentColor}
                // onClick={(e) => {updateFilters({target: {name:'color', value: currentColor}})} }
                onClick={updateFilters}
                className={currentColor === color ? 'color-btn active' : 'color-btn'}
                style={{backgroundColor: currentColor}}> 
                {currentColor === color && <FaCheck/>}               
                </button>
              )
            })
          }
        </div>
      </div>
      {/*end colors */}
      
      {/*start price */}
      <div className="form-control">
        <h5>price</h5>
        <div>
          <p>{formatPrice(price)}</p>
          <input name='price' className='price' type="range" value={price} min={min_price} max={max_price} onChange={updateFilters}/>
        </div>
      </div>
      {/*end price */}

      {/*start shipping */}
      <div className="form-control shipping">
        <label htmlFor="freeShipping">free shipping</label>
        <input name='freeShipping' id='freeShipping' type="checkbox" checked={freeShipping} onChange={updateFilters}/>
      </div>
      {/*end shipping */}      
    </form>

    {/* start clear filters */}
      <button type="button" className="clear-btn" onClick={clearFiltersHandler}>clear filters</button>
    {/* end clear filters */}
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
