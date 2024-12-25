import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../../context/cartContext';

export default function Allorders() {
  const { selectedProducts } = useContext(cartContext);
  const [storedProducts, setStoredProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
    setStoredProducts(savedProducts);
  }, []);

  useEffect(() => {
    if (selectedProducts?.length > 0) {
      localStorage.setItem('savedProducts', JSON.stringify(selectedProducts));
      setStoredProducts(selectedProducts);
    }
  }, [selectedProducts]);

  return (
    <div className="flex flex-wrap py-2 mx-10 justify-center">
      {storedProducts?.map((product) => (
        <div key={product.product.id} className="md:w-1/4 px-4 py-3 p-3">
          <div className="shadow-md hover-shadow product-card">
            <img className="w-full" src={product.product.imageCover} alt="" />
            <h4 className="text-green-500 text-xl">{product?.category?.name}</h4>
            <p className="font-semibold">
              {product.product.title.split(' ').slice(0, 2).join(' ')}
            </p>
            <div className="row justify-between items-center px-3">
              <span className="text-green-700">{product.price} EGP</span>
              <span className="fa-solid fa-star text-yellow-300">
                <span className="text-black text-xs">{product.product.ratingsAverage}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
