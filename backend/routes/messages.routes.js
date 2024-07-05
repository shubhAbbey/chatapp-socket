const express = require("express")
const router = express.Router()

const messagesController = require("../controller/messagesController")
router.get("/getChatsForUser/:mobile",messagesController.getChatsForUser)
router.post("/createChats",messagesController.createChats)
router.get("/getUserBasedChats/:mobile/:to",messagesController.getUserBasedChats)

module.exports = router