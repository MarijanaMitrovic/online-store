/* PRIKAZIVANJE I SKRIVANJE FORME ZA REGISTRACIJU */


$(document).ready(function(){
    $("#register").hide();
    $("#reg").click(function(e){
        e.preventDefault();
   if($("#register").is(':visible')){
            $("#register").hide();
            $("#reg").html("Not registred?");
        } else {
            $("#register").show();
            $("#reg").html("Already registred.");
           
        }
    });

});

/* VALIDACIJA LOGIN FORME */

$(document).ready(function () {
    $("#btnLogin").click(function (evt) {
    evt.preventDefault();
    console.log("Login form button works");
    var arrayOk = [];
    var arrayNotOk = [];

    var email = document.querySelector("#tbEmail").value;
    var reEmail = /^[A-Za-z-_.0-9]{2,15}@[A-Za-z._-]{2,10}\.[a-z]{2,5}$/;
    if (!reEmail.test(email)) {
    arrayNotOk.push("Email is not ok");
    document.querySelector("#errorEmailLog").innerHTML="E-mail is not in good format!";
    document.querySelector("#errorEmailLog").style.color = "red";
    } 
    else if (email===""){
    arrayNotOk.push("Email is not ok");
    document.querySelector("#errorEmailLog").innerHTML="E-mail is empty";
    document.querySelector("#errorEmailLog").style.color = "red";
    }
    else {
    arrayOk.push(email);
    }

    var password = document.querySelector("#tbPassword").value;
    var rePassword = /^[A-Za-z0-9]{2,30}$/;
    if (!rePassword.test(password)) {
    arrayNotOk.push("Password is not ok");
    document.querySelector("#errorPasswordLog").innerHTML="Password is wrong";
    document.querySelector("#errorPasswordLog").style.color = "red";
    } 
    else if (password===""){
     arrayNotOk.push("Password is not ok");
    document.querySelector("#errorPasswordLog").innerHTML="You must enter password";
    document.querySelector("#errorPasswordLog").style.color = "red";
    }
    else {
    arrayOk.push(password);
    }   


        if(arrayNotOk.length>0){
            alert ("Can't login");
        } else {
            alert ("Successfully logged in");
        }
    

});

});

/* VALIDACIJA REGISTRACIJE */


$(document).ready(function () {
    $("#btnRegister").click(function (evt) {
    evt.preventDefault();
    console.log("Register form button works");
    var arrayOk = [];
    var arrayNotOk = [];

    var firstName = document.querySelector("#regName").value;
    var reFirstName = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
    if (!reFirstName.test(firstName)) {
    arrayNotOk.push("First name is not ok");
    document.querySelector("#errorNameReg").innerHTML="Name must contains 3 - 30 characters!";
    document.querySelector("#errorNameReg").style.color = "red";
    } 
    else if (firstName===""){
        arrayNotOk.push("First name is not ok");
        document.querySelector("#errorNameReg").innerHTML="Name must contains 3 - 30 characters!";
        document.querySelector("#errorNameReg").style.color = "red";
    }
    else {
    arrayOk.push(firstName);
    }

    var email = document.querySelector("#regEmail").value;
    var reEmail = /^[A-Za-z-_.0-9]{2,15}@[A-Za-z._-]{2,10}\.[a-z]{2,5}$/;
    if (!reEmail.test(email)) {
    arrayNotOk.push("Email is not ok");
    document.querySelector("#errorEmailReg").innerHTML="E-mail is not in good format!";
    document.querySelector("#errorEmailReg").style.color = "red";
    } 
    else if (email===""){
    arrayNotOk.push("Email is not ok");
    document.querySelector("#errorEmailReg").innerHTML="E-mail is empty";
    document.querySelector("#errorEmailReg").style.color = "red";
    }
    else {
    arrayOk.push(email);
    }

    var password = document.querySelector("#regPassword").value;
    var rePassword = /^[A-Za-z0-9]{2,30}$/;
    if (!rePassword.test(password)) {
    arrayNotOk.push("Password is not ok");
    document.querySelector("#errorPassReg").innerHTML="Password is wrong";
    document.querySelector("#errorPassReg").style.color = "red";
    } 
    else if (password===""){
     arrayNotOk.push("Password is not ok");
    document.querySelector("#errorPassReg").innerHTML="You must enter password";
    document.querySelector("#errorPassReg").style.color = "red";
    }
    else {
    arrayOk.push(password);
    }   


        if(arrayNotOk.length>0){
            alert ("Can't register");
        } else {
            alert ("Successfully registred");
        }
    

});

});
