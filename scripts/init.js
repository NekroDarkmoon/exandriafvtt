// ------------------------------------------------------------------------
//                              Imports 
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                                 Constants 
// ------------------------------------------------------------------------
const debounceReload = debounce(() => window.location.reload(), 100);

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
    // Scene Packer Settings
    // Select current Region
    await game.settings.register('exandriafvtt', 'current-region', {
        name: 'Current Region',
        scope: 'world',
        config: true,
        type: String,
        choices: {
            "region_mc": "Menagerie Coast",
            "region_mv": "Marrow Valley",
            "region_zf": "Zemni Fields",
            "region_gw": "Greying Wildlands",
            "region_es": "Eiselcross",
            "region_wx": "Wastes of Xhorhas",
            "region_bs": "Blightshore",
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


    console.log("Exandria | Ready")
});


Hooks.on('ready', async () => {
    // Check Dependencies
});