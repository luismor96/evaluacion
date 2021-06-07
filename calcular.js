(function(){
    "use strict"
    var cliente = document.getElementById('cliente');
    var producto = document.getElementById('producto');
    var cantidad = document.getElementById('cantidad');

    var agregar = document.getElementById('agregar');
    var finalizar = document.getElementById('finalizar');

    var clientes = [];
    var ids_c = []
    var product = [];
    var ids_p = [];
    var prec= [];
    var totalcompra = 0;

    listap.innerHTML = '';
    totalp.innerHTML = '';

    agregar.addEventListener('click',procesarDatos);
    document.addEventListener('DOMContentLoaded', obtenerClientes);
    document.addEventListener('DOMContentLoaded', obtenerProductos);
    document.addEventListener('DOMContentLoaded', deshabfechas);
    finalizar.addEventListener('click',pedidoListo);

    function procesarDatos(event){
        event.preventDefault();
        if(producto.value === "" || cantidad.value <= 0 || cliente.value === ""){
            alert("¡Debes llenar todos los campos!");
        }
        else{
            datosc.innerHTML = '';
            for(var i=0; i<clientes.length; i++){
                if(cliente.value === ids_c[i]){
                    datosc.innerHTML +=  "Nombre de cliente: " + clientes[i] + '<br/>' + "ID de cliente: " + ids_c[i] + '<br/>';
                }
            }

            for(var i=0; i<product.length; i++){
                if(producto.value === ids_p[i]){
                    listap.innerHTML += cantidad.value + " X " + product[i] + " = $" + prec[i]*cantidad.value +'<br/>' + "Costo unitario: " + prec[i] + '<br/>';
                    totalcompra += prec[i] * cantidad.value;
                    totalp.innerHTML = "$" +  totalcompra.toFixed(2);

                }
            }
        
        }
        
}
    
function pedidoListo(event){
    event.preventDefault();
    if(producto.value != "default" && cantidad.value != 0 && cliente.value != ""){
        var aleatorio = Math.round (100000 * Math.random());
        alert("Pedido realizado con éxito, su número de pedido es: MX" + aleatorio);
        document.getElementById("formulario").reset();
        listap.innerHTML = '';
        totalp.innerHTML = '';  
        datosc.innerHTML = '';
    }
    else{
        alert("No es posible realizar el pedido.");
    }
}


function obtenerClientes(event){
    event.preventDefault();
    $.ajax({
        url: 'https://www.infofast.com.mx/Erick/service/clientes/',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
            
        method: 'POST',
        dataType: 'json',
        data: {'user':'user_pruebas','pwd':'Pru3B@5.'},
        success: function(data){
         var jsonIn = data;
                for (var i = 0; i < data.length; i++) {
                    clientes.push(data[i].nombre);
                    ids_c.push(data[i].id_cliente);
                }
        }
      });
}

function obtenerProductos(event){
    event.preventDefault();
    $.ajax({
        url: 'https://www.infofast.com.mx/Erick/service/productos/',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
            
        method: 'POST',
        dataType: 'json',
        data: {'user':'user_pruebas','pwd':'Pru3B@5.'},
        success: function(data){
         var jsonIn = data;
                for (var i = 0; i < data.length; i++) {
                    product.push(data[i].nombre);
                    ids_p.push(data[i].id_producto);
                    prec.push(data[i].Precio);
                }
        }
      });
}

function deshabfechas(){
    const inFecha = document.querySelector('#fecha');
    console.log(inFecha);
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const disableFecha = year + "-0" + mes + "-0" + dia;
    inFecha.min = disableFecha;
    console.log(inFecha.value);
}



})();