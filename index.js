// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------
import { Weather } from "./modules/weather.js";
// ------------------------------------------------------------------------
//                                 Constants 
// ------------------------------------------------------------------------
const debounceReload = debounce(() => window.location.reload(), 100);
var currentWeather;

// ------------------------------------------------------------------------
//                              Exandria Settings 
// ------------------------------------------------------------------------
class ExandriaSettings extends FormApplication{
    static get defaultOptions(){
        const options = super.defaultOptions;
        options.id = "rebuild-notes";
        options.template = "./templates/settings.html";
        return options;
    }
}

// ------------------------------------------------------------------------
//                              Inital Setup 
// ------------------------------------------------------------------------
Hooks.on('init', async () => {
    // Setup settings
    // Scene-packer Settings
    // Select current Region
    await game.settings.register('exandriafvtt', 'current-region', {
        name: 'Current Region',
        scope: 'world',
        config: true,
        type: String,
        choices: {
            // "region_mc": "Menagerie Coast",
            // "region_mv": "Marrow Valley",
            // "region_zf": "Zemni Fields",
            "region_gw": "Greying Wildlands",
            // "region_es": "Eiselcross",
            // "region_wx": "Wastes of Xhorhas",
            // "region_bs": "Blightshore",
        },
        onChange: debounceReload
    });

    await game.settings.register('exandriafvtt', 'current-season', {
        name: 'Current Season',
        scope: 'world',
        config: true,
        type: String,
        choices: {
            "spring": "Spring",
            "summer": "Summer",
            "fall": "Autumn",
            "winter": "Winter"
        },
        onChange: debounceReload
    });

    // Generate Weather
    await game.settings.register('exandriafvtt', 'weather-generation', {
        name: 'Generate Daily Weather',
        scope: 'world',
        config: true,
        type: Boolean,
        defaut: false
    });

    await game.settings.register('exandriafvtt', 'use-celsius', {
        name: 'Use Celsius',
        scope: 'world',
        config: true,
        type: Boolean
    });

    await game.settings.register('exandriafvtt', 'weather-events', {
        name: 'Enable Weather Events [NOT IMPLEMENTED]',
        scope: 'world',
        config: true,
        type: Boolean,
        onChange: debounceReload
    });

    await game.settings.register('exandriafvtt', 'current-weather', {
        name: 'Current Weather',
        scope: 'world',
        config: false,
        type: Object
    });

    console.log("ExandriaFvtt | Ready")
});


Hooks.once('ready', async () => {
    // Get Current Region
    try {
        const currentRegion = game.settings.get('exandriafvtt', 'current-region');
        const currentSeason = game.settings.get('exandriafvtt', 'current-season');
        
        // Get old weather or create new object
        currentWeather = new Weather(currentRegion, currentSeason);
        
        // Display Weather to both chat? and template
        currentWeather.sendToChat();

        console.log("Exandriafvtt | Ready.");


    } catch (error) {
        console.error(`ExandriaFvtt | Error in getting current location.${error}`);
        ui.notifications.error("ExandriaFvtt | There was an error in generating weather.");
    }
});


Hooks.on('pseudoclockSet', async () => {
    let now = Gametime.DTNow();
    console.log(currentWeather);
    let prev = currentWeather.lastUpdate;

    if (now.days != prev.days) {
        currentWeather.genWeather();
        game.settings.set('exandriafvtt', 'current-weather', currentWeather);
        console.log("Exandriafvtt | Weather Updated");
    }
});