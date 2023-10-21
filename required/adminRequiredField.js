const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
exports.addAdmin = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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
/********************** Login ********************************************** */

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;
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
