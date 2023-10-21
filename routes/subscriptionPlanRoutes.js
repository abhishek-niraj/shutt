const express = require('express');
const subscriptionPlanController = require('../controller/subscriptionPlanController');
const authorization = require('../auth/verifyToken');
const requiredField = require('../required/subscriptionPlanRequiredField');
const router = express.Router();

router
  .route('/')
  .post(
    authorization.checkAdmin,
    requiredField.addSubscription,
    subscriptionPlanController.addSubscription
  )
  .get(
    authorization.checkUser,
    subscriptionPlanController.getAllSubscriptionPlan
  );

module.exports = router;
