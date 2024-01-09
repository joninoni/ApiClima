const container=document.querySelector(".container");
const resultadoClima=document.querySelector("#resultado");;
const formulario=document.querySelector("#formulario");

window.addEventListener("load",()=>{
    formulario.addEventListener("submit",buscarClima);
})

function buscarClima(e){
    e.preventDefault();
    //leer los valores de los campos
    const ciudad=document.querySelector("#ciudad").value;
    const pais=document.querySelector("#pais").value;

    if(ciudad ==="" || pais ===""){
        //Hubo un error
       mostrarError("Ambos campos son obligatorios");
       return;
    }
   
    //consultar Api
    consultarApi(ciudad,pais);
}

function mostrarError(mensaje){
    //creacion de la alerta
    const alerta=document.querySelector(".bg-red-100");

    if (!alerta) {
        const divAlerta=document.createElement("div");

        divAlerta.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded","max-w-md","mx-auto","mt-6","text-center");

        divAlerta.innerHTML=
        `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `
        container.appendChild(divAlerta);

        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }  
};

function consultarApi(ciudad,pais){
    console.log(ciudad);
    console.log(pais);
    const appId=`022dc5eddfd4e50a7b0fc5974091e126`;

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    spinner();
        fetch(url)
        .then(respuesta => respuesta.json())

        .then(datos => {
            limpiarHtml();
            if (datos.cod ==="404") {
                mostrarError("Ciudad no encontrada");  
            } 
            else{
                mostrarResultado(datos);       
            }    
        });    
};

function mostrarResultado(datos){
    const {  name,main: {temp,temp_max,temp_min}}=datos;//destructuracion del objecto

    const centigrados = kelvinACentigrados(temp);//convierte a centigrados
    const tempMinima= kelvinACentigrados(temp_min);
    const temPMaxima= kelvinACentigrados(temp_max);

    const nombre=document.createElement("p");
    nombre.textContent=`Clima en ${name}`;
    nombre.classList.add("font-bold","text-2xl");

    const actual =document.createElement("p");
    actual.innerHTML= `${centigrados} &#8451;`;
    actual.classList.add("font-bold","text-6xl");

    const minima=document.createElement("p");
    minima.innerHTML= `Minima: ${tempMinima} &#8451;`;
    minima.classList.add("text-xl");

    const maxima =document.createElement("p");
    maxima.innerHTML=`Maxima: ${temPMaxima} &#8451;`;
    maxima.classList.add("text-xl");

    const resultadoDiv =document.createElement("div");
    resultadoDiv.classList.add("text-center","text-white");

    resultadoDiv.appendChild(nombre)
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxima)
    resultadoDiv.appendChild(minima);

    resultadoClima.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => Math.trunc(grados-273.15);

function limpiarHtml(){
    while (resultadoClima.firstChild) {
        resultadoClima.removeChild(resultadoClima.firstChild);
    }
}

function spinner(){

    limpiarHtml();

    const divSpinner=document.createElement("div");
    divSpinner.classList.add("sk-circle");
    divSpinner.innerHTML=
    `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `
    resultadoClima.appendChild(divSpinner);
}