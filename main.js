// Función para añadir dos números
function add(num1, num2) {
  return num1 + num2;
}

// Función para restar dos números
function subtract(num1, num2) {
  return num1 - num2;
}

// Función para multiplicar dos números
function multiply(num1, num2) {
  return num1 * num2;
}

// Función para dividir dos números
function divide(num1, num2) {
  if (num2 === 0) {
    return "Dividir por 0 no está permitido.";
  }
  return num1 / num2;
}


let continueCalculating;
let resultsArray = [];

do {
  let num1 = parseFloat(prompt("Ingresa el primer número:"));
  let num2 = parseFloat(prompt("Ingresa el segundo número:"));

  let operation = prompt("Elige una operación: sumar, restar, dividir, o multiplicar.");

  let result;

  switch (operation) {
    case "sumar":
      result = add(num1, num2);
      break;
    case "restar":
      result = subtract(num1, num2);
      break;
    case "multiplicar":
      result = multiply(num1, num2);
      break;
    case "dividir":
      result = divide(num1, num2);
      break;
    default:
      result = "Operación invalida.";
  }

  resultsArray.push({
    num1,
    num2,
    operation,
    result
  });

  alert("El resultado es: " + result);

  let response = prompt("Querés hacer otro cálculo? (si/no)");

  if (response.toLowerCase() !== "si") {
    continueCalculating = false;
  } else {
    continueCalculating = true;
  }
} while (continueCalculating);

alert("Pasamos a revisar entonces!");

// Buscar y filtrar historial de operaciones
let searchOperation;

do {
  searchOperation = prompt("Elige una operación para revisar el historial realizado con esta (sumar, restar, etc), o escribe 'salir' para finalizar:");

  if (searchOperation.toLowerCase() !== "salir") {
    let filteredResults = resultsArray.filter(item => item.operation === searchOperation);

    if (filteredResults.length > 0) {
      alert("Historial para la operación '" + searchOperation + "':\n\n" +
        filteredResults.map(item => `${item.num1} ${item.operation} ${item.num2} = ${item.result}`).join("\n"));
    } else {
      alert("No se encontró historial para la operación '" + searchOperation + "'.");
    }
  }
} while (searchOperation.toLowerCase() !== "salir");

alert("Nos vemos!");
