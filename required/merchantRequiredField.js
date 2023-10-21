const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');

/********************** Add Merchant *********************** */

exports.addMerchant = (req, res, next, data) => {
  try {
    const { email, name, contactNumber } = data;
    console.log(req.body);
    if (!name || !email || !contactNumber) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.fillMandatoryField
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
  }
};
/********************** Login *********************** */

exports.loginMerchant = (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.fillMandatoryField
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
  }
};
