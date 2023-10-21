const SubscriptionPlan = require('../model/subscriptionModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const short = require('short-uuid');

/********************** Add Subscription **********************************************************/
exports.addSubscription = async (req, res) => {
  try {
    const subscription = req.body;
    subscription.subscriptionId = short.generate();

    const isAdd = await SubscriptionPlan.addSubscription(subscription);
    if (isAdd.insertId) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.created,
        responseMessage.subscriptionPlanAdded
      );
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.err
      );
    }
  } catch (err) {
    console.info(err);
    apiResponse.apiResponseWithoutData(
      req,
      res,
      responseStatusCode.failedStatusCode,
      responseMessage.err
    );
  }
};
/*************************** Get Subscription Plan ************************************* */
exports.getAllSubscriptionPlan = async (req, res) => {
  try {
    const subscription = await SubscriptionPlan.getAllSubscriptionPlan();
    if (subscription.length) {
      apiResponse.apiResponseWithData(
        req,
        res,
        responseStatusCode.successStatusCode,
        subscription
      );
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.successStatusCode,
        responseMessage.noData
      );
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
