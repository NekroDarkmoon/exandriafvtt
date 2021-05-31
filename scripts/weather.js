// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                         Constants and Hooks 
// ------------------------------------------------------------------------
Hooks.once('ready', async () => {
    // Get Current Region
    try {
        const currentRegion = game.settings.get('exandriafvtt', 'current-region');
        const currentSeason = game.settings.get('exandriafvtt', 'current-season')

        // Get old weather or create new object
        var currentWeather;
        let exisitngData = game.settings.get('exandriafvtt', 'current-weather');
        if (Object.keys(exisitngData).length === 0 ) {
            currentWeather = new Weather(currentRegion, currentSeason);
        } else {currentWeather = exisitngData;}


    } catch (error) {
        console.error(`ExandriaFvtt | Error in getting current location.${error}`);
        ui.notifications.error("ExandriaFvtt | There was an error in getting your curent region.");
    }

});

// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                              Weather 
// ------------------------------------------------------------------------
class Weather {

    constructor(currentRegion, currentSeason) {
        this.set = true;
        this.region = currentRegion;
        this.season = currentSeason;

        // Derived data object
        this.humidity = 0;
        this.temp = 0;
        this.precip = 0;

        // Get Previous data is exists
        let oldData = game.settings.get('exandriafvtt', 'current-weather')
        if (Object.keys(oldData).length === 0) {
            // Default to -1
            this.prevhumidity = -1;
            this.prevtemp = -1;
            this.prevprecip = -1;
            let _ = this.setClimate(this.region);

        } else {
            // Fetch old data into new variables
            this.prevhumidity = oldData.humidity;
            this.prevtemp = oldData.temp;
            this.prevprecip = oldData.precip;
            this.climate = oldData.climate;
        }
   }

    // Helper Functions
    // Random generator
    randGen(min, max) {
        return Math.floor(min + ((max - min + 1) * Math.random()))
    }

    // Set Climate
    setClimate(region) {
        // Data values
        // Based on New Zealand
        const region_mc = {
            spring: {
                humidity: 77.5,
                tempRange: {max: 20, min: 15},
                precip: 0.12 
            },
            summer: {
                humidity: 78.3,
                tempRange: {max: 25, min: 20},
                precip: 0 
            },
            fall: {
                humidity: 84.8,
                tempRange: {max: 25, min: 15},
                precip: 0 
            },
            winter: {
                humidity: 85.5,
                tempRange: {max: 10, min: 15},
                precip: 0 
            }
        }

        const region_mv = {}


        // Return based on case
        switch(region){
            case 'region_mc':
                this.climate = region_mc;
                return region_mc;
            case 'region_mv': 
                this.climate = region_mv;
                return region_mv;
            case 'region_zf':
                this.climate = region_zf;
                return region_zf;
            case 'region_gw':
                this.climate = region_gw;
                return region_gw;
            case 'region_es':
                this.climate = region_es;
                return region_es;
            case 'region_wx':
                this.climate = region_wx;
                return region_wx;
            case 'region_bs':
                this.climate = region_bs;
                return region_bs;
        }
        
    };
    
    genPrecip(humidity, temp) {
        let weather = "";

        

        return weather;
    }

    /**
     * 
     */
    genWeather() {
        // Variables
        let climate = this.climate;

        // Generate naive humidity
        let humidity = this.randGen(-6, 6);
        humidity = humidity + climate[this.season]['humidity'];
        
        // Naive guessing attempt at generating weather
        // TODO: Switch to a procedural approach
        let temp = this.randGen(climate[this.season]['tempRange']['min'],
                            climate[this.season]['tempRange']['max']);
        
        this.temp = temp;

        // Derive precipitation and weather based on temp and humidity
        let weather = this.genPrecip(humidity, temp);
        
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

// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

