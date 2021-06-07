// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------
import {weather_data} from "./utils/exandria-climate.js";

// ------------------------------------------------------------------------
//                              Weather 
// ------------------------------------------------------------------------
export class Weather {
    constructor(currentRegion, currentSeason) {
        this.set = true;
        this.region = currentRegion;
        this.season = currentSeason;

        this.temp = -1;
        this.humidity = -1;
        this.precip = "";
        this.sHumidity = null;
        this.setClimate(this.region) 

        this.prevTemp = -1;
        this.prevHumidity = -1;
        this.ftemp = -1;
        this.prevPrecip = "";

        // // Get previous data if exists
        // let oldData = game.settings.get('exandriafvtt', 'current-weather');
        // if (Object.keys(oldData).length === 0) {
        //     this.temp = -1;
        //     let _ = this.setClimate(this.region);
        
        // } else {
        //     // Fetch old data
        //     this.temp = oldData.temp;
        //     this.setClimate(this.region);
        // }

   }

    // Helper Functions
    randGen(min, max) {
        return Math.floor(min + ((max - min + 1) * Math.random()))
    }

    // Set Climate
    async setClimate(region) {
        
        // Return based on case
        switch(region){
            case 'region_mc':
                this.climate = weather_data.mc;
                return weather_data.mc;
            case 'region_mv': 
                this.climate = weather_data.mv;
                return weather_data.mv;
            case 'region_zf':
                this.climate = weather_data.zf;
                return weather_data.zf;
            case 'region_gw':
                this.climate = weather_data.gw;
                return weather_data.gw;
            case 'region_es':
                this.climate = weather_data.es;
                return weather_data.es;
            case 'region_wx':
                this.climate = weather_data.wx;
                return weather_data.wx;
            case 'region_bs':
                this.climate = weather_data.bs;
                return weather_data.bs;
        }
    };
    

    genWeather() {
        // Variables
        let climateData = this.climate[this.season];
        console.log(climateData);
        
        // TODO: Add support for weather events

        // Generate temperature
        let currTemp = this.getTemp(climateData); 
        console.log(currTemp);

        // Generate humidity
        let humidity = this.getHumidity(climateData);
        console.log(humidity);

        // Update object
        this.prevTemp = currTemp;
        this.prevHumidity = humidity;
        this.ftemp = currTemp * (9/5) + 32;
        
        // Get precipitation
        this.precip = this.getPrecip(currTemp, humidity);

        // Display output
        this.display();

    }


    getTemp(climateData) {
        // Variables
        let prevTemp = this.prevTemp;
        var result;

        // If no existing temp records create new data else do a relative change.
        if (prevTemp === -1) {
            result = this.randGen(climateData.tempmin, climateData.tempmax);
            return result;
        
        } else {result = this.randGen((prevTemp - 3), (prevTemp + 3));}

        // Check if temperature out of bounds
        if ((result > climateData.tempmax) || (result < climateData.tempmin)) {
            result = this.randGen(climateData.tempmin, climateData.tempmax);
        }

        return result;
    }


    getHumidity(climateData) {
        // Varabiles
        let prevHumidity = this.prevHumidity;
        var result = this.randGen(1, 6); 
        var seasonHumidity;
        var climateHumidity;
        
        // Get humidity level for season
        let chance = climateData.rain + climateData.snow;

        if (chance > 0.65) {seasonHumidity = 1;}
        else if (chance < 0.35) {seasonHumidity = -1;}
        else {seasonHumidity = 0;}

        // Get humidity level for climate
        let climate = this.climate;
        let rain = climate?.spring.rain + climate?.summer.rain + climate?.fall.rain + climate?.winter.rain;
        let snow = climate?.spring.snow + climate?.summer.snow + climate?.fall.snow + climate?.winter.snow;

        if (rain == undefined || snow == undefined){chance = 0;}
        else {chance = Math.floor((rain/4) + (snow/4));}

        if (chance > 0.65) {climateHumidity = 1;}
        else if (chance < 0.35) {climateHumidity = -1;}
        else {climateHumidity = 0;}

        // If no existing records
        if (prevHumidity === -1) { result += seasonHumidity + climateHumidity;} 
        else { result += prevHumidity + seasonHumidity + climateHumidity;}

        return result;
    }


    getPrecip(temp, humidity) {
        var weather = "";
        
        switch (true) {
            case (humidity <= 3):
                weather = game.i18n.localize("ClearWeather");
                console.log("exandria here")
                break;

            case (humidity <= 6):
                weather = game.i18n.localize("ScatteredClouds");
                console.log("exandria here")
                break;

            case (humidity === 7):
                if (temp > 1) {weather = game.i18n.localize("OvercastDrizzle");}
                else if (temp > -2) {weather = game.i18n.localize("OvercastMixed");}
                else {weather = game.i18n.localize("OvercastFlurries")}
                break;
            
            case (humidity === 8):
                if (temp > 5) {weather = game.i18n.localize("LightRain");}
                else if (temp > -1){weather = game.i18n.localize("LightMixed");}
                else {weather = game.i18n.localize("LightSnow");}
                break;
            
            case (humidity === 9):
                if (temp > 5) {weather = game.i18n.localize("HeavyRain");}
                else if (temp > -1) {weather = game.i18n.localize("HeavyMixed");}
                else {weather = game.i18n.localize("HeavySnow");}
                break;
            
            case (humidity === 100):
                // TODO: IMPLEMENT WEATHER EVENTS
                break;
        }

        console.log(weather);
        return weather;
    }


    display() {
        let recipient = ChatMessage.getWhisperRecipients("GM");
        let message = `<b>${this.prevTemp}°C </b> - ${this.precip}.`;

        ChatMessage.create({
           speaker: {alias: "Hupperdook Weather Station"},
           whisper: recipient,
           content: message 
        });

    }
}

