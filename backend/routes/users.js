const express = require("express");
const router = express.Router();

const { 
    getAllUsers, getUserByID, updateUser, deleteUser
} = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, getAllUsers);

router.get("/:id", getUserByID);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router ;