const express = require('express');
const merchantController = require('../controller/merchantController');
const authorization = require('../auth/verifyToken');
const requiredFiled = require('../required/merchantRequiredField');
const router = express.Router();

router
  .route('/')
  .post(authorization.checkAdmin, merchantController.addMerchant);

router
  .route('/login')
  .post(requiredFiled.loginMerchant, merchantController.login);
module.exports = router;
