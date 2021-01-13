// Module Base
class booru_manager {

    // Constructor
    constructor(data) {

        // ID
        if (typeof data.id === "string" && data.id.length > 0) {

            // Name
            if (typeof data.name === "string" && data.name.length > 0) {

                // Module Name
                if (typeof data.module_name === "string" && data.module_name.length > 0) {

                    // Modules
                    const validUrl = require('valid-url');
                    const objType = require('@tinypudding/puddy-lib/get/objType');

                    // URL
                    if (typeof data.url === "string" && data.url.length > 0 && validUrl.isUri(data.url)) {


                        // Insert Entire Database Info
                        if (objType(data.db, 'object') && objType(data.db.data, 'object') && typeof data.db.type === "string" && data.db.type.length) {

                            // Insert Database
                            const database_checker = {
                                isRef: (data.db.type === "ref"),
                                isBase: (data.db.type === "base")
                            };

                            let database_checker_verified = false;

                            // Check Database Verification
                            for (const item in database_checker) {
                                if (database_checker[item]) { database_checker_verified = true; break; }
                            }

                            if (database_checker_verified) {

                                // Insert ID
                                this.id = data.id;

                                // Insert ID
                                this.name = data.name;

                                // Insert URL
                                this.url = data.url;

                                // Insert URL
                                this.module_name = data.module_name;

                                // Custom Tag Path
                                if (typeof data.tagListVar === "string" && data.tagListVar.length > 0) {
                                    this.tagList = data.tagListVar;
                                } else {
                                    this.tagList = 'tags';
                                }

                                // Custom ID Path
                                if (typeof data.idVar === "string" && data.idVar.length > 0) {
                                    this.idVar = data.idVar;
                                } else {
                                    this.idVar = 'id';
                                }

                                // Insert Database

                                // Is Ref
                                if (database_checker.isRef) {
                                    this.db = data.db.data.ref(this.id);
                                    this.firstDBLine = 'child';
                                }

                                // Is Base
                                else if (database_checker.isBase) {
                                    this.db = data.db.data;
                                    this.firstDBLine = 'ref';
                                }

                                // DB Items
                                this.dbItems = {

                                    // Error
                                    error: this.db[this.firstDBLine]('error'),

                                    // Name
                                    name: this.db[this.firstDBLine]('name'),

                                    // ID
                                    id: this.db[this.firstDBLine]('id'),

                                    // Module Name
                                    module_name: this.db[this.firstDBLine]('module_name'),

                                    // Tag List
                                    tag: this.db[this.firstDBLine]('tag')

                                };

                                // Complete
                                return this;

                            }

                            // Nope
                            else {
                                throw new Error('Invalid Database Type!');
                            }

                        }

                        // Nope
                        else {
                            throw new Error('Invalid Database!');
                        }

                    }

                    // Nope
                    else {
                        throw new Error('Invalid URL!');
                    }

                }

                // Nope
                else {
                    throw new Error('Invalid Module Name!');
                }

            }

            // Nope
            else {
                throw new Error('Invalid Name!');
            }

        }

        // Nope
        else {
            throw new Error('Invalid ID!');
        }

    }

    // Get OLD Tag
    getOLDTag() {



    }

    // Get OLD Tags
    getOLDTags() {



    }

    // Get Error
    getError() {
        return new Promise(function (resolve, reject) {

            // Error Database
            this.db[this.firstDBLine]('error')

            // Get Firebase Database Data
            require('@tinypudding/puddy-lib/firebase/getDBData')().then(data => {
                resolve(data);
                return;
            }).catch(err => {
                reject(err);
                return;
            });

        });
    }

};

// Export
module.exports = booru_manager;;