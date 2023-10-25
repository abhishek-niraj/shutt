const dotenv = require('dotenv');
const Customer = require('../model/customerModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const docUploadHelper = require('../utils/docUploadHelper');
const short = require('short-uuid');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
dotenv.config({ path: './config.env' });

exports.signUp = async (req, res) => {
  try {
    const newCustomer = req.body;
    const password = newCustomer.password;
    console.log(newCustomer);
    newCustomer.customerId = short.generate();
    const salt = genSaltSync(12);
    newCustomer.password = hashSync(password, salt);
    console.log(newCustomer);
    const isAdded = await Customer.signUp(newCustomer);
    if (isAdded.insertId) {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.successStatusCode,
        responseMessage.signup
      );
    } else {
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

exports.login = async (req, res) => {
  try {
    const customer = req.body;
    const getCustomer = await Customer.login(customer.email);
    if (getCustomer.length) {
      const isMatchPassword = compareSync(
        customer.password,
        getCustomer[0]['password']
      );
      if (isMatchPassword) {
        customer.password = undefined;
        const result = {
          role: getCustomer[0]['role'],
          id: getCustomer[0]['customerId'],
          subscriptionPlan: getCustomer[0]['subscriptionPlan'],
        };
        const jsonWebToken = sign({ result }, process.env.SECRETKEY, {
          expiresIn: process.env.EXPIREIN,
        });
        res.json({
          statusCode: responseStatusCode.successStatusCode,
          message: responseMessage.loginSuccessfully,
          token: jsonWebToken,
          id: result.id,
          role: result.role,
          subscriptionPlan: result.subscriptionPlan,
        });
      } else {
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.invalidEmailAndPassword
        );
      }
    } else {
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.invalidEmailAndPassword
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
