const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required:[true, 'amount is required']
    },
    type:{
        type: String,
        require:[true, 'type is required']
    },
    category:{
        type:String,
        required:[true, 'category is required']
    },
    refernce:{
        type:String,
    },
    desciption:{
         type:String,
         required: [true, 'description is required']
    },
    date:{
        type: Date,
        required:[true,'date is required']
    }
}, {timestamps: true})

const transactionModel = mongoose.model('transaction', transactionSchema)

module.exports = transactionModel;