const mongoose = require("mongoose");

const conn = async() => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URL}`)
        console.log("connected to mongodb")

    } catch (err) {
        console.log(err)
    }
}
conn()