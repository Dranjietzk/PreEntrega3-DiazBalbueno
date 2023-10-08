let resultsArray = [];

async function loadResultsArray() {
  const storedResults = await getStoredResultsArray();
  resultsArray = storedResults || [];
}

async function getStoredResultsArray() {
  return new Promise((resolve, reject) => {
    try {
      const storedData = localStorage.getItem("resultsArray");
      const parsedData = JSON.parse(storedData);
      resolve(parsedData);
    } catch (error) {
      reject(error);
    }
  });
}

async function saveResultsArray() {
  await setStoredResultsArray(resultsArray);
}

async function setStoredResultsArray(data) {
  return new Promise((resolve, reject) => {
    try {
      const jsonString = JSON.stringify(data);
      localStorage.setItem("resultsArray", jsonString);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

async function getWeather(city) {
  const apiKey = '6d4b533fc0ba4080bddf8062be69524d'; 

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (response.ok) {
      const data = await response.json();
      const temperature = data.main.temp;
      const description = data.weather[0].description;

      Swal.fire({
        title: 'Clima',
        text: `El clima en ${city} es ${description} con una temperatura de ${temperature}°C.`,
        icon: 'info',
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener el pronóstico del clima.',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      title: 'Error',
      text: 'Error en la solicitud.',
      icon: 'error',
    });
  }
}

async function getWeatherByLocation() {
  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        const apiKey = '6d4b533fc0ba4080bddf8062be69524d';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        
        if (response.ok) {
          const data = await response.json();
          const city = data.name;
          const temperature = data.main.temp;
          const description = data.weather[0].description;

          Swal.fire({
            title: 'Clima',
            text: `El clima en ${city} es ${description} con una temperatura de ${temperature}°C.`,
            icon: 'info',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo obtener el pronóstico del clima.',
            icon: 'error',
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'La geolocalización no es compatible en este navegador.',
        icon: 'error',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      title: 'Error',
      text: 'Error en la solicitud.',
      icon: 'error',
    });
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Dividir por 0 no está permitido.";
  }
  return num1 / num2;
}

async function calculate() {
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
      result = "Operación inválida.";
  }

  document.getElementById("result").innerText = "El resultado es: " + result;

  resultsArray.push({
    num1,
    num2,
    operation,
    result
  });

  await saveResultsArray();
}

function searchHistory() {
  let searchOperation = document.getElementById("searchOperation").value;
  let filteredResults;

  if (searchOperation.toLowerCase() === "todas") {
    filteredResults = resultsArray;
  } else {
    filteredResults = resultsArray.filter(item => item.operation === searchOperation);
  }

  if (filteredResults.length > 0) {
    Swal.fire({
      title: `Historial para la operación '${searchOperation}'`,
      text: filteredResults.map(item => `${item.num1} ${item.operation} ${item.num2} = ${item.result}`).join("\n"),
      icon: 'info',
    });
  } else {
    Swal.fire({
      title: 'Historial no encontrado',
      text: `No se encontró historial para la operación '${searchOperation}'.`,
      icon: 'warning',
    });
  }
}

async function clearHistory() {
  resultsArray = [];
  await setStoredResultsArray([]);
  Swal.fire({
    title: 'Historial borrado',
    text: 'Historial de operaciones borrado.',
    icon: 'success',
  });
}

loadResultsArray();

document.getElementById('weatherLocationButton').addEventListener('click', getWeatherByLocation);
