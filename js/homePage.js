$(document).ready(function () {
    showMenus();
    showCategories();
    showProducts();
   
});




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
          
       });
   

   };

    function prikaziProizvode(products) {
        let ispis = "";
         products.forEach(product => {
          ispis += printProduct(product);
        });
           document.getElementById("proizvodi").innerHTML = ispis;
           
      }

        
    


        /* BANNER */

        function showCategories(){ 
            $.ajax({
              url: 'data/categories.json',
              method: 'GET',
              dataType: 'json',
              success: function (categories) {
                prikazBanera(categories);
                
                
              },
              error: function (err) {
                console.error(err);
              }
            });
        
           };
        
            function prikazBanera(categories) {
                let ispis = "";
                 categories.forEach(category => {
                  ispis += printBanner(category);
                });
                   document.getElementById("baner").innerHTML = ispis;
                   $(".filter-banner").click(filterBanner);
                   
              }
            

/* FILTER BY CATEGORY BANNER */ 

function filterBanner(e){
    e.preventDefault();

    let categoryId = $(this).data('id');

    ajaxProducts(function(products){
        products = filterByBanner(products, categoryId);
        prikaziProizvode(products);
    });
}

function filterByBanner(products, categoryId){
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
            
        </div>
            </div>
        </div>
    </div>
</div>`;
}




/* banner */

function printBanner(category){
    return `<div class="col-md-6 col-xl-4 p-b-30 m-lr-auto">
        <div class="block1 wrap-pic-w">
        <img src="${category.slika.src}" alt="${category.slika.alt}">

     <a href="#" class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 filter-banner" data-id="${category.id}">
        <div class="block1-txt-child1 flex-col-l">
            <span class="block1-name ltext-102 trans-04 p-b-8">
                ${category.title}
            </span>
         <span class="block1-info stext-102 trans-04">
                ${category.opis}
            </span>
        </div>
    </a>
</div>
</div>`
}

/* category */




function printNumber(products, colorId){
    return filterColor(products, colorId).length;
}







    
