import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  return <ShoppingCartContext.Provider value={{}}>
    {children}
  </ShoppingCartContext.Provider>
}

// function getQuant(id) {
//   return cartItems.find(item => item.id === id)?.quant || 0
// }