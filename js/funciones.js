/*
Maruri 2013
Estefania Pulgar
*/
/*
Maruri 2013
Estefania Pulgar
*/
var url= 'http://maruridigitaldev.com/ponymalta/recetasAdmin/actions/files/thumbnail/';
var bigImage= 'http://maruridigitaldev.com/ponymalta/recetasAdmin/actions/files/';
var direccion= 'http://198.211.103.18/ponymalta/recetasAdmin/actions/';
var arr = [];

function thumbCategory(){
  $.ajax({
      url: direccion+'/allCategory.php',
      type: "POST",
      cache: false,
      dataType: "json",
      beforeSend: function(){ 
        showLoader();
      },
      success: function(response){  

        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            nombre = value.nombre; 
            id = value.id;  
            imagen = value.imagen;
            //alert(id);
            document.getElementById('thumb').innerHTML  += '<div class="categorias" onclick="listCategory('+id+')"><img src='+url+imagen+' /><span>'+nombre+'</span></div>';

          });
        }      
               
      },
      complete: function(){
         hideLoader();
      },
      error : function(error){     
          //alert(error);
      }
    });     
}
function thumbRecetas(){
  $.ajax({
      url: direccion+'/allRecetas.php',
      type: "POST",
      cache: false,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            nombre = value.nombre; 
            id = value.idcategorias;  
            imagen = value.imagen;
            document.getElementById('thumb').innerHTML  += '<div class="col-xs-4"><img src='+url+imagen+' /><span>'+nombre+'</span></div>';

          });
        }              
      },
      beforeSend: function(){ 
        showLoader();
      },
         complete: function(){
         hideLoader();
      },
      error : function(error){     
          //alert(error);
      }
    });     
}

function allArgument () {
    $.ajax({
      url: direccion+'/allCategory.php',
      type: "POST",
      cache: false,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            categoria = value.nombre; 
            id = value.id;  
            imagen = value.imagen;            
            //document.getElementById('wrapper').innerHTML  += '<div data-role="page" id="'+categoria+'"><div data-role="header" data-position="fixed" data-theme="a"><a href="#"  data-rel="back" id="botonRed" data-transition="none"></a><h1><img src="images/lonchera_texto_titulo.png" width="100%" /></h1></div><div data-role="content" data-theme="d"><h3>'+categoria+'</h3><br/><div><ul id="mis-'+categoria+'"></ul></div></div></div>';
            
            //----- 
            });
        }              
      },
            beforeSend: function(){ 
        showLoader();
      },
         complete: function(){
         hideLoader();
      },
      error : function(error){     
          //alert(error);
      }
    });     
}

function listCategory(argumento){
    //alert(argumento);
    $.mobile.changePage("#all-Recetas", { transition: "fade", changeHash: false });
    $('#mis-recetas').html('');
    var datos = {
          'argumento': argumento
        }
    $.ajax({
    url: direccion+'/allRecetasbycategoria.php',
    type: "POST",
    cache: false,
    data: datos,
    dataType: "json",
    success: function(response){

        if(response!=null && response!='' && response!='[]'){ 
            $.each(response,function(key,value){ 
                nombre = value.nombre;
                categoria = value.categoria;

                link = nombre.replace(" ","");
                id = value.id;
                //alert(id);
                //aqui falta borrar antes de llenar

                document.getElementById('mis-recetas').innerHTML  += '<li onclick="infoReceta('+id+')">'+nombre+'</li>';
            });
        }              
    },
          beforeSend: function(){ 
        showLoader();
      },
         complete: function(){
         hideLoader();
      },
    error : function(error){     
        //alert(222);
        console.log(error);
        }
    }); 
}


function infoReceta(argumento){
    //alert(argumento);
    $.mobile.changePage("#info", { transition: "fade", changeHash: false });
    $('#receta').html('');
    $('#cat-receta').html('');
    bqprov(argumento);
    var datos ={
        'argumento': argumento
    }
    $.ajax({
      url: direccion+'/allRecetas-mini.php',
      type: "POST",
      cache: false,
      data: datos,
      dataType: "json",
      success: function(response){  
        if(response!=null && response!='' && response!='[]'){ 
          $.each(response,function(key,value){ 
            nombre = value.nombre; 
            id = value.id;  
            categoria = value.categoria;
            imagen = value.imagen;
            ingredientes = value.ingredientes;
            preparacion = value.preparacion;

            //document.getElementById('receta').innerHTML  = "";
            //$('#receta').html('');borro
            //$('#receta').append('');agrego
            
            document.getElementById('cat-receta').innerHTML  = categoria;
            document.getElementById('receta').innerHTML  += '<div class="subtitle"><img src="'+bigImage+imagen+'" /></div><h3>'+nombre+'</h3><div class="rate" onclick="rate('+id+')"></div><div class="in"><strong>Ingredientes:</strong><br/><p>'+ingredientes+'</p><br/><strong>Preparación:</strong><br/><p>'+preparacion+'</p><br/><div class="compartir"><img src="images/facebook.png" onclick="facebookWallPost('+"'"+imagen+"'"+', '+"'"+nombre+"'"+')"  /></div></div>';
            
            bqprov(argumento);
          });
        }              
      },
            beforeSend: function(){ 
        showLoader();
      },
         complete: function(){
         hideLoader();
      },
      error : function(error){     
          //alert(error);
      }
    });  
}

/*favorito*/
function rate(argumento){
    arr = [];    
    
    var arrLocal = localStorage.favoritos;
    if(arrLocal != null)        
        var arrayFav = JSON.parse("[" + arrLocal.substring(1, arrLocal.length-1).split(',') + "]");
    else
        var arrayFav = [];

    if(arrayFav.indexOf(argumento) == -1) {
        $('.rate').css("background-position", "-20px 0");
        arrayFav.push(argumento); // insert as last item        
        localStorage.setItem("favoritos", JSON.stringify(arrayFav));
        bqprov(argumento);  
        /*cuento cuantos favoritos hay
        var retrievedData = localStorage.getItem("sesion");
        var movimiento = JSON.parse(retrievedData);
         
        alert(movimiento.length);
        */
    } else {        
        $('.rate').css("background-position", "0px 0");
        arrayFav.splice(arrayFav.indexOf(argumento), 1);
        localStorage.setItem("favoritos", JSON.stringify(arrayFav));        
    }
}

function bqprov(prov){
    if("favoritos" in localStorage){
        var retrievedData = localStorage.getItem("favoritos");
        var movimiento = JSON.parse(retrievedData);

        for(i=0;i< movimiento.length;i++) {
            if(prov == movimiento[i]){
                $('.rate').css("background-position", "-20px 0");
                //alert("Encontrada la Provincia: "+prov+"\nEn la posicion: "+i);
            } 
        }
    } else {
        console.log("error");
    }
}

function favoritos(){
    
    //alert(localStorage.favoritos);
    var arrLocal = localStorage.favoritos;
    var enlace2 = arrLocal.substring(1, arrLocal.length-1).split(',');

    for (var i=0; i < enlace2.length; i++){
        //alert(enlace2[i]);
        listCategoryFavorito(enlace2[i]);
    }
    
}

function listCategoryFavorito(argumento){
    //alert(argumento);
    
    $('#mis-recetas').html('');
    var datos = {
          'argumento': argumento
        }
    $.ajax({
    url: direccion+'listFav.php',
    type: "POST",
    cache: false,
    data: datos,
    dataType: "json",
    success: function(response){

        if(response!=null && response!='' && response!='[]'){ 
            $.each(response,function(key,value){ 
                nombre = value.nombre;
                categoria = value.categoria;

                link = nombre.replace(" ","");
                id = value.id;
                //alert(id);
                //aqui falta borrar antes de llenar

                document.getElementById('mis-recetas').innerHTML  += '<li onclick="infoReceta('+id+')">'+nombre+'</li>';
            });
        }              
    },
          beforeSend: function(){ 
        showLoader();
      },
         complete: function(){
         hideLoader();
      },
    error : function(error){     
        //alert(222);
        console.log(error);
        }
    }); 
}
