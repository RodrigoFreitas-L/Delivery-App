if (!JSON.parse(localStorage.getItem('userCart'))) {
  localStorage.setItem('userCart', JSON.stringify([]));
}

const getCartItems = () => JSON.parse(localStorage.getItem('userCart'));

const addToCart = (product) => {
  if (product) {
    const cartItems = getCartItems();
    const newCartItems = ([...cartItems, product]);
    localStorage.setItem('userCart', JSON.stringify(newCartItems));
  }
};

const removeItemCart = (productId) => {
  const cartItems = getCartItems();
  const cartItemProduct = cartItems.filter((element) => element.id === productId.id);
  cartItemProduct.pop();
  const cartItemsFilter = cartItems
    .filter((element) => element.id !== productId.id);
  const newCartItems = [...cartItemProduct, ...cartItemsFilter];
  localStorage.setItem('userCart', JSON.stringify(newCartItems));
};

const removeItemAll = (productId) => {
  const cartItems = getCartItems();
  const cartItemsFilter = cartItems
    .filter((element) => element.id !== productId.id);
  localStorage.setItem('userCart', JSON.stringify(cartItemsFilter));
};

const clearCart = () => {
  localStorage.setItem('userCart', JSON.stringify([]));
};

export { addToCart, getCartItems, removeItemCart, clearCart, removeItemAll };
