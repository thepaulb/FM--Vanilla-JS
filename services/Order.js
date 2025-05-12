import { getProductById } from "./Menu.js";

export function placeOrder() {
  alert(
    "Your order will be ready under the number " + parseInt(Math.random() * 100)
  );
  app.Store.menu = [];
}

export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.Store.cart.filter(
    (prodInCart) => prodInCart.product.id == id
  );
  if (results.length == 1) {
    app.Store.cart = app.Store.cart.map((p) =>
      p.product.id == id ? { ...p, quantity: p.quantity + 1 } : p
    );
  } else {
    app.Store.cart = [...app.Store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.Store.cart = app.Store.cart.filter(
    (prodInCart) => prodInCart.product.id != id
  );
}
