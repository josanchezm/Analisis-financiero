let moneda = "usd";

// Extraer en un array los salarios del array de objetos

const salariosMap = colombia.map(
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

// Calculo media aritmetica

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
    
    const resultado = `${promedioLista.toFixed(2)} ${moneda}`;
    return resultado;
}

calcularPromedio(salariosMap);

// Calculo mediana

function esPar(numero) {
    return (numero % 2 === 0);
}

function medianaSalarios(lista) {
    const mitadLista = parseInt(lista.length/2);

    console.log(`lista length: ${lista.length}`);

    if(esPar(lista.length)) {
        const mitadLista_1 = lista[mitadLista-1];
        const mitadLista_2 = lista[mitadLista];

        const mediana = calcularPromedio([mitadLista_1,mitadLista_2]);
        const resultado = `Lista ordenada: ${lista}
        Mediana: ${mediana}`;
        return resultado;
    } else {
        const resultado = `Lista ordenada: ${lista}
        
        Mediana: ${lista[mitadLista]} ${moneda}`;
        return resultado;
    }
}

medianaSalarios(salariosSort);

