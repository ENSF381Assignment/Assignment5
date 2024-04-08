import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch('http://127.0.0.1:5000/products_api');
        const data = await response.json();
        setProducts(data.products);
      } catch (e) {
        console.log(e);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductList;
