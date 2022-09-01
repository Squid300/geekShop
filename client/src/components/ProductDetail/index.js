import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { ShoppingCartContext } from "../../context/cartContext";
import './style.css'

function ProductDetail(props) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = props.item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...props.item, purchaseQuantity: 1 }
      });

      idbPromise('cart', 'put', { ...props.item, purchaseQuantity: 1 });
    }
  }

  return (
    <>
    <div className="item-container">
      <div className="item-name">
        <div className="item-name-inner">
          <Link to={`/products/${_id}`} className="item-text">
            <div>{name}</div>
            <div>Learn more ...</div>
          </Link>
        </div>
      </div>
      <img src={image} alt="Product"></img>
    </div>
    <div className="item-info">
      <div className="price-text">${price}</div>
      <div>{quantity} {pluralize("item", quantity)} in stock</div>
    </div>
    <div className="add-to-cart">
      <button key={_id} onClick={addToCart} data-id={_id}>Add to cart</button>
    </div>
    </>
  );
}

export default ProductDetail;
