import mongoose from "mongoose";

const conectDB = async() => {
    try {
        
        const conn = await mongoose.connect('mongodb+srv://theuser:V3dr0tc3h95.@cluster0.i1kohf3.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
};

export default conectDB;