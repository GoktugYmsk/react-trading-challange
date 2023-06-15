import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RiDeleteBin5Fill } from 'react-icons/ri';

import { setCount, setActive, setProductBasket } from '../../configure/configure';
import './index.scss';

function Basket() {
  const productBasket = useSelector((state) => state.productBasket.productBasket);
  const active = useSelector((state) => state.activeBasket.active);
  const count = useSelector((state) => state.basketCount.count);

  const [basketCount, setBasketCount] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  
  const dispatch = useDispatch();
  
  const handleCloseBasket = () => {
    dispatch(setActive(false));
  };
  
  const handleCountChange = (productId, value) => {
    setBasketCount((prevCount) => ({
      ...prevCount,
      [productId]: value,
    }));
  };
  
  const handleDeleteProduct = (productId) => {
    const deleteProduct = productBasket.filter((product) => product.id !== productId);
    const updatedBasketCount = { ...basketCount };
    if (updatedBasketCount[productId]) {
      delete updatedBasketCount[productId];
      setBasketCount(updatedBasketCount);
    }
    dispatch(setProductBasket(deleteProduct));
    dispatch(setCount(count - 1));
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        dispatch(setActive(false));
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  useEffect(() => {
    if (productBasket.length > 0) {
      productBasket.forEach((product) => {
        if (!basketCount[product.id]) {
          setBasketCount((prevCount) => ({
            ...prevCount,
            [product.id]: 1,
          }));
        }
      });
    }
  }, [productBasket]);
  
  useEffect(() => {
    let total = 0;
    productBasket.forEach((product) => {
      const count = basketCount[product.id] || 0;
      const price = product.price * count;
      total += price;
    });
    setTotalPrice(total);
  }, [basketCount, productBasket]);
  
  const totalQuantity = Object.values(basketCount).reduce((sum, quantity) => sum + parseInt(quantity), 0);
  
  return (
    <>
      {active && (
        <div className='container-basket'>
          <div className='container-basket__top'>
            <p>My Basket({totalQuantity} product)</p>
            <p className='basket-close' onClick={handleCloseBasket}>X</p>
          </div>
          <div className='container-basket__box'>
            {productBasket.length > 0 ? (
              <div className="basket-modal__box">
                {productBasket.map((product, index) => (
                  <div key={index} className='basket-modal__list'>
                    <div className='basket-modal__products' >
                      <div className='basket-modal__products-image' >
                        <img src={product.image} alt={product.title} />
                      </div>
                      <div className='basket-modal__products-info' >
                        <p>{product.title}</p>
                        <p>adet: {basketCount[product.id] || 0}</p>
                        <p>{product.price} $</p>
                      </div>
                      <RiDeleteBin5Fill
                        className="basket-modal__list-icon"
                        onClick={() => handleDeleteProduct(product.id)}
                      />
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={basketCount[product.id] || 0}
                      onChange={(e) => handleCountChange(product.id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className='basket-empty' >Your cart is empty</p>
            )}
          </div>
          <div className='basket__total-price' >
            <h3>Subtotal:</h3>
            <h3>{parseFloat(totalPrice).toFixed(2)} $</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default Basket;
