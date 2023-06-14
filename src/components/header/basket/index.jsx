import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../configure/configure';
import { setProductBasket } from '../../configure/configure';
import './index.scss';

function Basket() {
  const productBasket = useSelector((state) => state.productBasket.productBasket);
  const active = useSelector((state) => state.activeBasket.active);

  const dispatch = useDispatch();

  const handleCloseBasket = () => {
    dispatch(setActive(false));
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

  console.log(productBasket.title, 'title');

  return (
    <>
      {active && (
        <div className='container-basket'>
          <p className='basket-close' onClick={handleCloseBasket}>X</p>
          <div className='container-basket__box'>
            {productBasket.length > 0 ? (
              <div className="basket-modal__box">
                {productBasket.map((product, index) => (
                  <div key={index} className='basket-modal__list'>
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Basket;
