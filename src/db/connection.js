const mongoose = require('mongoose');


// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/olympics", { useNewUrlParser: true });
        console.log("Connection to the database is successful...");
    } catch (error) {
        console.error("Error in connecting to the database: ", error);
    }
}

module.exports = connectToDatabase;
