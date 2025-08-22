const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://avdeshsingh415:DVYoWv56uMd8gmXs@namastenode.a4yf0ka.mongodb.net/devTinder",
    );
};


module.exports = connectDB;


