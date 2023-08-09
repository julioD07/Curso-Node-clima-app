require('dotenv').config()
const { leerInput, inquireMenu, pausa, listarLugares } = require("./helpers/inquirer");
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
                const termino = await leerInput("Ciudad: ")
                // console.log(lugar)

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino)

                // Seleccionar el lugar
                const id = await listarLugares(lugares)
                const lugarSel = lugares.find(l => l.id === id)
                
                const {nombre, lat, lng} = lugarSel

                // Buscar los lugares

                // Seleccionar el lugar

                //Clima

                //Mostrar los resultados

                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad:', nombre)
                console.log('Lat:', lat)
                console.log('Lng:', lng)
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