const fs = require('fs')
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

  constructor() {
    //TODO: leer DB si existe
    this.leerDB()
  }

  get historialCapitalizado(){
    return this.historial.map((lugar) => {

        let palabras = lugar.split(' ');
        palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))

        return palabras.join(' ')
    })
  }

  get paramsMapbox() {
    return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'proximity': "ip",
        'language': 'es'
    }
  }

  paramsOpenWheater(lat, lon) {
    return {
      "appid": "94d8116847deec8e4e96374a8889a8d9",
      "lat": lat,
      "lon": lon,
      "units": "metric",
      "lang": "es"
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

        return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
        }))
        ; //Retornar los lugares
    } catch (error) {
        // console.log()
        return []; //Retornar los lugares
    }
  }

  async climalugar(lat, lon) {
    try {
      
      //Crear la instancia de axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: this.paramsOpenWheater(lat, lon)
      })

      const resp = await instance.get();
      const {weather, main} = resp.data
      const {temp_min, temp_max, temp} = main

      return {
        desc: weather[0].description,
        min: temp_min,
        max: temp_max,
        temp: temp
      }

    } catch (error) {
      console.log(error)
    }
  }

  agregarHistorial(lugar = '') {
      //TODO prevenir duplicados

      if (this.historial.includes(lugar.toLocaleLowerCase())) {
        return
      }

      this.historial = this.historial.splice(0,5)

      this.historial.unshift(lugar.toLocaleLowerCase())

      //TODO Grabar en DB
      this.guardarDB()

  }

  guardarDB(){

      const payload = {
        historial: this.historial
      }

      fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB(){
    const info = fs.readFileSync(this.dbPath)

    const data = JSON.parse(info)

    this.historial = data.historial

  }
  
}

module.exports = Busquedas;
