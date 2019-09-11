
$(document).ready(function () {
    showMenus();
    
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
    



   
  /* PRINT */

/* menu */

  function stavkaMeni(menu){
    return `<li>
      <a href="${menu.href}">${menu.naziv}</a>
    </li>
    `;
}





    
