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

    // Database
    db: {

        // Type
        type: 'ref',

        // Database
        data: firebase.db()

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

// Keep Test Online
setInterval(function () {}, 1000);