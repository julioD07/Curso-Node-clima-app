const axios = require("axios");

class Busquedas {
  historial = ["Barranquilla", "Madrid", "Bogota"];

  constructor() {
    //TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
        'access_token':"pk.eyJ1IjoianVsc2tkaiIsImEiOiJjbGw0OTVsbTkwMzhzM2x0MGV5d2g0cDF3In0.hWSnzM7JbOhxfusA9dnzzg",
        'limit': 5,
        'proximity': "ip",
        'language': 'es'
    }
  }

  async ciudad(lugar = "") {
    // peticion HTTP
    // console.log('ciudad ',lugar)

    try {

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapbox
        })

        const resp = await instance.get();

        // const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/barranquilla.json?proximity=ip&language=es&access_token=pk.eyJ1IjoianVsc2tkaiIsImEiOiJjbGw0OTVsbTkwMzhzM2x0MGV5d2g0cDF3In0.hWSnzM7JbOhxfusA9dnzzg");
        console.log(resp.data);
        return []; //Retornar los lugares
    } catch (error) {
        // console.log()
        return []; //Retornar los lugares
    }

   
    
  }
}

module.exports = Busquedas;
