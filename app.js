const { leerInput, inquireMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {

    const busquedas = new Busquedas()

    let opt 

    do {

        opt = await inquireMenu("Favor escoja una opcion")
        // console.log({opt})

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput("Ciudad: ")
                console.log(lugar)
                // Buscar los lugares

                // Seleccionar el lugar

                //Clima

                //Mostrar los resultados

                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad: ')
                console.log('Lat: ')
                console.log('Lng: ')
                console.log('Temperatura: ')
                console.log('Minima: ')
                console.log('Maxima: ')
                break;
            case 2:
                
                break;
            case 0:
                
                break;
            default:
                break;
        }

        if (opt !== 0) await pausa()

    } while(opt !== 0)

    // const texto = await leerInput('Hola: ')
}

main();