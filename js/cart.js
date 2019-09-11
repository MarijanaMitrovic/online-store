$(document).ready(function () {
    let products = productsInCart();
    
    if(products != null && products.length>0)
    displayProducts();
        
    else
        showEmptyCart();

});


  function displayProducts() {
    let products = productsInCart();

    $.ajax({
        url : "data/proizvodi.json",
        success : function(data) {
            let productsForDisplay = [];
            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                        
                }
                return false;
            });
            generateList(data)
        }
    });
}

function generateList(products) {
    let ispis = "";
                
    products.forEach(product=>{
        ispis += generateOneItem(product);
    });

    document.getElementById("cart-items").innerHTML=ispis;
}

    function generateOneItem(product) {

        return `<li class="header-cart-item flex-w flex-t m-b-12">
        <div class="header-cart-item-img">
            <img src="${product.photo.src}" alt="${product.photo.alt}">
        </div>

        <div class="header-cart-item-txt p-t-8">
            <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                ${product.name}
            </a>

            <span class="header-cart-item-info">
                ${product.quantity} x $${product.price}
            </span>
        </div>
    </li>`;
    }



function showEmptyCart() {
    $("#cart-items").html("<p>Your cart is empty!</p>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}



