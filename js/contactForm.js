$(document).ready(function () {
    $("#btnSubmit").click(function (evt) {
    evt.preventDefault();
    console.log("Contact form button works");
    var arrayOk = [];
    var arrayNotOk = [];
    var firstName = document.querySelector("#tbName").value;
    var reFirstName = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
    if (!reFirstName.test(firstName)) {
    arrayNotOk.push("First name is not ok");
    document.querySelector("#errorName").innerHTML="Name must contains 3 - 30 characters!<br/>";
    document.querySelector("#errorName").style.color = "red";
    } 
    else if (firstName===""){
        arrayNotOk.push("First name is not ok");
        document.querySelector("#errorName").innerHTML="Name must contains 3 - 30 characters!";
        document.querySelector("#errorName").style.color = "red";
    }
    else {
    arrayOk.push(firstName);
    }

    var email = document.querySelector("#email").value;
    var reEmail = /^[A-Za-z-_.0-9]{2,15}@[A-Za-z._-]{2,10}\.[a-z]{2,5}$/;
    if (!reEmail.test(email)) {
    arrayNotOk.push("Email is not ok");
    document.querySelector("#errorEmail").innerHTML="E-mail is not in good format!";
    document.querySelector("#errorEmail").style.color = "red";
    } 
    else if (email===""){
    arrayNotOk.push("Email is not ok");
    document.querySelector("#errorEmail").innerHTML="E-mail is empty!";
    document.querySelector("#errorEmail").style.color = "red";
    }
    else {
    arrayOk.push(email);
    }

    var message = document.querySelector("#tbMessage").value;
    var reMessage = /^[A-Za-z0-9\s\.,?!]{2,}$/;
    if (!reMessage.test(message)) {
    arrayNotOk.push("Message is not ok");
    document.querySelector("#errorMessage").innerHTML="There is no content in message!";
    document.querySelector("#errorMessage").style.color = "red";
    } 
    else if (message===""){
     arrayNotOk.push("Message is not ok");
    document.querySelector("#errorMessage").innerHTML="There is no content in message!";
    document.querySelector("#errorMessage").style.color = "red";
    }
    else {
    arrayOk.push(message);
    }   


        if(arrayNotOk.length>0){
            alert ("Can't send message!");
        } else {
            alert ("Message sent successfully!");
        }
    

});

});