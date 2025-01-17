const express = require("express");
const { createNewAdmin, checkAdmin } = require("./user.controller");
const router = express.Router();


router.post("/admin", checkAdmin)
router.post("/create-admin", createNewAdmin)

module.exports = router