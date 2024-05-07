import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from '../components'
import { AboutPage, CartPage, CheckoutPage, ErrorPage, HomePage, PrivateRoute, ProductsPage, SingleProductPage } from '../pages'
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

// Router
const  WrapperRouter = () => {
    return (
        <Router>
            <Navbar/>
            <Sidebar/>
            <Routes>
                <Route  path="/" element={<HomePage/>} />
                <Route  path="/about" element={<AboutPage/>} />
                <Route  path="/cart" element={<CartPage/>} />
                <Route  path="/products" element={<ProductsPage/>} />
                <Route  path="/products/:id" element={<SingleProductPage/>} />
                <Route  path="/checkout" 
                        element={
                            <PrivateRoute>
                                <CheckoutPage/>    
                            </PrivateRoute>
                        }
                    />
                <Route  path="*" element={<ErrorPage/>} />
            </Routes>
            <Footer/>
        </Router>
    )
} 

//Provider
const WrapperRouterProvider = ({children}) => {
    const {isLoading, error} = useAuth0();
    if(isLoading) {
        return (
            <Wrapper>
                <h1>Loading...</h1>
            </Wrapper>
        )
    }
    if(error) {
        return (
            <Wrapper>
                <h1>{error.message}</h1>
            </Wrapper>
        )
    }
    return (
        <WrapperRouter>
            {children}
        </WrapperRouter>
    );
};

export default WrapperRouterProvider;

//styles
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

