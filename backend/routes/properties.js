const express = require("express");
const router = express.Router();

const {
    getAllProperties, getPropertyByID, updateProperty, deleteProperty
} = require("../controllers/propertiesController");

router.get("/", getAllProperties);

router.get("/:id", getPropertyByID);

router.put("/:id", updateProperty);

router.delete("/:id", deleteProperty);

module.exports = router;