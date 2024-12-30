// src/Header.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductContext } from './ProductContext';
import logo from './logo3.jpg';
import textlogo from './logoMM.png';
import './App.css';

function Header() {
    const { selectedCategories, setSelectedCategories } = useContext(ProductContext);
    const [menu, setMenu] = useState(false);
    const [type, setType] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategories(prevSelected => 
            prevSelected.includes(category) 
            ? prevSelected.filter(i => i !== category) 
            : [...prevSelected, category]
        );
    };

    return (
        
            <header className="fixed-header">
                <div className="logo">
                    <img src={logo} alt='logo' className='img1' />
                    <img src={textlogo} className='img2' alt='img2' />
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                </div>
                <nav className="menu">
                    <Link to="/">Home</Link>
                    <Link to="/"> <button className='categoribtn' onClick={toggleMenu}>categories</button></Link>
                    {menu && (
                        <ul className='categoriess'>
                            {['Starter', 'Meal', 'Tiffin', 'Dessert', 'Beverage', 'Snack'].map(category => (
                                <li key={category} onClick={() => handleCategoryClick(category)}>{category}</li>
                            ))}
                        </ul>
                    )}
                     <Link to="/"> <button className='categoribtn' onClick={() => setType(!type)}>types</button></Link>
                   
                    {type && (
                        <ul className='categoriess'>
                            <li>Veg</li>
                            <li>Non-Veg</li>
                        </ul>
                    )}
                </nav>
            </header>
        
    );
}

export default Header;
