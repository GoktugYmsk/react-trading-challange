import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import { setProductBasket } from '../configure/configure';
import { setCount } from '../configure/configure';
import data from '../../assets/data';
import './index.scss';

function Content() {
  const selectedCategory = useSelector((state) => state.optionCategory.selectedCategory);
  const inputFilter = useSelector((state) => state.filterProducts.inputFilter);
  const productBasket = useSelector((state) => state.productBasket.productBasket);
  const count = useSelector((state) => state.basketCount.count);

  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState()
  const [selectedProductList, setSelectedProductList] = useState([]);
  const active = useSelector((state) => state.activeBasket.active);

  const dispatch = useDispatch()

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
    const sendSelectedProducts = [...productBasket, product]
    dispatch(setProductBasket(sendSelectedProducts))
    dispatch(setCount(increaseCount))
    setSelectedProductList((prevList) => [...prevList, product]);
    setPopupMessage('Product successfully added to cart')
    setPopup(true)
  };

  const removeFromBasket = (product) => {
    const decreaseCount = count - 1;
    const sendSelectedProducts = productBasket.filter((item) => item.title !== product.title);
    dispatch(setProductBasket(sendSelectedProducts))
    dispatch(setCount(decreaseCount))
    setSelectedProductList((prevList) => [...prevList, product]);
    setPopupMessage('Product successfully removed to cart')
    setSelectedProductList((prevList) => prevList.filter((item) => item.title !== product.title));
  };

  const isProductSelected = (product) => {
    return selectedProductList.some((item) => item.title === product.title);
  };

  return (
    <div className={`content-container ${active ? 'container-opacity' : ''}`}>
      <div className="product-list">
        {filteredList.map((product, key) => (
          <div key={key}>
            <div className="product-box">
              <img src={product.image} alt={product.title} />
              <p className="product-title">{product.title}</p>
              {isProductSelected(product) ? (
                <button onClick={() => removeFromBasket(product)}>Remove from basket</button>
              ) : (
                <button onClick={() => addToBasket(product)}>Add to basket</button>
              )}
            </div>
          </div>
        ))}
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
