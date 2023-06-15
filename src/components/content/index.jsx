import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

import data from '../../assets/data';
import { setProductBasket, setCount } from '../configure/configure';

import './index.scss';

function Content() {
  const selectedCategory = useSelector((state) => state.optionCategory.selectedCategory);
  const inputFilter = useSelector((state) => state.filterProducts.inputFilter);
  const productBasket = useSelector((state) => state.productBasket.productBasket);
  const active = useSelector((state) => state.activeBasket.active);
  const count = useSelector((state) => state.basketCount.count);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState();
  const [selectedProductList, setSelectedProductList] = useState([]);

  const dispatch = useDispatch();

  const filteredList = data.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    if (inputFilter && !product.title.toLowerCase().includes(inputFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  const addToBasket = (product) => {
    const increaseCount = count + 1;
    const sendSelectedProducts = [...productBasket, product];
    dispatch(setProductBasket(sendSelectedProducts));
    dispatch(setCount(increaseCount));
    setSelectedProductList((prevList) => [...prevList, product]);
    setPopupMessage('Product successfully added to cart');
    setPopup(true);
  };

  const removeFromBasket = (product) => {
    const decreaseCount = count - 1;
    const sendSelectedProducts = productBasket.filter((item) => item.title !== product.title);
    dispatch(setProductBasket(sendSelectedProducts));
    dispatch(setCount(decreaseCount));
    setSelectedProductList((prevList) => prevList.filter((item) => item.title !== product.title));
    setPopupMessage('Product successfully removed from cart');
    setPopup(true);
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [active]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className={`content-container ${active ? 'container-opacity' : ''}`}>
      <div className="product-list">
        {filteredList.map((product, index) => {
          const isInBasket = selectedProductList.some((item) => item.title === product.title);
          const isRemovedFromBasket = productBasket.some((item) => item.title === product.title);

          return (
            <div key={index}>
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="product-box"
              >
                <div className="product-box__topInfo">
                  <img src={product.image} alt={product.title} />
                  <p className="product-title">{product.title}</p>
                  <p className="product-box__topInfo-price">{product.price} $</p>
                </div>
                {hoveredIndex === index &&
                  (isRemovedFromBasket ? (
                    <button className='product-remove-button' onClick={() => removeFromBasket(product)}>
                      <p>Remove from basket</p>
                    </button>
                  ) : (
                    <button className='product-add-button' onClick={() => addToBasket(product)}>
                      <p>Add to basket</p>
                    </button>
                  ))
                }
              </div>
            </div>
          );
        })}
      </div>
      {popup && (
        <div className="toast-container">
          <Toast onClose={() => setPopup(false)} show={popup} delay={3000} autohide>
            <Toast.Body>{popupMessage}</Toast.Body>
          </Toast>
        </div>
      )}
    </div>
  );
}

export default Content;
