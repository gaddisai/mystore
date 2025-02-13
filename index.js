const products = [
  {
    id: 1,
    name: "Product1",
    price: 50,
    desc: "Burger",
  },
  {
    id: 2,
    name: "Product2",
    price: 100,
    desc: "Pizza",
  },
  {
    id: 3,
    name: "Product3",
    price: 150,
    desc: "Chicken Biryani",
  },
];
  const cart = {};
  const addToCart = (id) => {
    // const score = {};
    // score["maths"] = 95;
    // score["maths"] = score["maths"] + 2
    // console.log(score);
    if(!cart[id]) cart[id] = 1;
    showCart();
  };
  const increment = (id) => {
    cart[id] = cart[id] + 1;
    showCart();
  };
  const decrement = (id) => {
    cart[id] = cart[id] - 1;
    cart[id] < 1 && delete cart[id];
    console.log(cart);
    showCart();
  };
  const showTotal = () => {
    let total = products.reduce((sum, value) => {
      return sum + value.price * (cart[value.id] ? cart[value.id] : 0);
    }, 0);

    divTotal.innerHTML = `<h1>Total: ${total}</h1>`;
  };

  const showCart = () => {
    let str = "";
    products.map((value) => {
      if (cart[value.id]) {
        str += `
        <div>
        <p>${value.name}</p>
        <button onclick='decrement(${value.id})'> - </button>${cart[value.id]}<button onclick='increment(${value.id})'>+</button>
        <p>Rs${value.price * cart[value.id]}</p>
        </div>
        `;
      }
    });
    divCart.innerHTML = str;
    let count = Object.keys(cart).length;
    items.innerHTML = count;
    showTotal();
  };
  const showProducts = () => {
    let str = "<div class='row'>";
    products.map((value) => {
      str += `
      <div class='box'>
      <h3>${value.name}</h3>
      <p>${value.desc}</p>
      <h4>Rs: ${value.price}</h4>
      <button onclick=addToCart(${value.id})>Add to Cart</button>
      </div>
      `;
    });
    divProducts.innerHTML = str+"<div>";
  };
  const displayCart=()=>{
    // divCartBlock.style.display="block"x
     divCartBlock.style.left="80%"
  };
  const hideCart=()=>{
    // divCartBlock.style.display="none"
     divCartBlock.style.left="100%"

  }