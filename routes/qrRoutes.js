const express = require('express');
const qrController = require('../controller/qrController');
const authorization = require('../auth/verifyToken');
const requiredField = require('../required/qrCodeRequiredField');
const router = express.Router();

router
  .route('/add-qr-code')
  .post(
    authorization.checkAdmin,
    requiredField.addQrCode,
    qrController.addQrCode
  );
router
  .route('/get-qr-codes')
  .post(authorization.checkAdmin, qrController.getQrCodes);
router
  .route('/update-qr-code')
  .patch(
    authorization.checkAdmin,
    requiredField.updateQrCode,
    qrController.updateQrCode
  );
router
  .route('/delete-qr-code')
  .delete(
    authorization.checkAdmin,
    requiredField.deleteQrCode,
    qrController.deleteQrCode
  );

module.exports = router;
