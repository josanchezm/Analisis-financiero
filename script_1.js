
// Helpers

// Calculadora promedio

function calcularPromedio(lista) {
    let listaFloat = [];

    for(i=0;i<lista.length;i++) {
        listaFloat.push(parseFloat(lista[i]));
    }

    const sumaLista = listaFloat.reduce(
        function(valorAcumulado = 0,nuevoElemento) {
            const sumatoria = valorAcumulado + nuevoElemento;
            return sumatoria;
        }
    );

    const promedioLista = sumaLista/lista.length;
    
    const resultado = `${promedioLista.toFixed(2)} ${monedaValue}`;
    return resultado;
}

function esPar(numero) {
    return (numero % 2 === 0);
}

// Calculadora mediana

function medianaSalarios(lista) {
    const mitadLista = parseInt(lista.length/2);

    if(esPar(lista.length)) {
        const mitadLista_1 = lista[mitadLista-1];
        const mitadLista_2 = lista[mitadLista];

        const mediana = calcularPromedio([mitadLista_1,mitadLista_2]);
        const resultado = `${mediana}`;
        return resultado;
    } else {
        const resultado = `${lista[mitadLista]} ${monedaValue}`;
        return resultado;
    }
}

// Calculo media y mediana general

function mediaMedianaGeneral(lista) {
    // Extraer en un array los objetos validos para el calculo

    let conjunto = [];

    for(i=0;i<lista.length;i++) {
        if(lista[i].salary>0 && lista[i].fixed_costs>0 && lista[i].borrowing>0) {
            conjunto.push(lista[i]);
        }
        if(conjunto[0] == null) {
            alert("los ingresos, egresos y porcentaje de endeudamiento deben ser mayores a 0");
        };
    }
    
    // Extraer los salarios del array de objetos

    const salariosMap = conjunto.map(
        function(persona) {
            return persona.salary;
        }
    );
    
    // Ordenar el array de menor a mayor 

    const salariosSort = salariosMap.sort(
        function(a,b) {
        return a-b;
        }
    );

    let mediana =  medianaSalarios(salariosSort);
    let promedio = calcularPromedio(salariosSort);

    let resultado = `Promedio conjunto: ${promedio}
    Mediana conjunto: ${mediana}`

    return resultado;
}

// Calculo de la capacidad de endeudamiento, su media y mediana y la capacidad de ahorro general 

function capacidadDeEndeudamientoYAhorro(lista) {
    // Extraer en un array los objetos validos para el calculo

    let conjunto = [];

    for(i=0;i<lista.length;i++) {
        if(lista[i].salary>0 && lista[i].fixed_costs>0 && lista[i].borrowing>0) {
            conjunto.push(lista[i]);
        }
        if(lista[i].salary<=0) {
            alert(`los ingresos de ${lista[i].name} deben ser mayores a 0`);
        } 
        if(lista[i].fixed_costs<=0) {
            alert(`los egresos de ${lista[i].name} deben ser mayores a 0`);
        }
        if(lista[i].borrowing<=0) {
            alert(`la capacidad de endeudamiento ${lista[i].name} debe ser mayor a 0`);
        }
        if(lista[i].borrowing>40) {
            alert(`la capacidad de endeudamiento ${lista[i].name} es mayor al 40%, lo cual no es recomendable`);
        }
    };

    // Extraer en un array la capacidad de endeudamiento general

    let borrowingCapacityMap = conjunto.map(
        function(persona) {
                return ((persona.salary - persona.fixed_costs)*(persona.borrowing/100)).toFixed(2);
            }
    );

    // Ordenar el array de capacidad de endeudamiento de menor a mayor 

    let borrowingCapacitySort = borrowingCapacityMap.sort(
        function(a,b) {
        return a-b;
        }
    );
    
    let promedio = calcularPromedio(borrowingCapacityMap);
    let mediana = medianaSalarios(borrowingCapacitySort);

    // Extraer en arrays el porcentaje del ingreso neto disponible, asi como el ingreso neto disponible (despues de deudas)

    const savingCapacity = conjunto.map(
        function(persona) {
            return persona.salary *.1
        }
    )
    
    const aviableNetIncomePercent = conjunto.map(
        function(persona) {
            return 100 - persona.borrowing;
        }
    )

    const aviableNetIncome = conjunto.map(
        function(persona) {
            return ((persona.salary-persona.fixed_costs)*((100-persona.borrowing)/100));
        }
    )

    // Pushear en un array la capacidad o incapacidad de ahorro para cada elemento 

    let saveCapacity = [];
    
    for(i=0;i<aviableNetIncome.length;i++) {
        if(aviableNetIncome[i]>=savingCapacity[i]) {
            saveCapacity.push({name: conjunto[i].name,
                aviable_net_income_percent: aviableNetIncomePercent[i], 
                aviable_net_income: aviableNetIncome[i], 
                save_capacity: "valida"});
        } else if(aviableNetIncome[i]===0) {
            saveCapacity.push({name: lista[i].name,
                aviable_net_income_percent: 0,
                aviable_net_income: aviableNetIncome[i],
                save_capacity: "invalida"});
            alert(`El ingreso neto disponible de ${conjunto[i].name} es 0, imposibilitando una capacidad de ahorro`);
        } else if(aviableNetIncome[i]<0) {
            saveCapacity.push({name: conjunto[i].name,
                aviable_net_income_percent: `-${aviableNetIncomePercent[i]}`,
                aviable_net_income: aviableNetIncome[i],
                save_capacity: "invalida"});
            alert(`Los egresos de ${conjunto[i].name} superan sus ingresos, imposibilitando una capacidad de ahorro`);
        } else {
            saveCapacity.push({name: conjunto[i].name,
                aviable_net_income_percent: aviableNetIncomePercent[i],
                aviable_net_income: aviableNetIncome[i],
                save_capacity: "invalida"});
            alert(`El ingreso neto disponible de ${conjunto[i].name} es insuficiente para la capacidad minima de ahorro del 10% del salario`);
        }
    }
    
    let capacidadAhorroEndeudamiento = [];

    for(i=0;i<conjunto.length;i++) {
        capacidadAhorroEndeudamiento.push(`
        ______________________________________
        Usuario: ${conjunto[i].name} 
        Ingresos: ${conjunto[i].salary} ${monedaValue}
        Egresos: ${conjunto[i].fixed_costs} ${monedaValue}

        Capacidad endeudamiento(${conjunto[i].borrowing}%): ${borrowingCapacityMap[i]} ${monedaValue}
        Capacidad de ahorro: ${saveCapacity[i].save_capacity}

        Ingreso neto disponible para ahorro(%): ${saveCapacity[i].aviable_net_income_percent}
        Ingreso neto disponible para ahorro: ${(saveCapacity[i].aviable_net_income).toFixed(2)} ${monedaValue}`);
    }

    let resultado = `${capacidadAhorroEndeudamiento}
    ______________________________________
    
    Promedio capacidad de endeudamiento: ${promedio}
    Mediana capacidad de endeudamiento: ${mediana}`;
    return resultado;    
} 


// top n%: promedio, mediana, capacidad de endeudamiento(promedio, mediana) y capacidad de ahorro

function topN(lista,porcentaje) {
    const salariosTop = porcentaje;

    const salariosMap = lista.map(
        function(persona) {
        return persona.salary;
        }
    );
    console.log(salariosMap);

    const listaSalarySort = lista.sort(
        function(a,b) {
            return a.salary-b.salary;
        }
    );
    console.log(listaSalarySort);

    const salariosSort = salariosMap.sort(
        function(a,b) {
        return a-b;
        }
    );
    console.log(salariosSort);

    const spliceStart = (salariosSort.length*(100-salariosTop))/100;
    const spliceCount = salariosSort.length - spliceStart;
    console.log(spliceCount);

    if(spliceCount<1) {
        alert('el porcentaje que intenta evaluar es muy pequeño en relacion con el conjunto dado, intente con uno mayor');
        return '';
    } 
    else {
        const salariosTopN = salariosSort.splice(spliceStart,spliceCount);
        const listaTopN = listaSalarySort.splice(spliceStart,spliceCount);

        console.log(salariosTopN);
        console.log(listaTopN);

        let promedioTopN = calcularPromedio(salariosTopN);
        let medianaTopN = medianaSalarios(salariosTopN);
        let borrowingAndSaveCapacityTopN = capacidadDeEndeudamientoYAhorro(listaTopN);

        let conjuntoTopN = [`Conjunto top ${porcentaje}%`];

        for(i=0;i<listaTopN.length;i++) {
            conjuntoTopN.push(`

            Usuario: ${listaTopN[i].name}
            Ingresos: ${listaTopN[i].salary} ${monedaValue}`
            ); 
        };

        let resultado = `
        ${conjuntoTopN}

        Promedio conjunto: ${promedioTopN}
        Mediana conjunto: ${medianaTopN}${borrowingAndSaveCapacityTopN}`;

        return resultado;
    }
}



