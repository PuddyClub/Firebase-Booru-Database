// Get Modules
const booru_database = require('../index');
const admin = require('firebase-admin');
const path = require('path');

// Config
const tinyCfg = require('./config.json');
tinyCfg.credential = admin.credential.cert(path.join(__dirname, './firebase.json'));

// Start Firebase
const firebase = admin.initializeApp(tinyCfg);

// Create Booru
const test_booru = new booru_database({

    // ID
    id: 'test_booru',

    // Name
    name: 'Test Booru',

    // URL
    url: 'https://puddy.club',

    // Module
    module_name: 'test',

    // Tags Var
    tagListVar: 'tags',

    // Tags Var
    idVar: 'id',

    // Database
    db: {

        // Type
        type: 'ref',

        // Database
        data: firebase.database()

    },

    // Byte Limit
    byteLimit: {

        // JSON
        json: {

            // Tag
            tag: 1048576,

            // Error
            error: 1048576

        }

    }

});

// Start Test
test_booru.updateDatabase([
    { id: 'tiny_test_1', tags: ['test1', 'test2', 'test3'], custom: 1 },
    { id: 'tiny_test_2', tags: ['test1', 'test2', 'test3'], custom: 2 }
]).then(result => {

    // Show Result
    console.log('Complete');
    console.log(result);
    return;

}).catch(err => {

    // Show Error
    console.error(err);
    return;

});

// Keep Test Online
setInterval(function () { }, 1000);