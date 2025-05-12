import API from "/services/API.js";
import Store from "/services/Store.js";
import { loadData } from "/services/Menu.js";
import Router from "./services/Router";

import { DetailsPage } from "./components/DetailsPage.js";
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {};
app.Store = Store;
app.Router = Router;

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.Router.init();
});

window.addEventListener("appcartchange", (e) => {
  const badge = document.getElementById("badge");
  const qty = app.Store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
