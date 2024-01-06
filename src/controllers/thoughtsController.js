const { ThoughtModel } = require('../models/Thought');
const { UserModel } = require('../models/User');

module.exports.showThoughts = (req, res) => {
    res.render('index');
}

