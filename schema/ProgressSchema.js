import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const ProgressSchema = new mongoose.Schema({
    progressId: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please provide unique UserName"],
        unique: false
    },
    units: {
        type: Number,
        required: [true, "Please provide the units"],
        unique: false
    },
    completedUnits: {
        type: Number,
        required: [true, "Please provide the completed units"],
        unique: false,
        default: 0
    },
    dateOfRecording: {
        type: Date,
        required: [true, "Please provide the date of recording"],
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [true, "Please provide the end date"]
    },
    description: {
        type: String  // Adding description as a string field
    },
    color: {
        type: String  // Adding color as a string field
    }
});

ProgressSchema.plugin(AutoIncrement, { inc_field: 'progressId' });

const Progress = mongoose.model('Progress', ProgressSchema);

export default Progress;
