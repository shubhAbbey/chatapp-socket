const express = require("express")
const router = express.Router()

const usersController = require("../controller/usersController")
router.post("/login",usersController.login)
router.post("/register",usersController.register)
router.post("/verifyOtp",usersController.verifyOtp)
router.get("/getAllUsers/:mobile",usersController.getAllUsers)
router.post("/updateUserProfile",usersController.updateUserProfile)

module.exports = router