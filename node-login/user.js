var mongo = require("mongodb");

// Mongo server
var server = mongo.Server("127.0.0.1", 27017);
var db = new mongo.Db("test", server, { safe: true });

// Open database
function init(callback) {
    db.open(function(err, db) {
        if (err) {
            callback(err);
            return;
        }
    
        db.collection("col_one", function(err, col) {
            callback(null, col);
        });
    });
}

/**
 * Register a new user 
 * @param {Object} collection
 * @param {Object} userObj
 * @param {Object} callback
 */
function register(collection, userObj, callback) {
    // Bitbucket or Github
    var type = userObj.type.toLowerCase();
    
    // Data to insert
    var data = {};

    data[type] = userObj; //userObj;
    
    // User email
    data.email = userObj.email;
    data.latest_login = userObj.latest_login;
    
    data.address = {
        "street": "",
        "zip": "",
        "location": ""
    };
    
    // Verify if the email already exists
    collection.findOne({ "email": data.email }, function(err, doc){
        if (err) {
            callback(err);
            return;
        }
        
        // The email already exists in db
        if (doc) {
            // Get id
            var id = doc._id;
            
            var obj = doc;
            obj.latest_login = currentDate();
            
            obj[type] = userObj;
            
            // Update
            collection.update({ "_id": id }, obj, function(err, doc) {
                if (err) {
                    callback(err);
                    return;
                }
                
                callback();
                return;
            });
            return;
        }
        
        // Insert the user information
        collection.insert(data, function(err) {
            if (err) {
                callback(err);
                return;
            }

            callback();
        });
    });    
}

/**
 * Create a new user, then the register 
 * function will be called
 * @param {Object} data
 */
function create(data) {
    var notSetted = "Not setted yet."

    var newUser = data;

    
    
    newUser.account_created = currentDate();
    newUser.latest_login = currentDate();

    return newUser;
}


/**
 * Update user info
 * @param {Object} collection
 * @param {Object} email
 * @param {Object} name
 * @param {Object} value
 * @param {Object} callback
 */
function update(collection, email, name, value, callback) {
    var key;
    
    key = "address." + name;
    
    //key = JSON.parse(key);
    
    var updt;
    switch(name) {
        case "street":
            updt = { $set: { "address.street": value } };
        break;
        case "zip":
            updt = { $set: { "address.zip": value } };
        break;
        case "location":
            updt = { $set: { "address.location": value } };
        break;
    }
    
    collection.update({ "email": email }, updt, function(err) {
        if (err) {
            callback(err);
            return;
        }
        
        callback();
    });
}

/**
 * Get user info from database
 * @param {Object} email
 * @param {Object} callback
 */
function get(collection, email, callback) {
    collection.findOne({ "email": email }, function(err, doc) {
        if (err) {
            callback(err);
            return;
        }
        
        callback(null, doc);
    });
}


/**
 * Revoke access
 * @param {Object} collection
 * @param {Object} type
 * @param {Object} email
 * @param {Object} callback
 */
function revokeAccessFor(collection, type, email, callback) {
	var obj = {};
	
	if (type === "github") {
		obj = { $unset: { github: 1} };
	}
	
	if (type === "bitbucket") {
		obj = { $unset: { bitbucket: 1} };
	}
	
	collection.update({ "email": email }, obj, function(err) {
		if (err) {
			callback("error");
			return;
		}
		
		callback();
	});
}

/**
 * Delete
 * @param {Object} collection
 * @param {Object} email
 * @param {Object} callback
 */
function deleteIt(collection, email, callback) {
    collection.remove({ "email": email }, function(err) {
        if (err) {
            callback(err);
            return;
        }
        
        callback();
    });
}

/**
 *  Current date
 */
function currentDate() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();
    
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();


    return d.getFullYear() + "." + (month <= 9 ? "0" : "") + month + "." + (day <= 9 ? "0" : "") + day + ", " +
           (hour <= 9 ? "0" : "") + hour + ":" + (min <= 9 ? "0" : "") + min +":" + (sec <= 9 ? "0" : "") + sec;
}

exports.init = init;
exports.register = register;
exports.create = create;
exports.get = get;
exports.update = update;
exports.revokeAccessFor = revokeAccessFor;
exports.delete = deleteIt;