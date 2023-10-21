const Merchant = require('../model/merchantModel');
const dotenv = require('dotenv');
const apiResponse = require('../response/apiResponse');
const responseStatusCode = require('../response/responseStatusCode');
const responseMessage = require('../response/responseMessage');
const docUploadHelper = require('../utils/docUploadHelper');
const randomize = require('randomatic');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const UserRole = require('../enum/userRoleEnum');
const short = require('short-uuid');
const mailHelper = require('../utils/mailHelper');
const MailEnum = require('../enum/mailEnum');
const MailSubjectEnum = require('../enum/mailSubjectEnum');
const requiredField = require('../required/merchantRequiredField');
dotenv.config({ path: './config.env' });
exports.addMerchant = (req, res) => {
  try {
    docUploadHelper.upload(req, res, async function (err) {
      const newMerchant = req.body;
      if ((newMerchant.email && newMerchant.name, newMerchant.contactNumber)) {
        const password = randomize('Aa0!', 10);
        const salt = genSaltSync(12);
        newMerchant.password = hashSync(password, salt);
        if (err) {
          console.info(err);
          apiResponse.apiResponseWithoutData(
            req,
            res,
            responseStatusCode.failedStatusCode,
            responseMessage.somethingWentWrong
          );
        } else {
          newMerchant.role = UserRole.merchant;
          newMerchant.merchantId = short.generate();
          const getMerchant = await Merchant.login(newMerchant);
          if (!getMerchant.length) {
            if (req.files['merchant_profile']) {
              newMerchant.profileImage = req.files['merchant_profile'][0].path;
            }

            const merchant = await Merchant.addMerchant(newMerchant);

            const mailDetails = {
              type: MailEnum.merchantWelcomeMail,
              email: newMerchant.email,
              subject: MailSubjectEnum.welcome,
              name: newMerchant.name,
              password: password,
              text: responseMessage.welcomeMessage,
            };
            if (merchant.insertId) {
              apiResponse.apiResponseWithoutData(
                req,
                res,
                responseStatusCode.successStatusCode,
                responseMessage.addMerchant
              );

              mailHelper.sentMail(mailDetails);
            }
          } else {
            apiResponse.apiResponseWithoutData(
              req,
              res,
              responseStatusCode.failedStatusCode,
              responseMessage.emailAlreadyAvailable
            );
          }
        }
      } else {
        apiResponse.apiResponseWithoutData(
          req,
          res,
          responseStatusCode.failedStatusCode,
          responseMessage.fillMandatoryField
        );
      }
    });
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
/********************* Login Merchant ************************************ */
exports.login = async (req, res) => {
  try {
    const merchant = req.body;
    const getMerchant = await Merchant.login(merchant);
    if (getMerchant.length) {
      const isMatchPassword = compareSync(
        merchant.password,
        getMerchant[0]['password']
      );
      if (isMatchPassword) {
        getMerchant.password = undefined;
        const result = {
          role: getMerchant[0]['role'],
          id: getMerchant[0]['merchantId'],
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
