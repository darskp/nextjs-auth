import mongoose from "mongoose";

export const connectToDB = () => {
    const url = 'mongodb://localhost:27017/nextjsauth';
    mongoose.connect(url)
        .then(() => {
            console.log("Connection Successful")
        })
        .catch((err) => {
            console.log("Something went wrong!", err)
        })
}
