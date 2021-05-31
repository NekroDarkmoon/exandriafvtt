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
    } catch (error) {
        console.log(`ExandriaFvtt | Error in getting current location.${error}`)
        ui.notification.error("ExandriaFvtt | There was an error in getting your curent region.");
    }

    // Get old weather or create new object

});

// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                              Weather 
// ------------------------------------------------------------------------
class Weather {

    constructor(currentRegion, currentSeason) {
        this.region = currentRegion;
        this.season = currentSeason;

        // Derived data object
        this.humidity = 0;
        this.temp = 0;
        this.precip = 0;

        // Get Previous data is exists
        let oldData = game.settings.get('exandriafvtt', 'current-weather')
        if (Object.keys(oldData).length === 0) {
            // Default to 0
            this.prevhumidity = 0;
            this.prevtemp = 0;
            this.prevprecip = 0;

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
    randgen(min, max) {
        return Math.floor(min + ((max - min + 1) * Math.random()))
    }

    // Set Climate
    setClimate(region) {
        // Data values
        const region_mc = {
            spring: {
                humidity: 0,
                tempRange: {max: 0, min: 0},
                precip: 0 
            },
            summer: {},
            fall: {},
            winter: {}
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
    
    /**
     * 
     */
    generateTemperature(){    };
    generateWinds(){    };
    generateHumidity(){     };
    generatePrecipitation(){    };

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

