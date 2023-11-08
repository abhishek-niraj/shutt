const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const timeHelper = require('../utils/timeHelper');
const TimeSheet = require('../model/timeSheetModel');
const decodedData = require('../auth/verifyToken');
const Subscription = require('../model/subscriptionModel');
exports.isValidPrice = async (req, res, next) => {
  try {
    const { subscriptionId, inputPrice } = req.body;
    const price = parseInt(inputPrice);

    const subscriptionPlan = await Subscription.getSubscriptionById(
      subscriptionId
    );
    const subscriptionPrice = parseInt(subscriptionPlan[0]['price']);
    if (price !== subscriptionPrice) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.invalidPrice
      );
    } else {
      next();
    }
  } catch (err) {
    console.info(err);
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.failedStatusCode,
      responseMessage.somethingWentWrong
    );
  }
};
