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

                        // Unknown Tag
                        this.unknownTag = 'UNKNOWNTAG';

                        // Exist DB
                        this.existDB = false;

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

                        // Prepare Limit Items
                        this.byteLimit = {

                            // JSON
                            json: {

                                // Tag
                                tag: 1048576,

                                // Error
                                error: 1048576

                            }

                        };

                        // Limits
                        if (objType(data.byteLimit, 'object')) {

                            // Check Limit
                            const checkNumberLimit = function (where, theValue) {
                                return (typeof data.byteLimit[where][theValue] === "number" && !isNaN(data.byteLimit[where][theValue]) && data.byteLimit[where][theValue] > 0);
                            };

                            // Json
                            if (objType(data.byteLimit.json, 'object')) {

                                // Tag
                                if (checkNumberLimit('json', 'tag')) {
                                    this.byteLimit.json.tag = data.byteLimit.json.tag;
                                }

                                // Error
                                if (checkNumberLimit('json', 'error')) {
                                    this.byteLimit.json.error = data.byteLimit.json.error;
                                }

                            }

                        }

                        // Get Values

                        // Exist DB
                        this.checkExistDB = function () { return this.existDB; }

                        // Name
                        this.getName = function () { return this.name; }

                        // ID
                        this.getId = function () { return this.id; }

                        // URL
                        this.getUrl = function () { return this.url; }

                        // Module Name
                        this.getModuleName = function () { return this.module_name; }

                        // Tag List Var
                        this.getTagListVar = function () { return this.tagList; }

                        // ID Var
                        this.getIdVar = function () { return this.idVar; }

                        // Get Byte Limit Items
                        this.getbyteLimitItems = function () { return this.byteLimit; };

                        // Get Byte Limit Item
                        this.getbyteLimitItem = function (item, item2) {
                            if (typeof item === "string" && item.length > 0 && this.byteLimit[item]) {

                                if (typeof item2 === "string" && item2.length > 0 && this.byteLimit[item][item2]) {
                                    return this.byteLimit[item][item2];
                                } else {
                                    return this.byteLimit[item];
                                }

                            } else {
                                return null;
                            }
                        };

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

                                    // URL
                                    url: this.db[this.firstDBLine]('url'),

                                    // ID
                                    id: this.db[this.firstDBLine]('id'),

                                    // Module Name
                                    module_name: this.db[this.firstDBLine]('module_name'),

                                    // Tag List
                                    tagData: this.db[this.firstDBLine]('tag').child('data'),

                                    // Total Tags
                                    tagTotal: this.db[this.firstDBLine]('tag').child('total'),

                                    // Total Items
                                    itemData: this.db[this.firstDBLine]('item').child('data'),

                                    // Total Items
                                    itemTotal: this.db[this.firstDBLine]('item').child('total')

                                };

                                // Exist DB Checked
                                this.existDB = true;

                                // DB
                                this.getDB = function () { return this.db; };

                                // First DB Line
                                this.getFirstDBLine = function () { return this.firstDBLine; };

                                // Get DB Items
                                this.getDBItems = function () { return this.dbItems; };

                                // Get DB Item
                                this.getDBItem = function (item) {
                                    if (typeof item === "string" && item.length > 0 && this.dbItems[item]) {
                                        return this.dbItems[item];
                                    } else {
                                        return null;
                                    }
                                };

                                // Get Template
                                this.getItemTemplate = function (tag_name, database_name) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Get Firebase Database Data
                                        if (typeof tag_name === "string" && tag_name.length > 0) {
                                            require('@tinypudding/puddy-lib/firebase/getDBData')(tinythis.dbItems[database_name].child(tag_name)).then(data => {
                                                resolve(data);
                                                return;
                                            }).catch(err => {
                                                reject(err);
                                                return;
                                            });
                                        }

                                        // Ops
                                        else {
                                            reject(new Error('Invalid Tag Name!'));
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                this.getItemsTemplate = function (itemsList = null, database_name) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Modules
                                        const getDBData = require('@tinypudding/puddy-lib/firebase/getDBData');

                                        // Get Firebase Database Data

                                        // Normal
                                        if (!itemsList) {
                                            getDBData(tinythis.dbItems[database_name]).then(data => {
                                                resolve(data);
                                                return;
                                            }).catch(err => {
                                                reject(err);
                                                return;
                                            });
                                        }

                                        // Per Item
                                        else if (Array.isArray(itemsList)) {

                                            // Item List
                                            const itemList = {};

                                            // For Promise
                                            require('for-promise')({ data: itemsList }, function (item, fn, fn_error) {

                                                // Is String
                                                if (typeof itemsList[item] === "string" && itemsList[item].length > 0) {

                                                    // Get Data
                                                    getDBData(tinythis.dbItems[database_name].child(itemsList[item])).then(data => {

                                                        // Insert Data
                                                        itemList[itemsList[item]] = data;

                                                        // Complete
                                                        fn();
                                                        return;

                                                    })

                                                        // Fail
                                                        .catch(err => {
                                                            fn_error(err);
                                                            return;
                                                        });

                                                }

                                                // Nope
                                                else { fn(); }

                                            })

                                                // Result
                                                .then(() => {
                                                    resolve(itemList);
                                                    return;
                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });

                                        }

                                        // Invalid
                                        else {
                                            reject(new Error('Invalid Item List!'));
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Get Tag
                                this.getTag = function (tag_name) {
                                    return this.getItemTemplate(tag_name, 'tagData');
                                };

                                // Get Tags
                                this.getTags = function (itemsList) {
                                    return this.getItemsTemplate(itemsList, 'tagData');
                                };

                                // Get Tag
                                this.getItem = function (tag_name) {
                                    return this.getItemTemplate(tag_name, 'itemData');
                                };

                                // Get Tags
                                this.getItems = function (itemsList) {
                                    return this.getItemsTemplate(itemsList, 'itemData');
                                };

                                // Get Error
                                this.getError = function (error_name) {
                                    return this.getItemTemplate(error_name, 'error');
                                };

                                // Get Errors
                                this.getErrors = function (itemsList) {
                                    return this.getItemsTemplate(itemsList, 'error');
                                };

                                // Add Items

                                // Tag Function Template
                                this.tagItemChecker = function (tagName, itemID, itemData = null, allowPath = false, allowItemNull = false) {

                                    // Tiny Result
                                    const result = { usePath: false };

                                    // Get Allow Path
                                    if (typeof allowPath === "boolean") { result.usePath = allowPath; }

                                    // Obj Type
                                    const objType = require('@tinypudding/puddy-lib/get/objType');

                                    // Tag Name
                                    if (typeof tagName === "string" && tagName.length > 0) {

                                        // Tag ID
                                        if ((typeof itemID === "string" && itemID.length > 0) || (typeof itemID === "number" && !isNaN(itemID))) {

                                            // Object Validator
                                            if (allowItemNull || objType(itemData, 'object')) {

                                                // Validate Size
                                                if (allowItemNull || require('json-sizeof')(itemData) <= this.byteLimit.json.tag) {

                                                    // Allowed Item
                                                    result.allowed = true;

                                                    // Firebase Escape
                                                    const databaseEscape = require('@tinypudding/puddy-lib/firebase/databaseEscape');
                                                    result.escaped = {};

                                                    // Escaped Values
                                                    result.escaped.tagName = databaseEscape(tagName, allowPath);
                                                    result.escaped.itemID = databaseEscape(itemID, allowPath);

                                                }

                                                // Nope
                                                else {
                                                    result.err = new Error('The tag item size is very big!');
                                                    result.allowed = false;
                                                }

                                            }

                                            // Nope
                                            else {
                                                result.err = new Error('Invalid data for add the tag item!');
                                                result.allowed = false;
                                            }

                                        }

                                        // Nope
                                        else {
                                            result.err = new Error('Invalid Tag ID!');
                                            result.allowed = false;
                                        }

                                    }

                                    // Nope
                                    else {
                                        result.err = new Error('Invalid Tag Name!');
                                        result.allowed = false;
                                    }

                                    // Send Result
                                    return result;

                                };

                                // Tags

                                // Add Item
                                this.addItem = function (data, escapeResult = null, tagItem = null) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Fix Database Tag Item
                                        if (!escapeResult) { escapeResult = tinythis.tagItemChecker(data.tag, data.itemID, data.data, data.allowPath).escaped; }
                                        if (!tagItem) { tagItem = tinythis.dbItems.tagData.child(escapeResult.tagName).child(escapeResult.itemID); }

                                        // Prepare Item Data
                                        const itemData = tinythis.dbItems.itemData.child(escapeResult.itemID);

                                        // Set Data
                                        itemData.set(data.data)

                                            // Success
                                            .then(() => {

                                                // Send Result
                                                resolve({
                                                    data: data.data,
                                                    db: {
                                                        tag: tagItem,
                                                        item: itemData
                                                    },
                                                    values: {
                                                        normal: {
                                                            tag: data.tag,
                                                            itemID: data.itemID
                                                        },
                                                        escape: {
                                                            tag: escapeResult.tagName,
                                                            itemID: escapeResult.itemID
                                                        }
                                                    }
                                                });

                                                // Complete
                                                return;

                                            })

                                            // Error
                                            .catch(err => {
                                                reject(err);
                                                return;
                                            });

                                        // Complete
                                        return;

                                    });
                                };

                                // Add
                                this.addTagItem = function (data, notAddData = false) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Check
                                        const resultCheck = tinythis.tagItemChecker(data.tag, data.itemID, data.data, data.allowPath);

                                        // Allowed
                                        if (resultCheck.allowed) {

                                            // Get Tag
                                            const tagItem = tinythis.dbItems.tagData.child(resultCheck.escaped.tagName).child(resultCheck.escaped.itemID);

                                            // Add data
                                            if (!notAddData) {

                                                // Set Data
                                                tagItem.set(data.itemID)

                                                    // Success
                                                    .then(() => {

                                                        // Add Tag
                                                        tinythis.addItem(data, resultCheck.escaped, tagItem).then(data => {
                                                            resolve(data);
                                                            return;
                                                        }).catch(err => {
                                                            reject(err);
                                                            return;
                                                        });

                                                        // Complete
                                                        return;

                                                    })

                                                    // Error
                                                    .catch(err => {
                                                        reject(err);
                                                        return;
                                                    });

                                            }

                                            // Nope
                                            else {
                                                tinythis.addItem(data, resultCheck.escaped, tagItem).then(data => {
                                                    resolve(data);
                                                    return;
                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });
                                            }

                                        }

                                        // Nope
                                        else {
                                            reject(resultCheck.err);
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Add Multiple Tags
                                this.addTagItems = function (items, notAddData = false) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Item List
                                        const itemList = {};

                                        // Array Validator
                                        if (Array.isArray(items)) {

                                            // For Promise
                                            require('for-promise')({ data: items }, function (item, fn, fn_error) {

                                                // Add Tag
                                                tinythis.addTagItem(items[item], notAddData).then((result) => {
                                                    itemList[items[item].tag] = result;
                                                    fn();
                                                    return;
                                                }).catch(err => {
                                                    fn_error(err);
                                                    return;
                                                });

                                                // Complete
                                                return;

                                            })

                                                // Result
                                                .then(() => {
                                                    resolve(itemList);
                                                    return;
                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });

                                        }

                                        // Nope
                                        else {
                                            reject(new Error('The Tag List data is not a array!'));
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Remove
                                this.removeTagItem = function (data, notRemoveData = false) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Check
                                        const resultCheck = tinythis.tagItemChecker(data.tag, data.itemID, null, data.allowPath, true);

                                        // Allowed
                                        if (resultCheck.allowed) {

                                            // Get Tag
                                            const tagItem = tinythis.dbItems.tagData.child(resultCheck.escaped.tagName).child(resultCheck.escaped.itemID);
                                            const itemData = tinythis.dbItems.itemData.child(resultCheck.escaped.itemID);

                                            // Remove Tag Result
                                            const removeTagResult = function () {

                                                // Set Data
                                                tagItem.remove()

                                                    // Success
                                                    .then(() => {

                                                        // Send Result
                                                        resolve({
                                                            db: {
                                                                tag: tagItem,
                                                                item: itemData
                                                            },
                                                            values: {
                                                                normal: {
                                                                    tag: data.tag,
                                                                    itemID: data.itemID
                                                                },
                                                                escape: {
                                                                    tag: resultCheck.escaped.tagName,
                                                                    itemID: resultCheck.escaped.itemID
                                                                }
                                                            }
                                                        });

                                                        // Complete
                                                        return;

                                                    })

                                                    // Error
                                                    .catch(err => {
                                                        reject(err);
                                                        return;
                                                    });

                                                // Complete
                                                return;

                                            };

                                            // Remove data
                                            if (!notRemoveData) {

                                                // Set Data
                                                itemData.remove()

                                                    // Success
                                                    .then(() => {

                                                        // Remove
                                                        removeTagResult();

                                                        // Complete
                                                        return;

                                                    })

                                                    // Error
                                                    .catch(err => {
                                                        reject(err);
                                                        return;
                                                    });

                                            }

                                            // Nope
                                            else { removeTagResult(); }

                                        }

                                        // Nope
                                        else {
                                            reject(resultCheck.err);
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Remove Multiple Tags
                                this.removeTagItems = function (items, notRemoveData = false) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Item List
                                        const itemList = {};

                                        // Array Validator
                                        if (Array.isArray(items)) {

                                            // For Promise
                                            require('for-promise')({ data: items }, function (item, fn, fn_error) {

                                                // Remove Tag
                                                tinythis.removeTagItem(items[item], notRemoveData).then((result) => {
                                                    itemList[items[item].tag] = result;
                                                    fn();
                                                    return;
                                                }).catch(err => {
                                                    fn_error(err);
                                                    return;
                                                });

                                                // Complete
                                                return;

                                            })

                                                // Result
                                                .then(() => {
                                                    resolve(itemList);
                                                    return;
                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });

                                        }

                                        // Nope
                                        else {
                                            reject(new Error('The Tag List data is not a array!'));
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Send Error
                                this.error = function (data) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Prepare Data
                                        const insertData = {};

                                        // Timeout
                                        if (typeof data.timeout === "number" && !isNaN(data.timeout) && data.timeout > 0) {

                                            // Insert Timeout
                                            insertData.timeout = data.timeout;

                                            // Message
                                            if (typeof data.message === "string" && data.message.length > 0) {

                                                // Message Size
                                                if (require('json-sizeof')(insertData) <= tinythis.byteLimit.json.error) {

                                                    // Insert Message
                                                    insertData.message = data.message;

                                                    // Insert Data
                                                    tinythis.dbItems.error.set(insertData).then(() => {
                                                        resolve();
                                                        return;
                                                    }).catch(err => {
                                                        reject(err);
                                                        return;
                                                    });

                                                }

                                                // Nope
                                                else {
                                                    reject(new Error('The error item size is very big!'));
                                                }

                                            }

                                            // Nope
                                            else {
                                                reject(new Error('Invalid Error Message.'));
                                            }

                                        }

                                        // Nope
                                        else {
                                            reject(new Error('Invalid Error Timeout.'));
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Check Error
                                this.checkError = function () {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Get Errors
                                        tinythis.getErrors().then(errors => {

                                            // Result
                                            const result = { error: false };

                                            // Check Timeout
                                            if (errors && typeof errors.timeout === "number" && errors.timeout > 0) {
                                                result.error = true;
                                                result.data = errors;
                                            }

                                            // Send Result
                                            resolve(result);

                                            // Complete
                                            return;

                                        }).catch(err => {
                                            reject(err);
                                            return;
                                        });

                                        // Complete
                                        return;

                                    });
                                };

                                // Remove Error
                                this.setErrorTimeout = function (newTimeout) {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Valid Number
                                        if (typeof newTimeout === "number" && !isNaN(newTimeout)) {

                                            // Update
                                            if (newTimeout > 0) {
                                                tinythis.dbItems.error.update({ timeout: newTimeout }).then(() => {
                                                    resolve();
                                                    return;
                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });
                                            }

                                            // Delete
                                            else {
                                                tinythis.clearError().then(() => {
                                                    resolve();
                                                    return;
                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });
                                            }

                                        }

                                        // Complete
                                        return;

                                    });
                                };

                                // Remove Error
                                this.clearError = function () {
                                    const tinythis = this;
                                    return new Promise(function (resolve, reject) {

                                        // Insert Data
                                        tinythis.dbItems.error.remove().then(() => {
                                            resolve();
                                            return;
                                        }).catch(err => {
                                            reject(err);
                                            return;
                                        });

                                        // Complete
                                        return;

                                    });
                                };

                                // Update Database
                                this.updateDatabase = function (data, allowPath = false, notAddData = false) {
                                    const tinythis = this;
                                    return new Promise(async function (resolve, reject) {

                                        // Update Database Info
                                        try {
                                            await tinythis.dbItems.url.set(tinythis.url);
                                            await tinythis.dbItems.name.set(tinythis.name);
                                            await tinythis.dbItems.id.set(tinythis.id);
                                            await tinythis.dbItems.module_name.set(tinythis.module_name);
                                        } catch (err) {
                                            reject(err);
                                        }

                                        // Is Array
                                        if (Array.isArray(data)) {

                                            // Get OLD Data
                                            tinythis.getItems().then(oldItems => {

                                                // Get OLD Tags
                                                tinythis.getTags().then(oldTags => {

                                                    // Obj Type
                                                    const objType = require('@tinypudding/puddy-lib/get/objType');

                                                    // Exist OLD
                                                    const existOLD = (objType(oldItems, 'object') || Array.isArray(oldItems));

                                                    // Item List
                                                    const itemList = { added: {}, removed: {}, old: {} };

                                                    // For Promise
                                                    const forPromise = require('for-promise');

                                                    // For Promise
                                                    forPromise({ data: data }, function (item, fn, fn_error, extra) {

                                                        // Item ID
                                                        const itemID = data[item][tinythis.idVar];

                                                        // Check Exist Options
                                                        if (Array.isArray(data[item][tinythis.tagList])) {

                                                            // Tag Insert Result
                                                            const tagInsertResult = (fn, tagName = null) => {

                                                                // Firebase Escape
                                                                const databaseEscape = require('@tinypudding/puddy-lib/firebase/databaseEscape');
                                                                const escaped_values = {
                                                                    itemID: databaseEscape(itemID, allowPath)
                                                                };

                                                                // Check Exist Tag Name
                                                                if (typeof tagName === "string") {
                                                                    escaped_values.tagName = databaseEscape(tagName, allowPath);
                                                                }

                                                                // Nope
                                                                else {
                                                                    escaped_values.tagName = tinythis.unknownTag;
                                                                }

                                                                // Is New
                                                                if (!oldItems || !oldItems[escaped_values.itemID]) {

                                                                    // Create Tag
                                                                    if (!itemList.added[escaped_values.tagName]) { itemList.added[escaped_values.tagName] = {}; }

                                                                    // Insert Item in the Tag
                                                                    itemList.added[escaped_values.tagName][escaped_values.itemID] = data[item];

                                                                }

                                                                // Is OLD
                                                                else {

                                                                    // Create Tag
                                                                    if (!itemList.old[escaped_values.tagName]) { itemList.old[escaped_values.tagName] = {}; }

                                                                    // Insert Item in the Tag
                                                                    itemList.old[escaped_values.tagName][escaped_values.itemID] = data[item];

                                                                }

                                                                // Complete
                                                                fn();
                                                                return;

                                                            };

                                                            // Check Array Amount
                                                            if (data[item][tinythis.tagList].length > 0) {

                                                                // Read Tags
                                                                const readTags = extra({ data: data[item][tinythis.tagList] });
                                                                readTags.run(function (tagIndex, fn, fn_error) {

                                                                    // Tag Name
                                                                    const tagName = data[item][tinythis.tagList][tagIndex];

                                                                    // Check Tag Name
                                                                    if (typeof tagName === "string" && tagName.length > 0) {

                                                                        // Add Tag
                                                                        tinythis.addTagItem({
                                                                            tag: tagName,
                                                                            itemID: itemID,
                                                                            data: data[item],
                                                                            allowPath: allowPath
                                                                        }, notAddData)

                                                                            // Result
                                                                            .then(() => { tagInsertResult(fn, tagName); return; })

                                                                            // Error
                                                                            .catch(err => {
                                                                                fn_error(err);
                                                                                return;
                                                                            });

                                                                    }

                                                                    // Nope
                                                                    else { fn(); }

                                                                    // Complete
                                                                    return;

                                                                });

                                                            }

                                                            // Nope
                                                            else {

                                                                // Add Tag
                                                                tinythis.addItem({
                                                                    tag: tinythis.unknownTag,
                                                                    itemID: itemID,
                                                                    data: data[item],
                                                                    allowPath: allowPath
                                                                })

                                                                    // Result
                                                                    .then(() => { tagInsertResult(fn); return; })

                                                                    // Error
                                                                    .catch(err => {
                                                                        fn_error(err);
                                                                        return;
                                                                    });

                                                            }

                                                        }

                                                        // Complete
                                                        fn();
                                                        return;

                                                    })

                                                        // Result
                                                        .then(() => {

                                                            // Exist OLD Checker
                                                            if (existOLD) {

                                                                // Prepare Pack
                                                                const pack_items = {};
                                                                const insert_old_pack = function (obj) {
                                                                    for (const item in obj) {
                                                                        pack_items[item] = obj[item];
                                                                    }
                                                                };

                                                                insert_old_pack(itemList.old);
                                                                insert_old_pack(itemList.added);

                                                                // Firebase Escape
                                                                const databaseEscape = require('@tinypudding/puddy-lib/firebase/databaseEscape');

                                                                // For Promise
                                                                forPromise({ data: oldItems }, function (item, fn, fn_error, extra) {

                                                                    // Action Remove Item
                                                                    const removeTagsItem = function (fn, fn_error, tag) {

                                                                        // Remover
                                                                        tinythis.dbItems.itemData.child(item).remove().then(() => {

                                                                            // Tag Name Add List
                                                                            if (typeof tag === "string" && tag.length > 0) {

                                                                                // Create Item
                                                                                if (!itemList.removed[tag]) { itemList.removed[tag] = {}; }
                                                                                itemList.removed[tag][item] = oldItems[item];

                                                                            }

                                                                            // Complete
                                                                            fn();
                                                                            return;

                                                                        }).catch(err => {
                                                                            fn_error(err);
                                                                            return;
                                                                        });

                                                                        // Complete
                                                                        return;

                                                                    };

                                                                    // Action Remove Tag
                                                                    const removeTag = function (fn, fn_error, tagName) {

                                                                        tinythis.dbItems.tagData.child(tagName).child(item).remove().then(() => {
                                                                            fn();
                                                                            return;
                                                                        }).catch(err => {
                                                                            fn_error(err);
                                                                            return;
                                                                        });

                                                                        // Complete
                                                                        return;

                                                                    };

                                                                    // Check OLD Data
                                                                    if (objType(oldItems[item], 'object') && Array.isArray(oldItems[item][tinythis.tagList])) {

                                                                        // Add the Extra and Run the Extra
                                                                        const prepareRemovetags = extra({ data: oldItems[item][tinythis.tagList] });
                                                                        prepareRemovetags.run(function (tag, fn, fn_error) {

                                                                            // Get Tag Name
                                                                            let tagName = oldItems[item][tinythis.tagList][tag];
                                                                            if (typeof tagName === "string" && tagName.length > 0) { tagName = databaseEscape(tagName, notAddData); } else { tagName = null; }

                                                                            // Exist Tag
                                                                            if (typeof tagName === "string") {

                                                                                // Prepare Remove Tag
                                                                                const prepare_removeTag = function () {

                                                                                    // Remover Tag
                                                                                    removeTag(fn, fn_error, tagName);

                                                                                    // Complete
                                                                                    return;

                                                                                };

                                                                                // Exist OLD Tag
                                                                                if (
                                                                                    (objType(oldTags[tagName], 'object') && Object.keys(oldTags[tagName]).length > 0) ||
                                                                                    (Array.isArray(oldTags[tagName]) && oldTags[tagName].length > 0)
                                                                                ) {

                                                                                    // Don't Exist Added Items
                                                                                    if (
                                                                                        (!objType(pack_items[tagName], 'object') && !Array.isArray(pack_items[tagName])) ||
                                                                                        (!objType(pack_items[tagName][item], 'object') && !Array.isArray(pack_items[tagName][item]))
                                                                                    ) {

                                                                                        // Exist Other Tags
                                                                                        let existOtherTags = false;
                                                                                        for (const tinyTag in pack_items) {
                                                                                            if (objType(pack_items[tinyTag][item], 'object') || Array.isArray(pack_items[tinyTag][item])) {
                                                                                                existOtherTags = true;
                                                                                                break;
                                                                                            }
                                                                                        }

                                                                                        // Don't Exist Other Tags
                                                                                        if (!existOtherTags) { removeTagsItem(prepare_removeTag, fn_error, tagName); }

                                                                                        // Exist
                                                                                        else { prepare_removeTag(); }
                                                                                    }
                                                                                    else { fn(); }

                                                                                } else { removeTagsItem(prepare_removeTag, fn_error, tagName); }

                                                                            } else { removeTagsItem(fn, fn_error); }

                                                                            // Complete
                                                                            return;

                                                                        });

                                                                        // Complete
                                                                        fn();

                                                                    }

                                                                    // Nope
                                                                    else { removeTagsItem(fn, fn_error); }

                                                                    // Complete
                                                                    return;

                                                                })

                                                                    // Finished
                                                                    .then(() => {
                                                                        resolve(itemList);
                                                                        return;
                                                                    }).catch(err => {
                                                                        reject(err);
                                                                        return;
                                                                    });

                                                            }

                                                            // Nope
                                                            else { resolve(itemList); }

                                                            // Complete
                                                            return;

                                                        }).catch(err => {
                                                            reject(err);
                                                            return;
                                                        });

                                                    // Complete
                                                    return;

                                                }).catch(err => {
                                                    reject(err);
                                                    return;
                                                });

                                                // Complete
                                                return;

                                            }).catch(err => {
                                                reject(err);
                                                return;
                                            });

                                        }

                                        // Nope
                                        else {
                                            reject(new Error('Invalid Array Value! Please! Insert a array value to be checked!'));
                                        }

                                        // Complete
                                        return;

                                    });
                                };

                            }

                        }

                        // Complete
                        return this;

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

};

// Export
module.exports = booru_manager;