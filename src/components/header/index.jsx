import React from 'react'

import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setInputFilter } from '../configure/configure';
import { FaShoppingBasket } from 'react-icons/fa';
import { setProductBasket } from '../configure/configure';
import './index.scss'

function Header() {
  const inputFilter = useSelector((state) => state.filterProducts.inputFilter);
  const count = useSelector((state) => state.basketCount.count);
  const productBasket = useSelector((state) => state.productBasket.productBasket);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setInputFilter(e))
  }


  const logo =
    'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

  return (
    <div className='header-container' >
      <div className='header-container__top' >
        <p>Pinsoftta satış yapın</p>
        <p>100 TL Üzeri Alışverişe Kargo Bedava !</p>
        <div className='header-container__top-rigth__info' >
          <p>Kampyalar</p>
          <p>Sipariş Takipi</p>
          <p>Yardım ve Destek</p>
          <p>Markalar</p>
        </div>
      </div>
      <div className='header-container__lower' >
        <img src={logo} />
        <div className="header-container__input-group">
          <input
            placeholder="Search"
            type="text"
            value={inputFilter}
            className="form-control"
            onChange={(e) => handleChange(e.target.value)}
            aria-label="Dollar amount (with dot and two decimal places)"
          />
          <span className="input-group-text">
            <HiOutlineSearch />
          </span>
        </div>
        <div className='header-container__basket-group' >
          <div  className="header__basket">
            <p className="header__amount">{count}</p>
            <FaShoppingBasket className="header__icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header