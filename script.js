let products = [];
let cart = [];

function addProduct() {
  const name = document.getElementById("product-name").value;
  const desc = document.getElementById("product-desc").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const img = document.getElementById("product-img").value;

  if (!name || !desc || !price || !img) return alert("Fill all fields!");

  const product = { id: Date.now(), name, desc, price, img };
  products.push(product);
  renderProducts();
}

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p><strong>£${p.price.toFixed(2)}</strong></p>
      <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
}

function toggleCheckout() {
  document.getElementById("checkout-modal").classList.toggle("hidden");
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  items.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - £${item.price.toFixed(2)}`;
    items.appendChild(li);
    sum += item.price;
  });
  total.textContent = sum.toFixed(2);
}

document.getElementById("checkout-btn").addEventListener("click", toggleCheckout);
