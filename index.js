// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------
import {RegisterSettings} from "./modules/settings.js"; 
import { moduleName, moduleTag } from "./modules/utils/constants.js";
import { Weather } from "./modules/weather.js";


// ------------------------------------------------------------------------
//                                 Constants 
// ------------------------------------------------------------------------
var currentWeather;



// ------------------------------------------------------------------------
//                              Inital Setup 
// ------------------------------------------------------------------------
Hooks.on('init', async () => {
    // Register settings
    await RegisterSettings();

    console.log(`${moduleTag} | Ready`);
});


Hooks.once('ready', async () => {
    
    // Check if weather is set 
    if (game.settings.get(moduleName, 'generate-weather')){
        // Get old weather or create new object
        currentWeather = new Weather();
            
        // Display Weather to both chat? and template
        currentWeather.sendToChat();
        await game.settings.set('exandriafvtt', 'current-weather', currentWeather);
        updateWeather();
    }

    console.log("Exandriafvtt | Ready.");

});


// Generate new weather based on next day

function updateWeather() {
    Hooks.on('pseudoclockSet', async () => {
        let now = Gametime.DTNow();
        console.log(currentWeather);
        let prev = currentWeather.lastUpdate;
        if (prev == undefined || prev == null) {return;}

        if (now.days != prev.days) {
            currentWeather.genWeather();
            game.settings.set('exandriafvtt', 'current-weather', currentWeather);
            console.log("Exandriafvtt | Weather Updated");
        }
    });
}

