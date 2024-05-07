import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { GLobalContextProvider } from './context/global_context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider 
        domain={process.env.REACT_APP_AUTH_DOMAIN} 
        clientId={process.env.REACT_APP_AUTH_CLIENT_ID}          
        cacheLocation='localstorage'
        redirectUri={window.location.origin}
        authorizationParams={{
            redirect_uri: `${window.location.origin}/cart`,
          }}
        >
        <UserProvider>
            <GLobalContextProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </GLobalContextProvider>
        </UserProvider>
    </Auth0Provider>
);
