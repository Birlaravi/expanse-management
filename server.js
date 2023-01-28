const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDb = require("./config/dataBase");
const path = require("path");
// const cors = require("cors");

//config dot env file
dotenv.config();

//rest object
const app = express();

//database call
connectDb();
// app.use(cors);

//middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes
// app.get("/", (req, res) => {
//   res.send("<h1>hello From server</h1>");
// });

//add static file
app.use(express.static(path.join(__dirname,"./client/build")))
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

//users route
app.use('/api/v1/users', require('./routes/userRouter'));

//transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

//Port
const PORT = 8080 || process.env.PORT;

//listening
app.listen(PORT, () => {
  console.log(`server is running at Port ${PORT}`);
});
