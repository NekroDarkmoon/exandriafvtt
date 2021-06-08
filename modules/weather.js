// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------
import { moduleTag } from "./utils/constants.js";
import {weather_data} from "./utils/exandria-climate.js";

// ------------------------------------------------------------------------
//                              Weather 
// ------------------------------------------------------------------------
export class Weather {
    /**
     * Constructor
     */
    constructor() {
        // Get previous data if exists
        let oldData = game.settings.get('exandriafvtt', 'current-weather');
        
        // Set base data
        try {
            this.set = true;
            this.region = game.settings.get('exandriafvtt', 'current-region');
            this.season = game.settings.get('exandriafvtt', 'current-season');
            this.setClimate(this.region);
        } catch (error) {
            console.error(`${moduleTag} | Error in constructor ${error}.`);
        }

        // Set derived data based on if old data exists
        if (Object.keys(oldData).length === 0) {
            this.temp = -1;
            this.humidity = -1;
            this.precip = "";
            this.sHumidity = null;
            this.ftemp = -1;

            this.lastUpdate = Gametime.DTNow();
            this.genWeather();

        } else {
            // Fetch old data
            this.temp = oldData.temp;
            this.humidity = oldData.humidity;
            this.precip = oldData.precip;
            this.sHumidity = oldData.sHumidity;
            this.ftemp = oldData.ftemp;
            this.lastUpdate = oldData.lastUpdate;
        }

   }


    // Helper Functions
    /**
     * Random Number Generator
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
    randGen(min, max) {
        return Math.floor(min + ((max - min + 1) * Math.random()))
    }


    /**
     * Set Climate
     * @param {*} region 
     * @returns 
     */
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
    

    /**
     * Generate New Weather Data
     */
    genWeather() {
        // Variables
        let climateData = this.climate[this.season];
        
        // TODO: Add support for weather events

        // Generate temperature
        let currTemp = this.getTemp(climateData); 

        // Generate humidity
        let humidity = this.getHumidity(climateData);

        // Update object
        this.temp = currTemp;
        this.humidity = humidity;
        this.ftemp = currTemp * (9/5) + 32;
        
        // Get precipitation
        this.precip = this.getPrecip(currTemp, humidity);

        // Display output and save to settings.
        this.sendToChat();
    }


    /**
     * Get new Temperature
     * @param {*} climateData 
     * @returns 
     */
    getTemp(climateData) {
        // Variables
        let prevTemp = this.temp;
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


    /**
     * Get new Humidity
     * @param {*} climateData 
     * @returns 
     */
    getHumidity(climateData) {
        // Varabiles
        let prevHumidity = this.humidity;
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
        else { result += seasonHumidity + climateHumidity;}

        return result;
    }


    /**
     * Get Precipitation Report
     * @param {*} temp 
     * @param {*} humidity 
     * @returns 
     */
    getPrecip(temp, humidity) {
        var weather = "";
        
        switch (true) {
            case (humidity <= 3):
                weather = game.i18n.localize("ClearWeather");
                break;

            case (humidity <= 6):
                this.humidity += 1;
                weather = game.i18n.localize("ScatteredClouds");
                break;

            case (humidity === 7):
                if (temp > 1) {weather = game.i18n.localize("OvercastDrizzle");}
                else if (temp > -2) {weather = game.i18n.localize("OvercastMixed");}
                else {weather = game.i18n.localize("OvercastFlurries")}
                break;
            
            case (humidity === 8):
                this.humidity -= 1;
                if (temp > 5) {weather = game.i18n.localize("LightRain");}
                else if (temp > -1){weather = game.i18n.localize("LightMixed");}
                else {weather = game.i18n.localize("LightSnow");}
                break;
            
            case (humidity === 9):
                this.humidity -= 2;
                if (temp > 5) {weather = game.i18n.localize("HeavyRain");}
                else if (temp > -1) {weather = game.i18n.localize("HeavyMixed");}
                else {weather = game.i18n.localize("HeavySnow");}
                break;
            
            case (humidity === 100):
                // TODO: IMPLEMENT WEATHER EVENTS
                break;
        }

        return weather;
    }


    /**
     * Display Weather to chat
     */
    async sendToChat() {
        let recipients = ChatMessage.getWhisperRecipients("GM").map(user => user.id);
        let message = `<b>${this.temp}°C </b> - ${this.precip}.`;

        await ChatMessage.create({
           speaker: {alias: "Hupperdook Weather Station"},
           whisper: recipients,
           content: message,
        });

    }
}

// ------------------------------------------------------------------------
//                              Weather 
// ------------------------------------------------------------------------


// ------------------------------------------------------------------------
//                              Weather 
// ------------------------------------------------------------------------
