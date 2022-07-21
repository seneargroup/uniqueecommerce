function searchPage() {

    var a = document.getElementById("search").value;

    if (a === "mens") {
        window.open("./mensproducts.html");
    }

    if (a === "womens") {
        window.open("./womensproducts.html");
    }

    if (a === "mobiles") {
        window.open("./subproducts.html" );
    }
    if (a === "cart") {
        window.open("./cart.html" + a, '_self' );
    }
    if (a === "tshirt") {
        window.open("./productdetails.html" + a, '_self' );
    }


}