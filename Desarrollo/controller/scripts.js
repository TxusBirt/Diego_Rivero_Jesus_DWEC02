/* Autor: Jesus Diego Rivero
   Fecha: 13/11/2023
   Modulo: DWEC
   UD: 02
 */

'use strict'

// ------------------- CLASES------------------------
class Socio {
  constructor(id, nombre, apellido) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
  }
}

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector('#formNombre')

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById(
  'contenedorPintarSocios'
);

// TODO: array para añadir los socios
var arraySocios = new Array();

// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/
function cargarSociosJSON () {
  let path = '../model/datosSocios.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
    response.json().then(data => {
      console.log('Datos', data);
      aniadirSociosInicialesArray(data);
    })
  })
}

/* 
TODO:  metodo para añadir socios al array 
    cuando arranca la pagina web
*/
function aniadirSociosInicialesArray (datos) {
  //  TODO: cargar el fichero JSON, parsearlo a objetos tipo "socio" y añadirlos al array
  //los datos ya se han parseado con la instruccion response.json()
  // añado los datos obtenidos al array
  for(let i in datos.socios) {
      arraySocios.push(datos.socios[i]);
    }
}
/*
    TODO: Metodo para capturar los datos del socio introducidor en el formulario
*/
function capturarDatosSocio () {
  // capturo los datos señalando al elemento correspondiente y capturando su valor
  var datos = new FormData(formulario);
  const nombre = datos.get('nombre');
  const apellido= datos.get('apellido');
  //creo el socio
  const socio = crearSocio(nombre, apellido);
  // Añado al array
  arraySocios.push(socio);
}

/* 
TODO: 
    Metodo para crear un socio pasandole el nombre y el apellido
    y añadirlo al array
 */
function crearSocio (nombre, apellido) {
  // TODO: crear objeto socio
  const id = crearID();
  // TODO: añadir el objeto al array
  return new Socio(id, nombre, apellido);
}

/*
TODO: 
    Metodo para crear el ID del socio en funcion del ultimo
    ID que hay en el array de socios
*/
function crearID () {
  // TODO: mirar el id del ultimo socio del array y sumarle uno
  let id = arraySocios[arraySocios.length - 1].id + 1;
  return id;
}

// EJERCICIO 2

/*
  TODO: metodo que elimina la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/

function pintarListaSocios () {
  //TODO: borramos todo lo que hay en el div
  // Obtengo el númro de elementos de la lista
  const num = contenedorEscribirSocios.children.length;
  // si tengo elementos los borro para reemplazarlos por una nueva lista
  if (num > 0){
    for (let i=0; i<num; i++) {
      document.getElementById(`elemento ${i}`).remove();
    }
  } 
  // variable que contiene los datos de cada socio
  let texto="";
  //TODO: bucle para recorrer y pintar el array de socios
  for (let i=0; i < arraySocios.length; i++){
    // genero elemento html que contenga a cada socio
    let lista = document.createElement("div");
    // datos del socio
    texto = `socio número ${arraySocios[i].id}: ${arraySocios[i].nombre} ${arraySocios[i].apellido}`;
    // añado texto al elemento html
    lista.textContent = texto;
    // añado como atributo un id diferente a cada elemento para poder identificarlos cuando los elimine
    lista.id=`elemento ${i}`;
    // añado cada elemento como hijo del que se indica hasta que añado todos
    contenedorEscribirSocios.appendChild(lista);
  };
  
}

// ------------------- MAIN ------------------------


console.log('Empieza el programa');
// TODO: añadimos los socios iniciales cuando empieza el programa
cargarSociosJSON ();

console.log('Acaba el programa');
