// src/ProductCards.js
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';
import './App.css';

function ProductCards() {
    const { selectedCategories, setSelectedCategories, filteredProducts, setFilteredProducts } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const categories = ["Starter", "Meal", "Tiffin", "Dessert", "Beverage", "Snack"]; // Add this line

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/');
                const data = await response.json();
                const initializedProducts = data.map(product => ({
                    ...product,
                    count: 1,
                    cartVisible: false
                }));

                setProducts(initializedProducts);
                setFilteredProducts(initializedProducts);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [setFilteredProducts]);

    useEffect(() => {
        const productCards = document.querySelectorAll('.product-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });

        productCards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, [products,filteredProducts]);

    useEffect(() => {
        const updatedFilteredProducts = selectedCategories.length === 0 
            ? products 
            : products.filter(product => selectedCategories.includes(product.category));
        
        setFilteredProducts(updatedFilteredProducts);
    }, [selectedCategories, products, setFilteredProducts]);

    const handleIncr = (productId) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, count: product.count + 1, cartVisible: true } : product
            )
        );
    };

    const handleDicr = (productId) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, count: Math.max(product.count - 1, 0), cartVisible: product.count - 1 > 0 } : product
            )
        );
    };

    const handleAdd = (productId) => {
        console.log(productId)
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId ? { ...product, cartVisible: true } : product
            )
        );
    };

    const toggleCategory = (item) => {
        setSelectedCategories(prevSelected => {
            const updatedCategories = prevSelected.includes(item) 
                ? prevSelected.filter(i => i !== item) 
                : [...prevSelected, item];
                
            const updatedFilteredProducts = updatedCategories.length === 0 
                ? products 
                : products.filter(product => updatedCategories.includes(product.category));
            
            setFilteredProducts(updatedFilteredProducts);
            return updatedCategories;
        });
    };

    return (
        <div className="categories">
            <main className="main-content">
                <div className='selection'>
                    {categories.map((item, index) => (
                        <button 
                            key={index}
                            id={selectedCategories.includes(item) ? 'selected' : ''}
                            onClick={() => toggleCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="product-grid">
                    {console.log(filteredProducts)}
                    {filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className='imgdiv'>
                                <img src={product.imgLink} alt={product.name} />
                            </div>
                            <div className='infodiv'>
                                <h3>{product.name}</h3>
                                <p>⭐{product.rating}</p>
                                <p className='price'>₹{product.price}</p>
                                <p>{product.description}</p>
                                
                                {!product.cartVisible && (
                                    <button className='button' onClick={() => handleAdd(product.id)}>ADD</button>
                                )}
                                {product.cartVisible && (
                                    <div className='cartbtn'>
                                        <button onClick={() => handleIncr(product.id)}>+</button>
                                        <p className='Itemsno'>{product.count}</p>
                                        <button onClick={() => handleDicr(product.id)}>-</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductCards;
