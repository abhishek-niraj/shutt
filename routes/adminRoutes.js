const express = require('express');
const adminController = require('../controller/adminController');
const requiredField = require('../required/adminRequiredField');
const adminAuthController = require('../auth/adminAuth');
const router = express.Router();

router
  .route('')
  .post(
    requiredField.addAdmin,
    adminAuthController.isAvailable,
    adminController.addAdmin
  );
router.route('/login').post(requiredField.login, adminController.login);
module.exports = router;
