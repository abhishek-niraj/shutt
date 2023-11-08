const express = require('express');
const timeSheetController = require('../controller/timeSheetController');
const authorization = require('../auth/verifyToken');
const checkInAuth = require('../auth/isCheckIn');
const router = express.Router();

router
  .route('/qrId')
  .post(
    authorization.checkUser,
    checkInAuth.isCheckIn,
    timeSheetController.checkIn
  );
router.route('/getTimeSheet').post(timeSheetController.getCustomerTimeSheet);
module.exports = router;
