import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import data from '../../assets/data';

import { setSelectedCategory } from '../configure/configure';
import './index.scss';

function SideBar() {
  const selectedCategory = useSelector((state) => state.optionCategory.selectedCategory);
  const active = useSelector((state) => state.activeBasket.active);
  
  const [isOpen, setIsOpen] = useState(false);
  
  const dispatch = useDispatch();

  const handleClickCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleToggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));

  return (
    <div className={`sideBar-container  ${active ? 'container-opacity' : ''}`}>
      <div className="sideBar-container__dropdown">
        <div className="dropdown-header" >
          <div className='dropdown-header__h2' >
            <h2 onClick={handleToggleDropdown} >Categories</h2>
            {isOpen && (
              <div className="dropdown-content">
                {uniqueCategories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => handleClickCategory(category)}
                    className={selectedCategory === category ? 'active' : ''}
                  >
                    <p>{category}</p>
                  </div>
                ))}
              </div>
            )}
            <h2>Brands</h2>
            <h2>Sellers</h2>
            <h2>Price Range</h2></div>
          {/* <p className='dropdown-header__open' onClick={handleToggleDropdown}>{isOpen ? '-' : '+'}</p> */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
