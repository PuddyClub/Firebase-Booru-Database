// Get Modules
const booru_database = require('../index');
const admin = require('firebase-admin');

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

        data: db

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