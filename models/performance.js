/* Importing the mongoose module. */
const mongoose = require('mongoose');

/* Creating a schema for the performance model. */
const performanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
/* Creating a model for the performance schema. */
const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;