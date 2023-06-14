import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../configure/configure';
import data from '../../assets/data';

import './index.scss';

function SideBar() {
  const selectedCategory = useSelector((state) => state.optionCategory.selectedCategory);
  const uniqueCategories = Array.from(new Set(data.map(item => item.category)));

  const dispatch = useDispatch()

  const handleClickCategory = (category) => {
    dispatch(setSelectedCategory(category))
  };

  return (
    <div className="sideBar-container">
      {uniqueCategories.map((category, index) => (
        <div
          onClick={() => handleClickCategory(category)}
          key={index}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default SideBar;
