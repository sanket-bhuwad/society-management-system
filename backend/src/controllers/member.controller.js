const Member = require('../models/member.model');

exports.getMembers = (req, res) => {

  Member.getAllMembers((err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json(results);

  });

};

exports.createMember = (req, res) => {
  Member.createMember(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Member added successfully',
      id: result.insertId,
    });
  });
};