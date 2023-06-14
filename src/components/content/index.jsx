import React from 'react'
import { setCategories } from '../configure/configure'
import data from '../../assets/data'
import './index.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Content() {
  const [list, setList] = useState(data)

  const categories = useSelector((state) => state.category.categories)

  return (
    <div className='content-container' >
      <div className='product-list' >
        {list.map((product, key) => {
          return (
            <div key={key}>

              <div className='product-box' >
                <img src={product.image} />
                <p className='product-title' >{product.title}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Content