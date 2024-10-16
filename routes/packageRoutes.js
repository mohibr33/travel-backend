// routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const { addPackage, getAllPackages,updatePackage,packageDelete} = require('../controller/packageController'); // Assuming packageController.js is in controllers folder
const verifyAdminToken=require("../middleware/adminMiddleware")
// Add a new package route
router.post('/',verifyAdminToken,addPackage);

// Get package by ID route
router.get('/', verifyAdminToken,getAllPackages);
router.put('/',verifyAdminToken,updatePackage);
router.delete('/',verifyAdminToken,packageDelete)

module.exports = router;
