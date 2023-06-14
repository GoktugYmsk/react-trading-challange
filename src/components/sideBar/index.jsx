import React from 'react';
import data from '../../assets/data';

import './index.scss';

function SideBar() {
  const uniqueCategories = Array.from(new Set(data.map(item => item.category)));

  return (
    <div className='sideBar-container'>
      {uniqueCategories.map(category => (
        <div key={category}>{category}</div>
      ))}
    </div>
  );
}

export default SideBar;
