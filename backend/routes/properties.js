const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getAllProperties, getPropertyByID, updateProperty, deleteProperty, searchProperties, filterProperties
} = require("../controllers/propertiesController");

router.get("/", getAllProperties);
router.get("/search", searchProperties);
router.get("/filter", filterProperties);

router.get("/:id", getPropertyByID);

router.put("/:id",
    authMiddleware,
    authorizeRoles("Admin", "Agent"),
    updateProperty);

router.delete("/:id", 
    authMiddleware,
    authorizeRoles("Admin", "Agent"),
    deleteProperty);


module.exports = router;