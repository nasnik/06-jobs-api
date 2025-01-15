const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an activity name'],
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
    },
    ageGroup: {
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
    },
    location: {
        type: String,
        required: true,
    },
    schedule: [
        {
            date: {
                type: Date,
                required: true,
            },
            time: {
                start: String,
                end: String,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    enrolledUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);