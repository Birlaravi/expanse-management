const mongoose = require("mongoose");
const colors = require("colors");
mongoose.set("strictQuery", true);
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`server is Running  On ${mongoose.connection.host}`.bgCyan.red);
  } catch (error) {
    console.log(`${error}`.bgRed.yellow);
  }
};
module.exports = connectDb;
