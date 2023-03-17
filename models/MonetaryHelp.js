
import mongoose from "mongoose";

const monetaryHelpSchema = mongoose.Schema({
        transaction_date: {
            type: Date,
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        reporting_org: {
            type: String,
            require: true,
        },
        last_start : {
            type: Number,
            require: true
        },
        rows: {
            type: Number,
            require: true
        }
        
    },
    {
        timestamps: true,
    }
);

const MonetaryHelp = mongoose.model("MonetaryHelp", monetaryHelpSchema);
export default MonetaryHelp;