let continuar = true;

while (continuar) {
  let num1 = parseInt(prompt("Ingresar el primer número:"));
  let num2 = parseInt(prompt("Ingresar el segundo número:"));

  let operacion = prompt("Elegir una operación: suma, resta, multiplicación o división");

  let resultado;

  if (operacion === "suma") {
    resultado = num1 + num2;
  } else if (operacion === "resta") {
    resultado = num1 - num2;
  } else if (operacion === "multiplicacion") {
    resultado = num1 * num2;
  } else if (operacion === "division") {
    resultado = num1 / num2;
  } else {
    resultado = "Operación no valida";
  }

  alert("El resultado es: " + resultado);

  let respuesta = prompt("¿Deseas hacer otro cálculo? (si/no)");

  if (respuesta.toLowerCase() !== "si") {
    continuar = false;
  }
}

alert("Nos vemos!");
