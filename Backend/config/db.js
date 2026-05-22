import mongoose from 'mongoose';

async function connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Db successfully");
    } catch (error) {
        console.error("Error Occured when connectiong to Db", error);
    }
}

export default connectDb;