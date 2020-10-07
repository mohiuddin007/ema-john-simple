import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    document.title = "Product Details";

    useEffect(()=>{
        fetch('https://rocky-island-78364.herokuapp.com/product/' + productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            setLoading(false);
        })
    }, [productKey])
    return (
        <div>
            <h1>Your product detail</h1>
            {
                loading ? <h3>loading...</h3> :
                <Product product={product} showAddToCart={false}></Product>
            }
            
        </div>
    );
};

export default ProductDetail;