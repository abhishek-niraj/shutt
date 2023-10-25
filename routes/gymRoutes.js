const express = require('express');
const gymController = require('../controller/gymController');
const authorization = require('../auth/verifyToken');
const router = express.Router();
router.route('/add-gym').post(authorization.checkAdmin, gymController.addGym);
router.route('/get-gyms').post(gymController.getGyms);
router
  .route('/delete-gym')
  .delete(authorization.checkAdmin, gymController.deleteGym);
module.exports = router;
