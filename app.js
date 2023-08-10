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
                if (id === '0') continue;

                const {nombre, lat, lng} = lugares.find(l => l.id === id)
                
                //Guardar en DB
                busquedas.agregarHistorial(nombre)

                //Clima
                const { desc, min, max, temp } = await busquedas.climalugar(lat, lng)
                //Mostrar los resultados
                // console.log(desc)

                console.clear()
                console.log('\nInformacion de la ciudad\n'.green)
                console.log('Ciudad:', nombre.green)
                console.log('Lat:', lat)
                console.log('Lng:', lng)
                console.log('Temperatura:', temp)
                console.log('Minima:', min)
                console.log('Maxima:', max)
                console.log('Descripcion de clima:', desc.green)
                break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i+1}.`.green
                    console.log(`${idx} ${lugar}`)
                })
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