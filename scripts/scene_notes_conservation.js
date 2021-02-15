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

// On scene import retrieve flag from scene and match with flags from notes.

// On match change note id to new entry id.

// Add support for rebuilding scene links to notes



// On start
Hooks.on('init', () => {
  console.log("Exandria | Ready");
});