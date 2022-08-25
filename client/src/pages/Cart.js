import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import CartX from '../components/Cart';

function Cart(props) {
  return (
    <section className='container'>
      <CartX />
    </section>
  )
}

export default Cart;