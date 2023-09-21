// Inicializar el historial de operaciones desde el almacenamiento local (localStorage)
let resultsArray = JSON.parse(localStorage.getItem("resultsArray")) || [];
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



// Función para realizar el cálculo y guardar en el historial
function calculate() {
  let num1 = parseFloat(document.getElementById("num1").value);
  let num2 = parseFloat(document.getElementById("num2").value);
  let operation = document.getElementById("operation").value;
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

  document.getElementById("result").innerText = "El resultado es: " + result;

  // Agregar la operación al historial
  resultsArray.push({
    num1,
    num2,
    operation,
    result
  });

  // Guardar el historial en el almacenamiento local (localStorage)
  localStorage.setItem("resultsArray", JSON.stringify(resultsArray));
}

// Función para buscar historial de operaciones
function searchHistory() {
  let searchOperation = document.getElementById("searchOperation").value;
  let filteredResults;

  if (searchOperation.toLowerCase() === "todas") {
    // Si se selecciona "todas", muestra todas las operaciones en el historial
    filteredResults = resultsArray;
  } else {
    // Filtrar las operaciones según la operación seleccionada
    filteredResults = resultsArray.filter(item => item.operation === searchOperation);
  }

  if (filteredResults.length > 0) {
    document.getElementById("historyResult").innerText = "Historial para la operación '" + searchOperation + "':\n\n" +
      filteredResults.map(item => `${item.num1} ${item.operation} ${item.num2} = ${item.result}`).join("\n");
  } else {
    document.getElementById("historyResult").innerText = "No se encontró historial para la operación '" + searchOperation + "'.";
  }
}

// Función para limpiar el historial

function clearHistory() {
  resultsArray = [];

  localStorage.removeItem("resultsArray");

  document.getElementById("historyResult").innerText = "Historial de operaciones borrado.";
}
