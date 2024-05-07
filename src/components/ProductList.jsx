import React, {useEffect} from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products: products,  grid_view, list_view} = useFilterContext();

  if(!products.length) return <h5> Sorry, no products matched your search...</h5>

  if(list_view) return <ListView products={products}/>
  if(grid_view) return <GridView products={products} />
}

export default ProductList
