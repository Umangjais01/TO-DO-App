const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    plan: {
        type: String,
        required: true
    },
    date: {
        type: Date,
       required: true
    },
    category: {
        type : String,
        required: true
    }
});
// const Plan = planSchema;
const Plan = mongoose.model('Plan',planSchema);
module.exports = Plan;

