$(document).ready(function(){
    showAuthor();
});


function showAuthor(){
    $.ajax({
        url: "data/author.json",
        method:"GET",
        dataType:"json",
        success: function(authors){
            ispisiAutora(authors);
        },
        error: function(err){
            console.log(err);
        }
    });

};


function ispisiAutora(authors){
    let ispis="";
    authors.forEach(author=>{
        ispis+=oneAuthor(author);
    });
    document.getElementById("author").innerHTML=ispis;
}

function oneAuthor(author){
    return `
    <div class="row">
        <div class="order-md-2 col-md-7 col-lg-8 p-b-30">
            <div class="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                <h3 class="mtext-111 cl2 p-b-16">
                    ${author.naslov}
                </h3>

                <p class="stext-113 cl6 p-b-26">
                    ${author.tekst}
                </p>

                <div class="bor16 p-l-29 p-b-9 m-t-22">
                    <p class="stext-114 cl6 p-r-40 p-b-11">
                        ${author.citat}
                    </p>

                    <span class="stext-111 cl8">
                        ${author.autor}
                    </span>
                </div>
            </div>
        </div>

        <div class="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
            <div class="how-bor2">
                <div class="hov-img0">
                    <img src="${author.slika.src}" alt="${author.slika.alt}">
                </div>
            </div>
        </div>
    </div>`;
}