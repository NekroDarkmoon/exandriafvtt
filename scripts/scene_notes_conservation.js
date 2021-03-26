async function rebuildNotes() {
  // Bulk Fetch all scenes
  const scenes = game.data.scenes;
  console.log(scenes);

  // Bulk fetch all journals
  const journals = game.data.journal;
  console.log(journals);

  // If scene has flag then get uuid and search journals
  for (let sindex = 0; sindex < scenes.length; sindex++) {
    var updates = [];
    let uuids = scenes[sindex].flags.exandria?.uuids;
    if (uuids == undefined) {continue;}
    for (let key in uuids){
      if (uuids[key] == undefined) {continue;}
      console.log(`Finding match for ${uuids[key]}`);
      for (var jindex = 0; jindex < journals.length; jindex++) {
        let muuids = journals[jindex].flags.exandria?.uuids;
        if (muuids == undefined) {continue;}
        if (muuids.includes(uuids[key])) {
          console.log(`Match found ${journals[jindex].name}`);
          updates.push({
            _id: uuids[key],
            entryId: journals[jindex]._id 
          });
        }
      }
    }    
    console.log(updates);
    let scene = game.scenes.get(scenes[sindex]._id);
    await scene.updateEmbeddedEntity('Note', updates);
  }
}

class ExandriaSettings extends FormApplication{
    static get defaultOptions(){
    const options = super.defaultOptions;
    options.id = "rebuild-notes";
    options.template = "modules/exandria/templates/rebuild-notes.html";
    options.width = 500;
    return options;
  }

  get title() {
    return "Rebuild Notes";
  }

  /** @override */
  async _updateObject(event, formData) {
    // Do rebuild here
    console.log("Exandria | Rebuilding Notes");
    rebuildNotes();
    console.log("Exandria | Notes Rebuilt");
    return;
  }
}

// On note creation set a Flag to both the scene and the note.
Hooks.on('createNote', async function (scene, note) {

  // Generate uuid
  let uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Set scene flag
  try { 
    let data;
    data = {[note._id]: uuid};
    await scene.setFlag('exandria', 'uuids', data);
    console.log("Exandria | Created Scene flag.");

  } catch (error) {console.error(`Error in setting scene flag. ${error}`)}

  // Set journal flag
  try {
    let journal = game.journal.get(note.entryId);
    let links = journal.data.flags.exandria;
    if (links.uuids == undefined) {links = [uuid];}
    else {
      links = Array.from(links.uuids);
      links.push(uuid);
    }
    
    // Update 
    await journal.setFlag('exandria', 'uuids', links);
    console.log("Exandria | Created Journal flag.");
  } catch (error) {console.error(`Error in setting journal flag. ${error}`)}
});


// Delete flag from scene and journal.
Hooks.on('deleteNote',  async (scene, note) => {
  // Delete from scene
  let noteId = note._id;
  let uuids = scene.getFlag('exandria', 'uuids');
  let uuid = uuids[noteId];
  delete uuids[noteId];

  try {
    await scene.setFlag('exandria', 'uuids', uuids);
    console.log("Exandria | Deleted Scene flag.");
  } catch (error) {console.error(`Error in deleteing scene flag. ${error}`);}
  
  // Delete from journal
  try {
    let journal = game.journal.get(note.entryId);
    let links = journal.getFlag('exandria', 'uuids');
    if (links.includes(uuid)){
      links.splice(links.indexOf(uuid),1);
    } else {console.error(`Error in deleteing journal flag.`);}

    // Update
    await journal.setFlag('exandria', 'uuids', links);
    console.log("Exandria | Deleted Journal flag.");
  } catch (error) {console.error(`Error in deleteing note flag. ${error}`);}
});

// On start
Hooks.on('init', async () => {
  await game.settings.registerMenu('exandria', 'Menu', {
    name: 'menu',
    label: 'Rebuild Notes',
    icon: 'fas fa-atlas',
    scope: AudioWorkletNode,
    config: true,
    type: ExandriaSettings,
    restricted: true
  });

 console.log("Exandria | Ready");
});