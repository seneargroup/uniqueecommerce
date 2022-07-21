let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="imgcontainer">
                <img class="leftimg" src="${search.img}" alt="">
          </div>

      <div class="productdetailsinf">

          <a href="./productdetails.html"><h5 class="producttitle">${search.name}</h5></a>

          <div class="productstar">
              <h2 class="starflex">&#9733;</h2>
              <h2 class="starflex">&#9733;</h2>
              <h2 class="starflex">&#9733;</h2>
              <h2 class="starflex">&#9733;</h2>
              <h2 class="starflex">&#9734;</h2>
              <span id="starss">4.9</span> </a>
          </div>
          <ul>
              <li>4 GB RAM | 64 GB ROM | Expandable Upto 1 TB</li>
              <li>16.76 cm (6.6 inch) Full HD+ Display</li>
              <li>50MP + 2MP + 0.3MP | 8MP Front Camera</li>
          </ul>
          <div class="crudinf">
          <div class="buttonss">
              <i  onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
              <div class="reback">  
                  <a href=""><button  onclick="removeItem(${id})"  class="ssbutton">Delete</button></a>
                  <a href=""><button class="ssbutton">Save for later</button></a>
                  <a href=""><button class="ssbutton">See more +</button></a>
              </div> 
          </div>

      </div>

      <div class="priceinformation">
          <h6 class="priceright">₹ ${search.price}</h6>
          <h5 class="discountstrick"><s>₹19,500.00</s> &nbsp (11% off)</h5>
          <h6 class="deliv">Free delivery</h6>
          <hr>
          <h6 class="offex">Subtotal :   ₹ ${item * search.price}</h6>
          <hr>
          <a href="./mainindex.html"><button class="rightbtn">Continue Shopping</button></a>
          
      </div>

      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <div class="cartflex">
    <h2 class="showmsg">Cart is Empty</h2>
    <a href="mainindex.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    </div>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <div class="accountdetails">

        <div class="itemfull">
            <div>Price (items)</div>
            <div>Discount</div>
            <div>Buy More & Save more</div>
            <div>Coupons</div>
            <div>Delivery</div>
        </div>
            
        <ul>
            <li class="rightalign"> ₹ ${amount} </li>
            <li class="rightalign"> ₹0.00</li>
            <li class="rightalign"> ₹0.00</li>
            <li class="rightalign"> ₹0.00</li>
            <li class="rightalign"> Free</li>
        </ul>

    </div>
    
    <div class="tbill">
    <h2 class="adct">Total Bill :</h2> <span> ₹ ${amount} </span>
    </div>
    <a href="payment.html"><button class="checkout">Checkout</button></a>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

TotalAmount();
