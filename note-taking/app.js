
const { strikethrough } = require('chalk');
const chalk = require('chalk');
const { describe, string } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes.js');




//Customize yargs version

yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body content here',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'removing a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
        // console.log('removing the note');
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: 'reading notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
        // console.log('reading a note')
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'listing a note',
    builder: {
        title: {
            describe: 'listing all notes',
            demandOption: false,
            type: 'string'
        }
    },
    handler() {
        notes.listNotes();
        // console.log('listing out all notes');
    }
})



yargs.parse()

























