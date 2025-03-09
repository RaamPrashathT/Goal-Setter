const mogoose = require('mongoose');
const goalSchema = new mogoose.Schema({
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mogoose.model('Goal', goalSchema);