import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductBasket } from '../configure/configure';
import { setCount } from '../configure/configure';
import data from '../../assets/data';
import './index.scss';

function Content() {
  const selectedCategory = useSelector((state) => state.optionCategory.selectedCategory);
  const inputFilter = useSelector((state) => state.filterProducts.inputFilter);
  const productBasket = useSelector((state) => state.productBasket.productBasket);
  const count = useSelector((state) => state.basketCount.count);

  const [selectedProductList, setSelectedProductList] = useState([]);

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
  };
  const removeToBasket = (product) => {
    const increaseCount = count + 1;
    const sendSelectedProducts = [...productBasket, product]
    dispatch(setProductBasket(sendSelectedProducts))
    dispatch(setCount(increaseCount))
    setSelectedProductList((prevList) => [...prevList, product]);
  }

  const removeFromBasket = (product) => {
    const increaseCount = count - 1;
    const sendSelectedProducts = [...productBasket, product]
    dispatch(setProductBasket(sendSelectedProducts))
    dispatch(setCount(increaseCount))
    setSelectedProductList((prevList) => [...prevList, product]);
    setSelectedProductList((prevList) => prevList.filter((item) => item.title !== product.title));
  };

  const isProductSelected = (product) => {
    return selectedProductList.some((item) => item.title === product.title);
  };

  return (
    <div className="content-container">
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
    </div>
  );
}

export default Content;
