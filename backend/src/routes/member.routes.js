const express = require('express');

const router = express.Router();

const memberController = require('../controllers/member.controller');

router.get('/', memberController.getMembers);
router.post('/', memberController.createMember);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember);

module.exports = router;