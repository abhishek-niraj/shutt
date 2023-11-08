const dotenv = require('dotenv');
const Customer = require('../model/customerModel');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const docUploadHelper = require('../utils/docUploadHelper');
const short = require('short-uuid');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const decodedData = require('../auth/verifyToken');
const admin = require('firebase-admin');
dotenv.config({ path: './config.env' });

exports.signUp = async (req, res) => {
  try {
    const newCustomer = req.body;
    const password = newCustomer.password;
    newCustomer.customerId = short.generate();
    const salt = genSaltSync(12);
    newCustomer.password = hashSync(password, salt);
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
/**************** Update customer Details ********************** */
exports.updateCustomerDetails = async (req, res) => {
  docUploadHelper.upload(req, res, async function (err) {
    if (err) {
      console.info(err);
      apiResponse.apiResponseWithoutData(
        req,
        res,
        responseStatusCode.failedStatusCode,
        responseMessage.somethingWentWrong
      );
    } else {
      try {
        const customerId = decodedData.tokenData(req, res).result.id;
        const customer = {
          customerId: customerId,
        };
        if (req.files['profileImage']) {
          customer.profileImage = req.files['profileImage'][0].path.replace(
            /\\/g,
            '/'
          );
        }
        console.log(customer);
        const isCustomerDetailsUpdated = await Customer.updateCustomerDetails(
          customer
        );
        if (isCustomerDetailsUpdated.affectedRows) {
          apiResponse.apiResponseWithoutData(
            req,
            res,
            responseStatusCode.successStatusCode,
            responseMessage.customerDetailUpdated
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
    }
  });
};
/**************** Update customer Subscription Plan ********************** */

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    //
    // admin
    //   .auth()
    //   .createUser({ uid: phone })
    //   .then((user) => res.send(user));

    const phoneNumber = '+918766227022'; // Replace with the user's phone number
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    ); // Use reCAPTCHA for verification

    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('jkjjh');
        // OTP sent successfully; confirmationResult can be used for OTP verification
      });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Unable to send OTP' });
  }
};
