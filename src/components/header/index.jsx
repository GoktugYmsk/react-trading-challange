import React from 'react'

import { HiOutlineSearch } from 'react-icons/hi';
import './index.scss'

function Header() {

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
            className="form-control"
            aria-label="Dollar amount (with dot and two decimal places)"
          />
          <span className="input-group-text">
            <HiOutlineSearch />
          </span>
        </div>
        <div className='header-container__basket-group' >
          basket
        </div>
      </div>
    </div>
  )
}

export default Header