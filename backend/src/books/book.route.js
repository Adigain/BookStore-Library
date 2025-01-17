const express = require("express");
const { postABook, getAllBooks, getSingleBook, updateBook, deleteABook, getBookByName } = require("./book.controller");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const router = express.Router()

router.post("/create-book", verifyAdminToken, postABook)
router.get("/", getAllBooks)
router.get("/:id", getSingleBook)
router.put("/edit/:id", verifyAdminToken, updateBook)
router.delete("/:id", verifyAdminToken, deleteABook)
router.get("/search-book/search", getBookByName)

module.exports = router;