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

exports.getMemberById = (req, res) => {

  const id = req.params.id;

  Member.getMemberById(id, (err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json(results[0]);

  });

};

exports.updateMember = (req, res) => {

  const id = req.params.id;

  Member.updateMember(id, req.body, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      message: 'Member updated successfully'
    });

  });

};

exports.deleteMember = (req, res) => {

  const id = req.params.id;

  Member.deleteMember(id, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.json({
      success: true,
      message: 'Member Deleted Successfully',
    });

  });

};