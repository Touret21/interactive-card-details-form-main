const formulario = document.querySelector("#form");
const cardNumber = document.querySelector("#card-number");
const cardName = document.querySelector("#card-name");
const month = document.querySelector('#d_month');
const monthText = document.getElementById('month');
const year = document.querySelector('#d_year');
const yearText = document.getElementById('year');
const fechaActual = new Date();
const cvc = document.querySelector('#cvc-text');
const form = document.getElementById('form');
const button = document.getElementById('b-send');
const number_error = document.getElementById('number_error');
const enviar = document.getElementById('enviar');
const cuerpo = document.getElementById('cuerpo-formulario');
const confirmacion = document.getElementById('confirmacion');
const icono = document.getElementById('completado');
const mensaje = document.getElementById('mensaje-aviso');
const continuar = document.getElementById('continue');
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;
var p5 = 0;
let isKeyPressed = false;

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita el envío del formulario

    // Realiza la validación de los campos del formulario
    if (form.checkValidity()) {
        enviar.classList.add('enviado');
        cuerpo.classList.add('invisible');
        button.style.width = '0%';
        button.style.visibility = 'hidden';
        icono.style.visibility = 'visible';
        icono.style.width = 'auto';
        continuar.style.visibility = 'visible';
        continuar.style.position = 'relative';
        confirmacion.textContent = 'THANK YOU';
        mensaje.textContent = "we've added your card details";
    }
});

continuar.addEventListener('click', () => {
    location.reload(); // Recarga la página
});

function animateButton() {
    button.style.backgroundColor = "rgb(6, 151, 6)";
}

// No permite que se mantenga presionado un boton para escribir seguido un numero
formulario.number.addEventListener('keydown', function (event) {
    if (isKeyPressed) {
        event.preventDefault();
        return;
    }

    isKeyPressed = true;
});

formulario.number.addEventListener('input', function (e) {
    let valorInput = e.target.value;

    formulario.number.value = valorInput.replace(/\s/g, '') // eliminar espacios en blanco
        .replace(/\D/g, '') // borrar letras 
        .replace(/([0-9]{4})/g, '$1 ') // poner espacio cada 4 numeros
        .trim(); // elimina el último espacio

    let digitos = valorInput.replace(/\s/g, '');
    let quitarLetras = digitos.replace(/[a-zA-Z]/g, '');
    let digitosRellenados = quitarLetras.padEnd(16, '0');

    cardNumber.textContent = digitosRellenados.replace(/(\d{4})(?=\d)/g, '$1 ');

    if (valorInput.length < 19) {
        p1 = 0;
    } else {
        p1 = 1;
    }

    habilitarBoton();

    isKeyPressed = false;
});

formulario.name.addEventListener('input', (e) => {
    let valorInput = e.target.value; // 'input' para que funcione el replace al momento

    formulario.name.value = valorInput.replace(/[^a-zA-Z\s]/g, '') // para solo aceptar letras
        .replace(/\s+/g, ' ')  // elimina espacios consecutivos;

    quitarNumeros = valorInput.replace(/\d/g, '')

    cardName.textContent = quitarNumeros.toUpperCase();

    if (quitarNumeros == '') {
        cardName.textContent = 'CARDHOLDER NAME';
    }

    if (valorInput.length < 3) {
        p2 = 0;
    } else {
        p2 = 1;
    }
    habilitarBoton();
});

let currentYear = [];
for (let i = 0; i < 5; i++) {
    let cont = fechaActual.getFullYear() % 100;

    currentYear[i] = cont + i;
}

let yearList = '<option value="" disabled selected hidden>YY</option>';

for (let i = 0; i < currentYear.length; i++) {
    yearList += '<option value="' + currentYear[i] + '">' + currentYear[i] + '</option>';
}

document.getElementById('d_year').innerHTML = yearList;


formulario.cvc.addEventListener('input', (e) => {
    let valorInput = e.target.value; // 'input' para que funcione el replace al momento

    valorInput = valorInput.replace(/\D/g, '')
        .substring(0, 3);

    formulario.cvc.value = valorInput;

    cvc.innerHTML = `${valorInput}`;

    if (valorInput == '') {
        cvc.innerHTML = '###';
    }

    if (valorInput.length < 3) {
        p5 = 0;
    }
    else {
        p5 = 1;
    }
    habilitarBoton();
});

year.addEventListener('input', (e) => {
    const selectElement = e.target.value; // Obtener el elemento select actual

    const selectedValue = selectElement.value;

    yearText.innerHTML = `${selectElement}`;

    if (selectedValue == 'MM') {
        p3 = 0;
    } else {
        p3 = 1;
    }
    habilitarBoton();
});

month.addEventListener('input', (e) => {
    const selectElement = e.target.value; // Obtener el elemento select actual

    const selectedValue = selectElement.value;

    monthText.innerHTML = `${selectElement}`;

    if (selectedValue == 'YY') {
        p4 = 0;
    } else {
        p4 = 1;
    }
    habilitarBoton();
});
function habilitarBoton() {
    let suma = p1 + p2 + p3 + p4 + p5;

    console.log(suma);

    if (suma == 5) {
        button.disabled = false;
        button.style.setProperty('background-color', 'hsl(278, 43%, 33%)', 'important');
        button.style.color = 'white';
        button.textContent = 'Confirm';
    } else {
        button.disabled = true;
    }
}