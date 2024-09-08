const admin = require('firebase-admin');
const serviceAccount = require("./DRA-firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dumpling-recipe-app-default-rtdb.firebaseio.com"
});

module.exports = admin;