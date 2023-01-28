const express = require("express");
const {
  getAllTransaction,
  AddTransaction,EditTransaction,DeleteTransaction
} = require("../controllers/transactionControllers");

const Router = express.Router();

//routes
//post data
Router.post("/get-transaction", getAllTransaction);
//get data
Router.post("/Add-transaction", AddTransaction);
//edit transaction
Router.post("/edit-transaction", EditTransaction);
//delete transaction 
Router.post("/delete-transaction",DeleteTransaction)


module.exports = Router;
