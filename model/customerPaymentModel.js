const dbConn = require('../database/db.config');
const customerPaymentQuery = require('../sql/customerPaymentQuery');

const CustomerPayment = (payment) => {
  this.transactionId = payment.transactionId;
  this.customerId = payment.customerId;
  this.subscriptionId = payment.subscriptionId;
  this.createdAt = payment.createdAt;
  this.transactionStatus = payment.transactionStatus;
  this.price = payment.price;
};

CustomerPayment.addPayment = (payment) => {
  return new Promise((resolve, reject) => {
    dbConn.query(customerPaymentQuery.addPayment, payment, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
CustomerPayment.updatePayment = (payment) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      customerPaymentQuery.updateCustomerPaymentDetails,
      [payment.transactionStatus, payment.id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};
CustomerPayment.DeletePayment = (payment) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      customerPaymentQuery.deletePaymentHistory,
      [payment.id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};
module.exports = CustomerPayment;
