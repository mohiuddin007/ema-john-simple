import React, { useState, useEffect } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import loadingGif from '../../images/hzk6C.gif';

const Shop = () => {
    // const frist10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    document.title = "Shop More";

    useEffect(()=> {
        fetch('https://rocky-island-78364.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
        })
    },[])

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://rocky-island-78364.herokuapp.com/productsByKeys', {
           method: 'POST', 
           headers: { 'Content-Type': 'application/json'},
           body: JSON.stringify(productKeys)
       })
       .then(res => res.json())
       .then(data => setCart(data))
    },[])

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct =cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
           setCart(newCart);

           addToDatabaseCart(product.key, count);
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.length === 0 && <h3><img src={ loadingGif } alt=""/></h3>
                }
                {
                    products.map(pd => <Product
                        key = {pd.key}
                         showAddToCart = {true}
                         handleAddProduct = {handleAddProduct}
                         product={pd}
                         ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                     <Link to="/review">
                        <button className="main-button">Review Order</button>
                     </Link>
                </Cart>
            </div>
     
    
        </div>
    );
};

export default Shop;