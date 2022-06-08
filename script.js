let colombia = [];
let monedaValue;

let prueba = [];

prueba.push({
  name: "Camila",
  salary: 0,
  fixed_costs: 400,
  borrowing: 40
});
prueba.push({
  name: "Nath",
  salary: 1500,
  fixed_costs: 500,
  borrowing: 40
});
prueba.push({
  name: "Luciana",
  salary: 1500,
  fixed_costs: 500,
  borrowing: 35
});

colombia.push({
  name: "Camila",
  salary: 500,
  fixed_costs: 0,
  borrowing: 0
});
colombia.push({
  name: "Nath",
  salary: 1500,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Luisa",
  salary: 1800,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Laura",
  salary: 1000,
  fixed_costs: 350,
  borrowing: 45
});
colombia.push({
  name: "Daniela",
  salary: 2200,
  fixed_costs: 350,
  borrowing: 0
});
colombia.push({
  name: "Esperancita",
  salary: 200,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Carla",
  salary: 500,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Antonieta",
  salary: 1500,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Alicia",
  salary: 1300,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Ana",
  salary: 2400,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Julia",
  salary: 3400,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Rosa",
  salary: 400,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Angélica",
  salary: 400,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Tatiana",
  salary: 400,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Lorena",
  salary: 600,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Carolina",
  salary: 1600,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Fernanda",
  salary: 2600,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Nora",
  salary: 1000,
  fixed_costs: 350,
  borrowing: 40
});
colombia.push({
  name: "Gisselle",
  salary: 2000,
  fixed_costs: 1350,
  borrowing: 40
});
colombia.push({
  name: "Bill Gates",
  salary: 100000000,
  fixed_costs: 1350,
  borrowing: 40
});

let conjunto = [];

function calculoFinanzas() {
  // Trayendo los valores del usuario para evaluarlos en los argumentos de las funciones

  const nombreInput = document.getElementById("nombre");
  const nombreValue = nombreInput.value;

  const ingresosInput = document.getElementById("ingresos");
  const ingresosValue = ingresosInput.value;

  const egresosInput = document.getElementById("egresos");
  const egresosValue = egresosInput.value;

  const endeudamientoInput = document.getElementById("porcentaje_endeudamiento");
  const endeudamientoValue = endeudamientoInput.value;

  conjunto.push({
    name: nombreValue,
    salary: parseFloat(ingresosValue),
    fixed_costs: parseFloat(egresosValue),
    borrowing: parseFloat(endeudamientoValue)
  });

  const monedaInput = document.getElementById("moneda");
  monedaValue = monedaInput.value;

  // Calculo promedio y mediana

  const promedio_mediana = mediaMedianaGeneral(conjunto);

  // Calculo de la capacidad de endeudamiento, su media y mediana y la capacidad de ahorro

  const endeudamiento_ahorro = capacidadDeEndeudamientoYAhorro(conjunto);

  const calculo = `${promedio_mediana} ${endeudamiento_ahorro}`;

  const resultado = document.getElementById("resultado");
  resultado.style.opacity = '100%';
  resultado.innerText = calculo;

  return calculo;
};

console.log(conjunto);

function calculoTopN() {
  // top n%: promedio, mediana, capacidad de endeudamiento(promedio, mediana) y capacidad de ahorro

  alert("si desea filtrar un conjunto distinto, recargue la pagina");

  const topNInput = document.getElementById("top_n_porciento");
  const topNValue = parseInt(topNInput.value);
  
  const calculo = topN(conjunto,topNValue);
  const resultado = document.getElementById("resultado_2");
  
  if(calculo === '') {
    resultado.innerText = '';
  }
  else {
    resultado.style.opacity = '100%';
    resultado.innerText = calculo;
  }
  return calculo;
};


