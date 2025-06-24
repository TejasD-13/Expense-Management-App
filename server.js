const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path')
const connectDB = require('./config/connectDB');
dotenv.config();

connectDB()

const app = express()

// middleware 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
// user-routes
app.use('/api/v1/users', require('./routes/userRoute'))

// transaction-routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
})