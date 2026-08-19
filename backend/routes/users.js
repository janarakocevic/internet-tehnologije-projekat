const express = require("express");
const router = express.Router();

const { 
    getAllUsers, getUserByID, updateUser, deleteUser
} = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


router.get("/", 
    authMiddleware,
    authorizeRoles('Admin'), 
    getAllUsers);

router.get("/:id", 
    authMiddleware,
    authorizeRoles('Admin'),
    getUserByID);

router.put("/:id", 
    authMiddleware,
    authorizeRoles('Admin'),
    updateUser);

router.delete("/:id", 
    authMiddleware,
    authorizeRoles('Admin'),
    deleteUser);

module.exports = router ;