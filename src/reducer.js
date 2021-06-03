// current state before update
// action what were trying to do
// switch statement possible with reducer
const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  //  if item id matches item id passing in payload increase
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      //   filter method to get rid of negative values from decrease item in cart
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        console.log(price, amount);
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      //   separate variables, same properties from initialstate in context.js
      // returns object with two values

      // two values out of cartItem
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  return state;
};

export default reducer;
