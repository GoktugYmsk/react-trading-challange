import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { setInputFilter } from '../configure/configure';
import { FaShoppingBasket } from 'react-icons/fa';
import { setActive } from '../configure/configure';
import './index.scss';

function Header() {
  const inputFilter = useSelector((state) => state.filterProducts.inputFilter);
  const count = useSelector((state) => state.basketCount.count);
  const active = useSelector((state) => state.activeBasket.active);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setInputFilter(e));
  };

  const logo =
    'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

  const handleBasketClick = () => {
    dispatch(setActive(true));
  };

  const handleIconClick = () => {
    setIsInputFocused(true);
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerLower = document.querySelector('.header-container__lower');
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        headerLower.style.position = 'fixed';
      } else {
        headerLower.style.position = 'relative';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header-container ${active ? 'container-opacity' : ''}`}>
      <div className="header-container__top">
        <p>Pinsoftta satış yapın</p>
        <p>100 TL Üzeri Alışverişe Kargo Bedava !</p>
        <div className="header-container__top-rigth__info">
          <p>Kampanyalar</p>
          <p>Sipariş Takibi</p>
          <p>Yardım ve Destek</p>
          <p>Markalar</p>
        </div>
      </div>
      <div className="header-container__lower">
        <img src={logo} alt="Logo" />
        <div className="header-container__input-group">
          <input
            placeholder="Search"
            ref={inputRef}
            type="text"
            value={inputFilter}
            className="form-control"
            onChange={(e) => handleChange(e.target.value)}
            aria-label="Dollar amount (with dot and two decimal places)"
          />
          <span className="input-group-text">
            <HiOutlineSearch onClick={handleIconClick} />
          </span>
        </div>
        <div className="header-container__basket-group">
          <div onClick={handleBasketClick} className="header__basket">
            <p className="header__count">{count}</p>
            <FaShoppingBasket className="header__icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
