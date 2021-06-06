// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// Global Vars
var currentWeather;

// ------------------------------------------------------------------------
//                         Constants and Hooks 
// ------------------------------------------------------------------------
Hooks.once('ready', async () => {
    // Get Current Region
    try {
        const currentRegion = game.settings.get('exandriafvtt', 'current-region');
        const currentSeason = game.settings.get('exandriafvtt', 'current-season')

        // Get old weather or create new object
        currentWeather = new Weather(currentRegion, currentSeason);

        currentWeather.genWeather();
        game.settings.set('exandriafvtt', 'current-weather', currentWeather);

    } catch (error) {
        console.error(`ExandriaFvtt | Error in getting current location.${error}`);
        ui.notifications.error("ExandriaFvtt | There was an error in generating weather.");
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
    
    
    randGen(min, max) {
        return Math.floor(min + ((max - min + 1) * Math.random()))
    }

    // Set Climate
    setClimate(region) {
        // Data values
        const region_mc = {
            spring: {humidity: 1, tempRange: {max: 20, min: 15}, precip: 0},
            summer: {humidity: 1, tempRange: {max: 25, min: 20}, precip: 1},
            fall: {humidity: -1, tempRange: {max: 25, min: 15}, precip: 0},
            winter: {humidity: -1, tempRange: {max: 10, min: 15}, precip: -1}
        };

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
    
    genPrecip(rainChance, temp) {
        let weather = "";

        if (rainChance <= 0) {

        } 

        return weather;
    }

    genWeather() {
        // Variables
        let season = this.climate[this.season];

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

