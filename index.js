let users = [];
let user = {};
let products = [];
const cart = {};

const addToCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  showCart();
};

const increment = (id) => {
  cart[id] += 1;
  showCart();
};

const decrement = (id) => {
  cart[id] -= 1;
  if (cart[id] < 1) delete cart[id];
  console.log(cart);
  showCart();
};

const showTotal = () => {
  let total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
  }, 0);

  document.getElementById("divTotal").innerHTML = `<h1>Total: $${total}</h1>`;
};

const showCart = () => {
  let str = "";
  products.forEach((value) => {
    if (cart[value.id]) {
      str += `
        <li>${value.name} - $${value.price} 
        <button onclick='decrement(${value.id})'>-</button>
        ${cart[value.id]}
        <button onclick='increment(${value.id})'>+</button>
        - $${value.price * cart[value.id]}</li>`;
    }
  });

  document.getElementById("divCart").innerHTML = str;
  document.getElementById("items").innerText = Object.keys(cart).length;
  showTotal();
};

const showProducts = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => (products = data))
    .then(()=>{
      let str = "<div class='row'>";
      products.map((value) => {
        str += `
          <div class='box'>
            <h3>${value.name}</h3>
            <p>${value.desc}</p>
            <h4>Rs: ${value.price}</h4>
            <button onclick='addToCart(${value.id})'>Add to Cart</button>
          </div>`;
      });
      divProducts.innerHTML = str + "</div>";
    });
};

const displayCart = () => {
  document.getElementById("divCartBlock").style.left = "80%";
};

const hideCart = () => {
  document.getElementById("divCartBlock").style.left = "100%";
};

const addUser = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = { 
    name: name, 
    email: email, 
    password: password, 
    dob :dob, 
    balance: 0 };
  users.push(user);
  showLogin();
};

function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i];
      showMain();
      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
  }
}

const showForm = () => {
  let str = `
  <div class="Registration">
  <div >
    <h2>Registration Form</h2>
    <p><input type="text" id="name" placeholder="Name"></p>
    <p><input type="text" id="email" placeholder="Email"></p>
    <p><input type="password" id="password" placeholder="Password"></p>
    <p><input type="date" id="dob"></p>
    <p><button onclick='addUser()'>Submit</button></p>
    <p>Already a member? <button onclick='showLogin()'>Login Here</button></p>
  </div>
  </div>`;

  root.innerHTML = str;
};

const showLogin = () => {
  let str = `
  <div class="Login">
  <div >
    <h2>Login Form</h2>
    <div id='msg'></div>
    <p><input id="email" type="text" placeholder="Email"></p>
    <p><input id="password" type="password" placeholder="Password"></p>
    <button onclick='chkUser()'>Log In</button>
    <p><button onclick='showForm()'>Create Account</button></p>
  </div>
  </div>`;

  root.innerHTML = str;
};
const showOrders=()=>{
  let str=`<div onclick="showProducts()">
  Hello World
  </div>`;
  divProducts.innerHTML=str
}

const showMain = () => {
  let str = `
    <div class="container">
      <div class="header">
        <h1>My Store</h1>
        <div class="top_right">
        <li onClick="showProducts()">Home</li>
        <li onClick="showOrders()">Orders</div>
        <li onclick="displayCart()"> Cart: <span id="items"></span></li>
        <li onclick='showLogin()'>Logout</li>
        </div>
      </div>
      <div class="productBlock">
        <div id="divProducts"></div>
      </div>
      <div id="divCartBlock" class="cartBlock">
        <h1>My Cart:</h1>
        <div id="divCart"></div>
        <div id="divTotal"></div>
        <br>
        <button onclick="hideCart()">Close</button>
      </div>
      <footer>
        <h4>&copy; 2025. All rights reserved.</h4>
      </footer>
    </div>`;

  root.innerHTML = str;
  showProducts();
};
