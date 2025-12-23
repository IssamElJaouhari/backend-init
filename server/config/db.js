const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/")
        console.log("data base connected");
    } catch (err) {
        console.log("data base not connected", err);
    }
}

module.exports = dbConnect