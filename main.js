let cartModel = document.querySelector(".cart-modal");
let cartButtton = document.querySelector(".cart-button");
let panier = [];
cartButtton.addEventListener("click", () => {
  cartModel.classList.toggle("active");
});

//afficher des produits dune api externe
let contentShop = document.querySelector(".content-shop");
//recuperer les produirs via une api externe
//les afficher a laide du fetch
fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    let myProducts = res.products;
    displayProduct(res.products);
    //selection du button
    let addToCartButtons = document.querySelectorAll(".card-shop input");
    //parcourir le tableau pour rajouter un event listner pour chaque boutton
    addToCartButtons.forEach((e) => {
      //on ajoute un event listner pour chaque element
      e.addEventListener("click", (event) => {
        //quand on clique on recupere le id du buttn cliquer
        //on declare ensuite une variable qui va contenir le id
        let clickedProductID = parseInt(event.target.getAttribute("id"));
        //faire une recherche dans le tableau qui contient tout les produits
        let clickedProduct = myProducts.filter(
          (e) => e.id === clickedProductID
        )[0];

        //declarer une variable qui va contenir les ids et infos du produits
        // var panier declarer au debut
        //puis verifier si clickedProductID  existe dans le panier
        let cartResult = panier.filter((e) => e.id === clickedProductID);
        if (cartResult.length === 0) {
          //id nn trouver dans le tableau donc on le rajoute
          // inserer une nouvelle div celle du panier
          cartModel.innerHTML += `<div class="addproduct">
        <h3>${clickedProduct.title}</h3>
        <div class="quantity">
          <i id="${clickedProductID}" class="fa-solid fa-plus"></i>
          <p>1</p>
          <i id="${clickedProductID}" class="fa-solid fa-minus"></i>
        </div>
        <p>${clickedProduct.price}$</p>
      </div>`;
          //rajouter le produit dans le tableau panier
          panier.push({
            id: clickedProductID,
            price: clickedProduct.price,
            Quantity: 1,
          });
        } else {
          alert("ce produit existe deja");
        }
      });
    });
  });

function displayProduct(myProducts) {
  myProducts.forEach((e) => {
    contentShop.innerHTML += `<div class="card-shop">
          <img src="${e.thumbnail}" alt="" />
          <h5>${e.title}</h5>
          <div class="stars">
          </div>
          <h6>${e.price}</h6>
          <input id="${e.id}" type="button" value="Add to cart" />
        </div>`;
  });
}
