const express = require("express");
const router = express.Router();

const { 
    getAllUsers, getUserByID, updateUser, deleteUser
} = require("../controllers/usersController");

router.get("/", getAllUsers);

router.get("/:id", getUserByID);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router ;