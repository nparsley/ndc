
const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');




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
    handler: function (argv) {
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'removing a note',
    handler: function () {
        console.log('removing the note')
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'reading a note',
    handler: function () {
        console.log('reading a note')
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'listing a note',
    handler: function () {
        console.log('listing out all notes')
    }
})

// add, remove, read, list


yargs.parse()

// console.log(yargs.argv);























