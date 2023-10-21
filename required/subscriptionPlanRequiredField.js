const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');

exports.addSubscription = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.failedStatusCode,
      responseMessage.fillMandatoryField
    );
  } else {
    next();
  }
};
