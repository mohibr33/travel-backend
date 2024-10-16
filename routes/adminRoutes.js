// routes/packageRoutes.js
const express = require('express');
const router = express.Router();
const {adminDelete,addAdmin,updateAdmin } = require('../controller/adminController'); 
const {login}=require("../controller/adminAuthController");
const verifyAdminToken=require("../middleware/adminMiddleware")

router.post('/login', login);
router.post('/add', verifyAdminToken, addAdmin);
router.put('/:id', verifyAdminToken, updateAdmin);
router.delete('/:id', verifyAdminToken, adminDelete);

module.exports = router;
