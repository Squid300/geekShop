import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise, getToken } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import dropin from "braintree-web-drop-in"
import { useState } from 'react';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CartX = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [braintreeInstance, setBraintreeInstance] = useState(undefined)

  useEffect(() => {
    generateDropin();
  }, [state]);

  async function generateDropin() {
    const token = await getToken();
    if (state) {
      const initailizeBraintree = () => dropin.create({
        authorization: token.token,
        container: '#braintree-drop-in-div',
      }, function ( error, instance ) {
        if( error ) {
          console.log( error )
        } else {
          setBraintreeInstance(instance);
        }
      });

      if ( braintreeInstance ) {
        braintreeInstance
          .teardown()
          .then(() => {
            initailizeBraintree();
          });
      } else {
        initailizeBraintree();
      }
    }
  }

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      console.log(cart)
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            <div id={"braintree-drop-in-div"}/>

            {Auth.loggedIn() ? (
              <button className={"braintreePayButton"} type="submit" onClick={() => {
                if ( braintreeInstance ) {
                  braintreeInstance.requestPaymentMethod(( error, payload ) => {
                    if ( error ) {
                      console.error(error);
                    } else {
                      const nonce = payload.nonce
                      const price = calculateTotal();
                      console.log("nonce", nonce);
                      console.log("price", price)
                      const data = {"payment_method_nonce": nonce, "price": price}
                      const body = JSON.stringify(data);

                      fetch('/pay', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: body
                      })
                    }
                  })
                }
              }}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default CartX;
