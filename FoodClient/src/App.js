// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductProvider } from './ProductContext';
import Header from './header';
import ProductCards from './ProductCard';

function App() {
    return (
        <ProductProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductCards />} />
                </Routes>
            </Router>
        </ProductProvider>
    );
}

export default App;
