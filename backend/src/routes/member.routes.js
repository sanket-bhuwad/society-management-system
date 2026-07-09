const express = require("express");

const router = express.Router();

const memberController = require("../controllers/member.controller");

const verifyToken = require('../middleware/auth.middleware');

router.get("/", verifyToken, memberController.getMembers);
router.post("/", verifyToken, memberController.createMember);
router.get("/:id", verifyToken, memberController.getMemberById);
router.put("/:id", verifyToken, memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

module.exports = router;
