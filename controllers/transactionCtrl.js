const transactionModel = require('../models/transactionModel')
const moment = require('moment')

const getAllTransaction = async (req, res) => {
    try {
        const {frequency, selectedDate,  type} = req.body
        const transaction = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                $gt: moment().subtract(Number(frequency), "d").toDate(),
                }
            } : {
                date:{
                    $gte: moment(selectedDate[0]).startOf('day').toDate(),
                    $lte: moment(selectedDate[1]).endOf('day').toDate(),
                },
            }),
            userId:req.body.userId,

            ...(type !== 'all' && {type})
        });
        res.status(200).json(transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({_id: req.body.transactionId})
        res.status(200).send("Transaction delected");
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const editTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},
            req.body.payload
        );
        res.send(200).send("Edit Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save()
        res.status(201).send('Transaction created')
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};



module.exports = {getAllTransaction, addTransaction, editTransaction, deleteTransaction};