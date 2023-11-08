const CustomerPayment = require('../model/customerPaymentModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const docUploadHelper = require('../utils/docUploadHelper');
const timeHelper = require('../utils/timeHelper');
const decodedData = require('../auth/verifyToken');
const short = require('short-uuid');
const CustomerSubscription = require('../model/customerSubscriptionModel');
const Customer = require('../model/customerModel');

exports.addCustomerPayment = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const payment = {
      transactionId: short.generate(),
      customerId: decodedData.tokenData(req, res).result.id,
      subscriptionId,
      createdAt: timeHelper.currentTimeDate().currentLocalTimeAndDate,
      date: timeHelper.currentTimeDate().currentDate,
      expiryDate: timeHelper.expireTimeDate(30).expiryDate,
    };

    const isAdded = await CustomerPayment.addPayment(payment);
    if (isAdded.insertId) {
      const paymentStatus = {
        id: isAdded.insertId,
        transactionStatus: 'Success',
      };
      const isPaymentAdded = await CustomerPayment.updatePayment(paymentStatus);
      if (isPaymentAdded.affectedRows) {
        const subscription = {
          customerId: decodedData.tokenData(req, res).result.id,
          subscriptionId,
          createdAt: timeHelper.currentTimeDate().currentLocalTimeAndDate,
          subscriptionDate: timeHelper.currentTimeDate().currentDate,
          expiryDate: timeHelper.expireTimeDate(30).expiryDate,
          subscriptionStatus: 'Active',
        };
        const isSubscriptionAdded = await CustomerSubscription.addSubscription(
          subscription
        );
        console.log(isSubscriptionAdded);
        if (isSubscriptionAdded.insertId) {
          await Customer.updateCustomerSubscriptionPlan(
            subscription.customerId,
            subscription.subscriptionId
          );
          apiResponse.apiResponseWithoutData(
            req,
            res,
            responseStatusCode.successStatusCode,
            responseMessage.subscriptionPlanAdded
          );
        } else {
          console.info('subscription not added');
          apiResponse.apiResponseWithoutData(
            req,
            res,
            responseStatusCode.failedStatusCode,
            responseMessage.somethingWentWrong
          );
        }
      } else {
        console.info('payment status not updated');
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.somethingWentWrong
        );
      }
    } else {
      console.info('payment not Added');
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.somethingWentWrong
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
