// Module Base
class booru_manager {

    // Constructor
    constructor(data) {

        // ID
        if (typeof data.id === "string" && data.id.length > 0) {

            // ID
            if (typeof data.name === "string" && data.name.length > 0) {

                // Modules
                const validUrl = require('valid-url');
                const objType = require('@tinypudding/puddy-lib/get/objType');

                // URL
                if (typeof data.url === "string" && data.url.length > 0 && validUrl.isUri(data.url)) {


                    // Insert Entire Database Info
                    if (objType(data.db, 'object') && objType(data.db.data, 'object') && typeof data.db.type === "string" && data.db.type.length) {

                        // Insert Database
                        const database_checker = {
                            isRef: (data.db.type === "ref" && typeof data.db.value === "string" && data.db.value.length > 0),
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
                                this.db = data.db.data.ref(data.db.value);
                            }

                            // Is Base
                            else if (database_checker.isBase) {
                                this.db = data.db.data;
                            }

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
                throw new Error('Invalid Name!');
            }

        }

        // Nope
        else {
            throw new Error('Invalid ID!');
        }

    }

    // Get OLD Tag
    async getOLDTag() {



    }

    // Get OLD Tags
    async getOLDTags() {



    }

};

// Export
module.exports = booru_manager;;