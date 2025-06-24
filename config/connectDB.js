const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server running on ${mongoose.connection.host}`);
        
    }catch (err){
        console.log(err);
        
    }
}

module.exports = connectDB