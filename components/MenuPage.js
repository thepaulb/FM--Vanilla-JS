export class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/components/MenuPage.css?inline");
      const css = await request.text();
      console.log(css);
      styles.textContent = css;
    }
    loadCSS();
  }

  // fires when the element is attached to the DOM;
  connectedCallback() {
    const tmpl = document.getElementById("menu-page-template");
    const content = tmpl.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });

    this.render();
  }

  render() {
    const menu = this.root.querySelector("#menu");
    menu.innerHTML = "";
    if (app.Store.menu) {
      for (let category of app.Store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'>
          </ul>`;
        menu.appendChild(liCategory);

        category.products.map((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      menu.innerHTML = "Loading …";
    }
  }
}

customElements.define("menu-page", MenuPage);
