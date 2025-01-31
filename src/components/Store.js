import initialStoreItems from '../store-items'
import {useState} from 'react'

import StoreItem from './StoreItem'

export default function Store({addOneToQuantity, cartItems, setCartItems}) {

    const [storeItems, setStoreItems] = useState(initialStoreItems)

    let index = 0
    let fruitIsAlreadyInCart = false

    const addItemToCart = (item) => {
      checkIfFruitIsAlreadyInCart(item)
      if (fruitIsAlreadyInCart) {
        addOneToQuantity(item)
      } else {
        createItemInCart(item)
      }
    }

    const createItemInCart = (item) => {
      // Crazy immutable state create method taken from the slides
      item.quantity = 1
      const newCartItems = [...cartItems]
      newCartItems.push(item)
      setCartItems(newCartItems)
    }

    function checkIfFruitIsAlreadyInCart(newFruit) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === newFruit.name) {
          fruitIsAlreadyInCart = true;
          index = i;
          break
        } else {
          fruitIsAlreadyInCart = false
        }
      }
    }

    return (
        <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">

          {storeItems.map((item, index) => {
            return (
              <StoreItem item={item} index={index} addItemToCart={addItemToCart} key={index}/>
            )
          
          })}

        </ul>
      </header>
    )
}