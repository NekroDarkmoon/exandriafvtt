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
        // // Calculate season based on about time, error if about time is not installed.
        // const aboutTime = game.modules.get('about-time');
        // if (aboutTime?.active) {

        //     // Consts for season times
        //     const seasons_mc = {'spring':[13, 3], 'summer':[26,5], 'autumn':[3,8], 'winter':[2,11]};


        //     //  Get time
        //     let currTime = game.Gametime.DTNow();
        //     let day = currTime?.days;
        //     let month = currTime?.months;
            
            
            

        // } else {
        //     console.error("ExandriaFvtt | About Time not isntalled");
        //     ui.notification("About time is not not installed. Cannot get current season.");
        // }
    }

    /**
     * 
     */
    generateTemperature(){    };
    generateWinds(){    };
    generateHumidity(){     };
    generatePrecipitation(){    };
    getWeather() {    };

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

