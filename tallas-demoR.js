var WPURef, WPUAltura, WPUBusto, WPUCintura, WPUCadera;
var categoria, subcategoria;
var precio;
var color;
var imagenPrenda = "";
var tallasPrenda = "";
var talla1;
var idioma;
var fabricante;
var descripPrenda;
var existeModelo3D = false;

var callbackYoubuy;
var visualookCalculaTuTalla="http://www.tecnologiasdim.es/vlook/CLIENTES/demo/CALCULATUTALLAR/";
//var visualookProbador="http://www.tecnologiasdim.es/vlook/CLIENTES/demo/PROBADOR/";
var visualookTallas = "http://www.tecnologiasdim.es/vlook/CLIENTES/demo/TALLAS/";

var WPUsite="demo";
var WPU = "WPUDemo";

function youbuyClose(event) {

	talla1 = event.data[1];    

    jQuery.fancybox.close( true );
	
    if (event.data[0] == 'CT') comprarTalla(talla1);
}

youbuyDependencies();
function youbuyDependencies() {
	
    document.write('<link rel="stylesheet" href="', visualookTallas+'lib/fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />');
    document.write('<script src="', visualookTallas+'lib/fancybox/source/jquery.fancybox.pack.js?v=2.1.5', '" type="text/JavaScript"><\/script>');
      
    document.write("<script type='text/JavaScript'>",
                   "jQuery(document).ready(function(){",
                        "youbuyInstall();",
                        "jQuery('a#CalcularTalla.fancybox').fancybox({",                            
                            "'closeBtn' : false,",
                            //"'modal': true,",
                            "'hideOnContentClick' : true,",
                            "'type' : 'iframe',",
                            "'minWidth' : 210,",
                            "'maxWidth' : 600,",
                            "'minHeight' : 720,",
                            "'maxHeight' : 720,",
                            "'padding' : 0,",
                            "'helpers': {",
                                "'overlay': {",
                                    "'locked': false",
                                "}",
                            "}",
                       "});",
                    "});",
                   "<\/script>");
}

function comprarTalla(talla1) {

	var valor = "";

	var listaOpciones = []; 
    
    jQuery('#talla option').each(function() {
        
        var ele = jQuery(this).val();
        
        if (typeof ele != undefined && ele != "")    
            listaOpciones.push(ele);
    });

	for (i=0;i<listaOpciones.length;i++) {

		if (listaOpciones[i] == talla1) valor = listaOpciones[i];
	}

	if (valor == "") {
		//if (idioma == "en") alert("Sorry, currently we do not have your size available.");
		//else 
		alert("Lo sentimos, actualmente no tenemos su talla ( "+ talla1 +") disponible.");
	} else 

		jQuery('#talla').val(valor);

	jQuery('#talla').change();
}

function youbuyInstall() {

/* REFERENCIA PRENDA */

	var ref = jQuery('#referenciaVL').val();
    
    //console.log("REFERENCIA: #"+ref+"#");

	if (typeof ref === "undefined") return;
	WPURef = ref;

/* PRECIO PRENDA *

  	precio = jQuery('#info span.precioProducto').text(); //jQuery('#precioVL').val();
    
    var indice = precio.indexOf(" ");
    
    precio = precio.substr(0,indice);
    
    console.log("PRECIO: #"+precio+"#");
    
  	if (precio.length == 0) return; */

/* FABRICANTE */

    fabricante = jQuery('#id_marcaVL').val();
        
/* CATEGORIA */    
    
	categoria = jQuery('#categoriaDefectoVL').val();
    
    //console.log("Categoria: #"+categoria+"#");

	if (categoria.length == 0) return;

/* SUBCATEGORIA PRENDA */

	subcategoria = jQuery('#subcategoriaVL').val(); 
    
    //console.log("Subcategoria: #"+subcategoria+"#");
    
	if (subcategoria.length == 0 ) return;

/* TALLAS PRENDA */
        
	var listaTallasPrenda = [];
            
    jQuery('#talla option').each(function() {
        
        var ele = jQuery(this).val();
        
        if (typeof ele != undefined && ele != "")    
            listaTallasPrenda.push(ele);
    });    
    
    tallasPrenda = listaTallasPrenda.join();
    
    talla1 = jQuery('#talla option:selected').val();
    if (talla1.length == 0) talla1 = listaTallasPrenda[0];
    
    //console.log("#"+tallasPrenda+"# Talla1: "+talla1);

	if (tallasPrenda.length == 0) return;

/* COLOR */

	color = jQuery('#colorActualVL').val();
    
    if (color.length == 0) color = "1";
    
    //console.log("Color: #"+color+"#");

	/* PUEDE EXISTIR O NO. */
	
/* IMAGEN PRENDA */

	var imagenesPrenda = jQuery('#imagenesVL').val();

	//imagenPrenda = imagenesPrenda.split('##-##')[0]; //'http://www.visualook.com/demo/small/'
    
    imagenPrenda = "http://visualook.com/demo/small/"+imagenesPrenda;
    
    //console.log('imagenPrenda: #'+imagenPrenda+'#');

/* DESCRIPCION PRENDA */

	descripPrenda = jQuery('#descripcionProductoVL').val();
    
    //console.log('Descripcion Prenda: #'+descripPrenda+'#');

/* IDIOMA NAVEGADOR */

    if (window.parent.document.documentElement.lang == "en-US") { 
        idioma = "en";
        textoBoton = "Get your Size";
    } else {
        idioma = "es";
        textoBoton = "Calcula tu Talla";
    }


	jQuery.getJSON(visualookCalculaTuTalla+WPUsite+".php", {'op':'check', 'prenda': WPURef, 'marca':fabricante, 'color':color, 'categoria': categoria, 'subcategoria': subcategoria, 'imagenPrenda': imagenPrenda, 'idioma': idioma}, function (data) {

		if ( data.error ) {
          
            console.log(data.error);
            return;

        } else {
        
			if (data.MostrarBoton == 0) return;

            var dispositivo = navigator.userAgent.toLowerCase();
            if (dispositivo.search(/iphone|ipod|ipad|android|webOS|BlackBerry/) == -1 ) existeModelo3D = true; // Solamente se permite el acceso al WPU desde un equipo de escritorio.
            
            var url = encodeURI(visualookCalculaTuTalla+WPUsite+".php?prenda="+WPURef+"&marca="+fabricante+"&color="+color+"&categoria="+categoria+"&subcategoria="+subcategoria+"&listaTallas="+tallasPrenda+"&imagenPrenda="+imagenPrenda+"&idioma="+idioma+"&descrip="+descripPrenda);                        
            
            if (data.Modelo3D == 0 || !existeModelo3D) {				
                                    
                    existeModelo3D = false;                                      
                                      
                    jQuery('#info').append('<div><p class="buttons_bottom_block no-print">&nbsp;<a href="'+url+'" class="btn btn-lg btn-primary fancybox" id="CalcularTalla" name="CalcularTalla">'+textoBoton+'</a></p></div>');
                
			} else {

                    jQuery('#info').append('<div><p class="buttons_bottom_block no-print">&nbsp;<a href="'+url+'" class="btn btn-lg btn-primary fancybox" id="CalcularTalla" name="CalcularTalla">'+textoBoton+'</a></p></div>');
                					                
			}        
			window.addEventListener("message", youbuyClose, false);            
		}
	});
}