const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://creselle:creselle25@cluster.3ypb3.mongodb.net/'; // Replace with your actual database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo successfully");
  } catch (error) {
    console.error("Failed to connect to Mongo", error);
  }
};

module.exports = connectToMongo;    