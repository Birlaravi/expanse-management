const transactionModel = require("../models/transactionModel");
const moment = require("moment"); // require

const getAllTransaction = async (req, res) => {
  try {
    const { searchBytime, ByType, selectedTime } = req.body;
    const type = ByType;
    const transaction = await transactionModel.find({
      ...(searchBytime !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(searchBytime), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedTime[0],
              $lte: selectedTime[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "All" && { type }),
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.send(500).json(error);
  }
};
const AddTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("tranaction created");
  } catch (error) {
    res.send(500).json(error);
  }
};

const EditTransaction = async (req, res) => {
  try {
    const values = req.body.payload;
    const _id = req.body.transactionId;
     await transactionModel.findByIdAndUpdate(
      _id,
      values
    );
    res.status(200).send('transaction Edit Successfully')
  } catch (error) {
    res.send(500).json(error);
  }
};

const DeleteTransaction=async(req,res)=>{
  try {
    const {_id}=req.body;
    await transactionModel.findByIdAndDelete({_id});
    res.status(202).send('transaction Deleted successfully')
  } catch (error) {
    res.send(500).json(error);
  }
}
module.exports = { getAllTransaction, AddTransaction, EditTransaction,DeleteTransaction };
