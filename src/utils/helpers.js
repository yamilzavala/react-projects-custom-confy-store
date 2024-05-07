export const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", 
    {
        style: "currency", 
        currency: "USD"
    }).format(value/100)
}

export const getUniqueValues = (data, type) => {
    let unique = data.map(item => item[type])
    if(type === 'colors') {
        unique = unique.flat()
    } 
    return['all', ...new Set(unique)]   
}

export const orderBy = (filterValue, list) => {
    if(filterValue === 'name(A-Z)') return list.sort((a,b) => a.name.localeCompare(b.name));
    if(filterValue === 'name(Z-A)') return list.sort((a,b) => b.name.localeCompare(a.name));
    if(filterValue === 'price(Lowest)') return list.sort((a,b) => a.price - b.price);
    if(filterValue === 'price(Highest)') return list.sort((a,b) => b.price - a.price);
}

export const filterBy = (filters, tempProducts) => {
    const {text, category, company, color, price, freeShipping} = filters;
    //name filter
    if(text !== '') {
        tempProducts = tempProducts.filter(product => product.name.toLowerCase().startsWith(text))
    }
    //category filter
    if(category !== 'all') {
        tempProducts = tempProducts.filter(product => product.category === category)
    }
    //company filter
    if(company !== 'all') {
        tempProducts = tempProducts.filter(product => product.company === company)
    }
    //colors filter
    if(color !== 'all') {
        tempProducts = tempProducts.filter(product => {
            return product.colors.find(currentColor => currentColor === color)
        })
    }
    //price filter
    tempProducts = tempProducts.filter(product => product.price <= price)
    //shipping filter
    if(freeShipping) {
        tempProducts = tempProducts.filter(product => product.shipping === true)
    }
    
    return tempProducts
}

export const listSortByOptions = [
    'name(A-Z)', 
    'name(Z-A)', 
    'price(Lowest)', 
    'price(Highest)'
]
