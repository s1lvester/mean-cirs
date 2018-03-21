
const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    measures: {
        type: String,
        default: ""
    },
    suggestions: {
        type: String,
        default: ""
    },
    published: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: +new Date()
    },
    answer: {
        type: String,
        default: ""
    },
    done: {
        type: Boolean,
        default: false
    },
    dateUpdated: {
        type: Date,
        default: ""
    }
});

module.exports = mongoose.model('Incident', IncidentSchema);
