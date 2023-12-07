function getrating(r) {
  let roundedR = Math.round(r);
  let result = "";
  for (i = 1; i <= 5; i++) {
    if (i <= roundedR) {
      result += '<i class="fa-solid fa-star" style="color: #ffd22e"></i>';
    } else {
      result += '<i class="fa-regular fa-star" style="color: #ffd22e"></i>';
    }
  }
  return result;
}

function getProductID(products, id) {
  let result;
  products.forEach((e) => {
    if (e.id == id) {
      result = e;
    }
  });
  return result;
}

let cartButton = document.querySelector(".cart-button");
let cartModal = document.querySelector(".cart-modal");
console.log(cartModal.classList);
let cart = [];
function addQuantity(id) {
  cart = cart.map((e) => {
    if (e.id == id) {
      e.quantity++;
    }
    return e;
  });
}
cartButton.addEventListener("click", () => {
  //   if (cartModal.classList.contains("active")) {
  //     cartModal.classList.remove("active");
  //   } else {
  //     cartModal.classList.add("active");
  //   }
  //   ce que fait le toggle
  cartModal.classList.toggle("active");
});

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    let shop = res.products;
    let shopcontainer = document.querySelector(".content-shop");

    shop.forEach((e) => {
      console.log(e);
      shopcontainer.innerHTML += `
  <div class="card-shop">
          <img src="${e.thumbnail}" alt="" />
          <h5>${e.title}</h5>
          <div class="stars">
            ${getrating(e.rating)}
          </div>
          <h6>${e.price}</h6>
          <input id="${e.id}" type="button" value="Add to cart" />
        </div>
  `;
    });
    let addToCartButtons = document.querySelectorAll(".card-shop input");
    addToCartButtons.forEach((e) => {
      e.addEventListener("click", (event) => {
        let clickedProductID = parseInt(event.target.getAttribute("id"));
        let clickedProduct = getProductID(shop, clickedProductID);
        let exists = false;
        cart.forEach((e) => {
          if (e.id == clickedProductID) {
            exists = true;
          }
        });
        if (exists) {
          alert("This product already exist in your cart");
        } else {
          cart.push({
            id: clickedProductID,
            price: clickedProduct.price,
            quantity: 1,
          });

          cartModal.innerHTML += `<div class="addproduct">
        <h3>${clickedProduct.title}</h3>
        <div class="quantity">
          <i id="${clickedProductID}" class="fa-solid fa-plus"></i>
          <p>1</p>
          <i id="${clickedProductID}" class="fa-solid fa-minus"></i>
        </div>
        <p>${clickedProduct.price}$</p>
      </div>`;
        }
        let pluses = document.querySelectorAll(".fa-plus");
        pluses.forEach((p) => {
          p.addEventListener("click", (event) => {
            let clickPlusId = parseInt(event.target.getAttribute("id"));
            addQuantity(clickPlusId);
            let clickedQuantity = event.target.parentNode.querySelector("p");
            clickedQuantity.innerHTML++;
          });
        });
      });
    });
  });
