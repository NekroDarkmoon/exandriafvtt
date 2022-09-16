// ------------------------------------------------------------------------
//                              Imports
// ------------------------------------------------------------------------
import { moduleName, moduleTag } from './modules/constants.js';
import { RegisterSettings } from './modules/settings.js';

// ------------------------------------------------------------------------
//                                 Constants
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
//                              Inital Setup
// ------------------------------------------------------------------------
Hooks.on('init', async () => {
	// Register settings
	await RegisterSettings();

	console.log(`${moduleTag} | Initializing.`);
});

Hooks.once('ready', async () => {
	console.log(`${moduleTag} | Ready.`);
});
