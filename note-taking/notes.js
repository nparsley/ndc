const chalk = require('chalk');
const fs = require('fs');


const addNote = (title, body) => {
    const notes = loadNotes();
/*     const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    }) */
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);

    // if(duplicateNotes.length === 0) {
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log((chalk.green.inverse)('new note added'));
    } else {
        console.log((chalk.red.inverse)('duplicate found'));
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
/*     const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    }) */
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notesToKeep.length === notes.length) {
        console.log((chalk.green.inverse)('nothing has been removed'));
    } else {
        console.log((chalk.red.inverse)(`${title} was removed`));
    }

    saveNotes(notesToKeep);
    
}



const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

const listNotes = () => {
    console.log((chalk.blue)('your notes...'));
/*     const notes = [loadNotes()];
    for (let i = 0; i < notes.length; i++)
    console.log(notes); */

    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title);
    })
}

const readNotes = (title) => {
    const notes = loadNotes();
    const readingNote = notes.find((note) => note.title === title);
    if(readingNote) {
        console.log((chalk.green.inverse)(readingNote.title));
        console.log(chalk.green(readingNote.body));
    } else {
        console.log(chalk.red.inverse('no note found'));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}

