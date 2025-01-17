const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log("DataBase Connected Successfully");
      });
  } catch (error) {
    console.log(error);
    console.log("DataBase Connection Failed");
  }
};

module.exports = connectDB;
