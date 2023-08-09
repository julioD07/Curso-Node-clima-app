const { leerInput, inquireMenu, pausa } = require("./helpers/inquirer");

const main = async () => {

    let opt 

    do {

        opt = await inquireMenu("Favor escoja una opcion")
        console.log({opt})
        
        switch (opt) {
            case 1:
                
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