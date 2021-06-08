// ------------------------------------------------------------------------
//                                  Imports
// ------------------------------------------------------------------------
import {moduleName, moduleTag} from "./utils/constants.js";


// ------------------------------------------------------------------------
//                              Exandria Settings 
// ------------------------------------------------------------------------
export const RegisterSettings = async function() {
    // Scene-packer Settings
    // Select current Region
    await game.settings.register(moduleName, 'current-region', {
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

    await game.settings.register(moduleName, 'current-season', {
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
    await game.settings.register(moduleName, 'generate-weather', {
        name: 'Generate Daily Weather',
        scope: 'world',
        config: true,
        type: Boolean,
        defaut: false
    });

    await game.settings.register(moduleName, 'use-celsius', {
        name: 'Use Celsius',
        scope: 'world',
        config: true,
        type: Boolean
    });

    await game.settings.register(moduleName, 'weather-events', {
        name: 'Enable Weather Events [NOT IMPLEMENTED]',
        scope: 'world',
        config: true,
        type: Boolean,
        onChange: debounceReload
    });

    await game.settings.register(moduleName, 'current-weather', {
        name: 'Current Weather',
        scope: 'world',
        config: false,
        type: Object
    });
}



// ------------------------------------------------------------------------
//                              Settings Helpers
// ------------------------------------------------------------------------
const debounceReload = debounce(() => window.location.reload(), 100);



class ExandriaSettings extends FormApplication{
    static get defaultOptions(){
        const options = super.defaultOptions;
        options.id = "rebuild-notes";
        options.template = "./templates/settings.html";
        return options;
    }
}
