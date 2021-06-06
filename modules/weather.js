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

        // Get previous data if exists
        let oldData = game.settings.get('exandriafvtt', 'current-weather');
        if (Object.keys(oldData).length === 0) {
            this.temp = -1;
            let _ = this.setClimate(this.region);
        
        } else {
            // Fetch old data
            this.temp = oldData.temp;
            this.setClimate(this.region);
        }

        // // Get Previous data is exists
        // let oldData = game.settings.get('exandriafvtt', 'current-weather');
        // if (Object.keys(oldData).length === 0) {
        //     // Default to -1
        //     this.prevhumidity = -1;
        //     this.prevtemp = -1;
        //     this.prevprecip = -1;
        //     let _ = this.setClimate(this.region);

        // } else {
        //     // Fetch old data into new variables
        //     this.prevhumidity = oldData.humidity;
        //     this.prevtemp = oldData.temp;
        //     this.prevprecip = oldData.precip;
        //     this.climate = oldData.climate;
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
    

    genPrecip(rainChance, temp) {
        let weather = "";

        if (rainChance <= 0) {

        } 

        return weather;
    }

    genWeather() {
        // Variables
        let season = this.climate[this.season];
        console.log(season);

        // Generate naive humidity
        let rainChance = this.randGen(1, 6);
        rainChance = rainChance + season['humidity'] + season['precip'];
        
        // Naive guessing attempt at generating weather
        // TODO: Switch to a procedural approach
        let temp = this.randGen(season['tempRange']['min'],
                            season['tempRange']['max']);
        
        this.temp = temp;

        // Derive precipitation and weather based on temp and humidity
        let weather = this.genPrecip(rainChance, temp);
        
        this.display();
        
    }


    display() {
        let recipient = ChatMessage.getWhisperRecipients("GM");
        let message = `<b>${this.temp}°C </b> - Other Stuff goes here.`;

        ChatMessage.create({
           speaker: {alias: "Hupperdook Weather Station"},
           whisper: recipient,
           content: message 
        });

    }
}

