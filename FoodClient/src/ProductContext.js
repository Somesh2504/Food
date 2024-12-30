// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    return (
        <ProductContext.Provider value={{ selectedCategories, setSelectedCategories, filteredProducts, setFilteredProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
