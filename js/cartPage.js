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
            generateTable(data)
        }
    });
}

function generateTable(products) {
    let ispis = `<table class="table-shopping-cart">
    <tr class="table_head">
        <th class="column-1">Product</th>
        <th class="column-2"></th>
        <th class="column-3">Price</th>
        <th class="column-4">Quantity</th>
        <th class="column-5">Total</th>
    </tr>`;
                
    products.forEach(product=>{
        ispis += generateOneRow(product);
    });
    ispis+=`</table>`;

    document.getElementById("table-cart").innerHTML=ispis;
}

    function generateOneRow(product) {

        return `	<tr class="table_row">
        <td class="column-1">
            <div class="how-itemcart1">
                <img src="${product.photo.src}" alt="${product.photo.alt}">
            </div>
        </td>
        <td class="column-2">${product.name}</td>
        <td class="column-3">$ ${product.price}</td>
        <td class="column-4">
            <div class="wrap-num-product flex-w m-l-auto m-r-0">
                <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                    <i class="fs-16 zmdi zmdi-minus"></i>
                </div>

                <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product2" value="${product.quantity}">

                <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                    <i class="fs-16 zmdi zmdi-plus"></i>
                </div>
            </div>
        </td>
        <td class="column-5">$${product.price * product.quantity}</td>
    </tr>` ;
    }



function showEmptyCart() {
    $("#table-cart").html("<p>Your cart is empty!</p>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}



