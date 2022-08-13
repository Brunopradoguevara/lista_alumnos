/** Materias **/
const URL_API="http://escuela.local/api";  //Creación de variable con la URL de la API (para todas las peticiones a las APIs)
function guardarInfo(){  //Función para settiar y crear el objecto alumno con sus valores del formulario.

    let idMateria=document.querySelector("#id").value;   //input del nombre
    let teacherMateria=document.querySelector("#teacher").value;  //input del apellido
    let nombreMateria=document.querySelector("#name_subjects").value;  //input del la matricula
    materia = {   // objeto alumno
        pk_id: idMateria,   //se le asigna valor a la clave pk_LRN
        teacher: teacherMateria,        //se le asigna valor a la clave name
        name_subjects: nombreMateria, //se le asigna valor a la clave last_name
    };

    setMateria(materia);   //llamada a la función setAlumno donde se llama a la API create.
      window.location.reload();   //recarga el documento actual
    
}
 
async function setMateria(materia){   // Función asincrona guardar Alumno a la API con parametro de entrada alumno que es un obj
/*  let alumnos =  getAlumno() || [];
  alumnos.push(alumno); 
  localStorage.setItem("Datos alumnos",JSON.stringify(alumnos)); */
 let url_petition;    //se crea una variable url_petition

 try{ 
   url_petition = await (await fetch(URL_API + "/subject/create",{   //se le asigna a la funcion url_petition la función para guardar alumno
      method: 'POST',   //se indica el metodo que se utilizara
      body:JSON.stringify(materia)   //agregar body del objecto alumno para volverlo string.
      
   }
   )).json();    

  console.log(url_petition);    //se imprime por consola la url_petition
  return url_petition;          // retornamos url_petition
 }catch(e){                     // cachamos el error
   console.log(e);              // imprimimos el error por consola
   alert("Hubo un error en setMateria " + e);        //mandamos una alerta al usuario 
   return [];                        
 }
}

async function getMateria(){
    /* alumnos = JSON.parse(localStorage.getItem("Datos alumnos")) || [];
    console.log(alumnos);
    return alumnos;
    */
   
   let url_petition;        //se crea una variable url_petition

   try{
     url_petition= await (await fetch(URL_API + "/subject",{    //se le asigna a la funcion url_petition la función para guardar alumno
        method: 'GET'                                           //seleccionamos el metodo 

     }
     )).json();

    console.log(url_petition);                   //imprimimos por consola la url_petition
    return url_petition.data;                    // retornamos url_petitio
   }catch(e){                                    //cachamos el error
     console.log(e);                             //imprimimos por consola el error
     alert("Hubo un error en getMateria " + e);   // enviamos una alerta con el error
     return [];
   }
    
}


 /*  document.addEventListener("DOMContentLoaded",function nuevaFila(){
 let alumnos = JSON.parse(localStorage.getItem("Datos alumnos")) || [];
  for(let i=0; i < alumnos.length;i++){
        document.querySelector(".tablaDeAlumnos").innerHTML += `<tr class="nuevaFila"><td>${alumnos[i].matricula}</td><td>${alumnos[i].nombre}</td><td>${alumnos[i].apellido}</td><td>${alumnos[i].edad}</td><td>${alumnos[i].grado}</td><td>${alumnos[i].grupo}</td><td><button class="btn-eliminar" data-matricula="${alumnos[i].matricula}" >Eliminar</button></td></tr>` ; 
    }
   })   */

let tablaDeMaterias = document.querySelector(".tablaDeAlumnos");   //seleccionamos la parte del documento donde esta la clase tablaDeAlumnos
let cuerpoTabla = document.createElement("tbody");                // creamos un nuevo elemento tbody
getMateria().then(function(materias){                               // ------------------------
    materias.forEach(materia => {                                   // iteramos por cada alumno de la variable alumnos 
        let fila = document.createElement("tr");                  // creamos una nueva tr 
        let botonEliminar = document.createElement("button");     // creamos un boton 
    
        let td1 = document.createElement("td");                   // creamos un td 
        td1.innerText = materia.pk_id;                            // le ponemos texto al td 
        fila.appendChild(td1);                                    // agregamos el td a la variable fila que es un tr
    
        let td2=document.createElement("td")                      // creamos un td
        td2.innerText = materia.teacher;                              // le ponemos texto al td
        fila.appendChild(td2);                                    // agregamos el td a la variable fila que es un tr
    
        let td3=document.createElement("td")                      // creamos un td
        td3.innerText = materia.name_subjects;                         // le ponemos texto al td
        fila.appendChild(td3);                                    // agregamos el td a la variable fila que es un tr
    
        
        let td100 = document.createElement("td");                // creamos un td
  
        botonEliminar.innerText = "Eliminar";                    // agregamos texto al boton
        botonEliminar.setAttribute("class","btn-eliminar");      // le agregamos una clase al boton
        botonEliminar.setAttribute("data-id", materia.pk_id);   // agregamos el atributo data-matricula al boton
        botonEliminar.addEventListener("click",function(e){
          console.log("Se hizo click");
          let id = e.target.getAttribute("data-id"); 
            deleteMateria(id).then(function(url_petition){
              alert(url_petition.message);
              window.location.reload();                                //recarga el documento actual
            });
        }  )            
        td100.appendChild	(botonEliminar);                                   // agregamos el boton al td
        fila.appendChild(td100);                                       // agregamos el td a la variable fila que es un tr
    
        cuerpoTabla.appendChild(fila);                                 // agregamos las filas a la variable cuerpoTabla}
        
    }); 
});
 
 



/*     function eliminarAlumno(matricula){
    let alumnos = getAlumno();
    const index = alumnos.findIndex( alumno => alumno.pk_LRN === matricula );
    alumnos.splice( index, 1 );//elimino el alumno
    localStorage.setItem("Datos alumnos", JSON.stringify(alumnos));
    window.location.reload();
    console.log("eliminar");
  } */

  async function deleteMateria(id){         // se crea la funcion asincrona deleteAlumno
    let url_petition;    //se crea una variable url_petition

    try{ 
      url_petition = await (await fetch(URL_API + "/subject/delete/" + id,{   //se le asigna a la funcion url_petition la función para guardar alumno
         method: 'POST',   //se indica el metodo que se utilizara
         
      } 
      )).json();                  // se pone en formato json 
   
     console.log(url_petition);   //se imprime por consola url_petition
     return url_petition;         // retornamos el valor de url_petition
    }catch(e){                    // cachamos el error
      console.log(e);             // mostramos por consola el error
      alert("Hubo un error en deleteMateria " + e);   //enviamos una alerta al usuario de que hubo un error
      return [];                                     // retornamos un array vacio 
    } 
    
}
    
   

   
/*      document.querySelectorAll(".btn-eliminar").forEach(elemento=>{     
     elemento.addEventListener("click", function (e) {
            console.log("Se apreto el boton eliminar");
            let matricula = e.target.getAttribute("data-matricula"); 
            deleteAlumno(matricula);
            
        })
     })  */
    

    

    window.addEventListener('DOMContentLoaded', (event) => {             //se agrega un evento
        console.log('DOM fully loaded and parsed');                      // se imprime por consola que se cargo
        let section = document.querySelector("[data-section]");          // se crea una variable section en la cual esta el elemento con atributo data-section
        if(section){                                                     //condicional if seccion == tru
            if(section.getAttribute("data-section") === 'lista' ){       //  condicional if atributo data-section es igual a lista    
                tablaDeMaterias.appendChild(cuerpoTabla);                 //se agrega cuerpoTabla a tablaDeAlumnos
            }else{                                                       // en caso de no ser verdadero
                console.log("no esta en la vista lista");                // imprimir por pantalla que no esta la vista
            }
        }
    });