const express = require("express");
const { postAOrder, getAllOrders, getSingleOrder, updateOrder, deleteAOrder, getOrdersByEmail } = require("./order.controller");
const router = express.Router()

router.post("/create-order", postAOrder)
router.get("/:mail", getOrdersByEmail)
router.get("/", getAllOrders)
router.get("/:id", getSingleOrder)
router.put("/edit/:id", updateOrder)
router.delete("/:id", deleteAOrder)

module.exports = router;