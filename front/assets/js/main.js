var url = "http://localhost:3000/api/";

function obtener_categorias() {
    //fetch de categoria
    fetch(url + 'categories').then(function(response) {
        // The API call was successful!
        return response.json();
    }).then(function(data) {
        for (var categoria in data) {
            var titulo = document.createElement('div');
            titulo.className = "categoria-titulo";
            titulo.innerHTML = "<div><hr><h2>" + data[categoria]["name"] + "</h2></div>";
            document.getElementById("container").appendChild(titulo);

            var nuevoElemento = document.createElement('div');
            nuevoElemento.id = "categoria-" + data[categoria]["id"];
            nuevoElemento.className = "categoria";
            document.getElementById("container").appendChild(nuevoElemento);
        }

    }).catch(function(err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

function obtener_productos() {
    //fetch de producto
    fetch(url + 'product').then(function(response) {
        // The API call was successful!
        return response.json();
    }).then(function(data) {
        renderizar_productos(data);

    }).catch(function(err) {
        console.warn('Something went wrong.', err);
    });
}

obtener_categorias();
obtener_productos();

function renderizar_productos(data) {
    for (var producto in data) {
        var nuevoElemento = document.createElement('div');
        nuevoElemento.id = data[producto]["id"];
        nuevoElemento.className = "card";

        //agregar imagen
        var imagen = document.createElement('img');
        imagen.src = data[producto]["url_image"];
        nuevoElemento.appendChild(imagen);

        //agregar card-container
        var carcont = document.createElement('div');
        carcont.className = "card-container";
        carcont.innerHTML = "<h4><b>" + data[producto]["name"] + "<b></h4><hr>";
        nuevoElemento.appendChild(carcont);

        //agregar footer card
        var cardfoot = document.createElement('div');
        cardfoot.innerHTML = '<div class="card-final"> <div class="card-price"><p>' + data[producto]["price"] + '</p></div><div class="card-logo"><i class="fa fa-cart-plus"></i></div></div>'
        nuevoElemento.appendChild(cardfoot);

        var nombre = "categoria-" + data[producto]["category"];
        document.getElementById(nombre).appendChild(nuevoElemento);
    }
}

var busqueda = document.getElementById("buscarclick");
busqueda.onclick = function() {
    var txtbox = document.getElementById('buscarinput');

    document.getElementById("container").innerHTML = "";
    obtener_categorias();

    fetch(url + 'product/' + txtbox.value).then(function(response) {
        // The API call was successful!
        return response.json();
    }).then(function(data) {
        renderizar_productos(data);

    }).catch(function(err) {
        console.warn('Something went wrong.', err);
    });

}

var input = document.getElementById("buscarinput");

input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("buscarclick").click();
    }
});