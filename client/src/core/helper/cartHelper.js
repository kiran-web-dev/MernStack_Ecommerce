export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }
  return cart;
};

export const removeItemFromCart = (productId, next) => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    var removeIndex = cart.map((item) => item._id).indexOf(productId);
    removeIndex >= 0 && cart.splice(removeIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const updateQty = (productId, quantity, next) => {
  let cart = [];
  if (typeof window != undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product) => {
      if (product._id === productId) {
        product["quantity"] = quantity;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const cartEmpty = (next) => {
  if (typeof window != undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};
