$(document).ready(function () {
    showMenus();
    showCategories();
    showProducts();
    $(".filter-link").click(sortProducts);
});


    /* SORT PRODUCTS */

    function sortProducts(e){
        e.preventDefault();

        let sortBy=$(this).data('sortby');
        let order=$(this).data('order');


        ajaxProducts(function(products){
            sortiraj(products, sortBy, order);
            prikaziProizvode(products);
        });
    }


  


    /* MENU */
   function showMenus(){ 
    $.ajax({
      url: 'data/navbar.json',
      method: 'GET',
      dataType: 'json',
      success: function (menus) {
        ispisMenija(menus);
      },
      error: function (err) {
        console.error(err);
      }
    });

   };

    function ispisMenija(menus) {
        let ispis = "";
    
        menus.forEach(menu => {
          ispis += stavkaMeni(menu);
        });
          document.getElementById("menus").innerHTML=ispis;
          
      }
    



     /* PRODUCTS */

   function ajaxProducts(allProducts){
    $.ajax({
        url: 'data/proizvodi.json',
        method: 'GET',
        dataType: 'json',
        success: allProducts,
        error: function (err) {
          console.error(err);
        }
      });
       
   }

   function showProducts(){ 
       ajaxProducts(function(products){
           prikaziProizvode(products);
             showColors(products); 
       });
   

   };

    function prikaziProizvode(products) {
        let ispis = "";
         products.forEach(product => {
          ispis += printProduct(product);
        });
           document.getElementById("proizvodi").innerHTML = ispis;
           cartEvents();
           
      }
 

/* SORT BY PRICE */ 

  function sortiraj(products, sortBy, order) {
    products.sort(function(a,b){
        let vrednostA=(sortBy=='price')?a.price : a.name;
        let vrednostB=(sortBy=='price')?b.price : b.name;

        if(vrednostA > vrednostB)
        return order=='asc' ? 1 : -1;
        else if(vrednostA<vrednostB)
        return order=='asc' ? -1 : 1;
        else
        return 0;
    });
}




/* COLORS */



function showColors(products){
    let allColors = [];
    products.forEach(product=>{
        product.colors.forEach(color=>{
            if(isUniqueColor(allColors, color)){
                allColors.push(color);
            }
        });
    });

    printColors(allColors,products); 
}

function isUniqueColor(allColors, color){
    let isUnique = false;
    if(allColors.length > 0){
        let allColorsIds = allColors.map(x => x.id);
        console.log(allColors);
        if(!inArray(allColorsIds, color.id)){
            isUnique = true;
        }
    } else {
        isUnique = true;
    }
    return isUnique;
}

function printColors(colors, products){
    let ispis = "";
    for(let color of colors){
        ispis+= printOneColor(color,products);
    }
   document.getElementById("color").innerHTML=ispis;
   $(".color-element").click(filterByColor);

    
}


/* FILTRIRANJE - PO BOJI */

function filterByColor(e){
    e.preventDefault();

    let colorId = $(this).data("id");

    ajaxProducts(function(products){
        products = filterColor(products, colorId);
        prikaziProizvode(products);
    })
}

function filterColor(products, colorId){
    return products.filter(x=> {
        let ids = x.colors.map(x=>x.id)
        return inArray(ids, colorId);
    })
}


function inArray(array, element){
    return array.indexOf(element)!==-1;
}

  /* CATEGORIES */

  function showCategories(){ 
    $.ajax({
      url: 'data/categories.json',
      method: 'GET',
      dataType: 'json',
      success: function (categories) {               
        prikazKategorija(categories);          
         },
      error: function (err) {
        console.error(err);
       }
        });        
       };
    

function prikazKategorija(categories){
   let ispis="";
   categories.forEach(category=>{
       ispis+=printCategory(category);
   });
   document.getElementById("kategorije").innerHTML=ispis;
   $(".filter-category").click(filterByCategory);
   

}

function filterByCategory(e){
e.preventDefault();

let categoryId = $(this).data('id');

ajaxProducts(function(products){
    products = filterCategories(products, categoryId);
    prikaziProizvode(products);
});
}

function filterCategories(products, categoryId){
return products.filter(x => x.category.id == categoryId);
}

 

   

 


  /* PRINT */

/* menu */

  function stavkaMeni(menu){
    return `<li>
      <a href="${menu.href}">${menu.naziv}</a>
    </li>
    `;
}

/* product */

function printProduct(product){
    return `	<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
    <div class="block2">
        <div class="block2-pic hov-img0">
            <img src="${product.photo.src}" alt="${product.photo.src}">
        </div>

        <div class="block2-txt flex-w flex-t p-t-14">
            <div class="block2-txt-child1 flex-col-l ">
                <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                    ${product.name}
                </a>

                <span class="stext-105 cl3">
                    $${product.price}
                </span>
            </div>

            <div class="block2-txt-child2 flex-r p-t-3">
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify="">
            <i class="zmdi zmdi-shopping-cart add-to-cart" data-id="${product.id}" ></i>
        </div>
            </div>
        </div>
    </div>
</div>`;
}

/* category */

function printCategory(category){
    return `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1 filter-category "  data-id="${category.id}">
    ${category.title}
</button>`
}

/* color */

function printOneColor(color,products){
    return `<li class="p-b-6">
    <span class="fs-15 lh-12 m-r-6" style="color:${color.color};">
        <i class="zmdi zmdi-circle"></i>
    </span>

    <a href="#" class="filter-link stext-106 trans-04 color-element" data-id="${color.id}">
        ${color.title}
        (${ printNumber(products, color.id)})
    </a>
</li>`;
}

function printNumber(products, colorId){
    return filterColor(products, colorId).length;
}


      /* CART */

      function cartEvents(){
        $(".add-to-cart").click(addToCart);
    }

    function productsInCart(){
        return JSON.parse(localStorage.getItem("products"));
    }

    function addToCart(){
        let id=$(this).data("id");
        var products=productsInCart();
        if(products){
            if(productAlreadyInCart()){
                updateQuantity();
            }}
            else {
                addToLocalStorage();
              }
              alert("Cart updated!")


      function productAlreadyInCart(){
          return products.filter(p => p.id == id).length;
             }

      function addToLocalStorage() {
          let products = productsInCart();
          products.push({
           id : id,
           quantity : 1
              });
         localStorage.setItem("products", JSON.stringify(products));
          }

      
      function updateQuantity() {
        let products = productsInCart();
        for(let i in products)
              {
        if(products[i].id == id) {
           products[i].quantity++;
                  break;
                  }      
              }
      
         localStorage.setItem("products", JSON.stringify(products));
          }
      
          
      function addToLocalStorage() {
          let products = [];
          products[0] = {
              id : id,
              quantity : 1
              };
          localStorage.setItem("products", JSON.stringify(products));
          }
      }

      function clearCart() {
          localStorage.removeItem("products");
      }

    







    
