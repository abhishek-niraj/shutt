const dbConn = require('../database/db.config');
const customerSubscriptionQuery = require('../sql/customerSubscriptionQuery');
const CustomerSubscription = (customerSubscription) => {
  this.id = customerSubscription.id;
  this.subscriptionId = customerSubscription.subscriptionId;
  this.customerId = customerSubscription.customerId;
  this.createdAt = customerSubscription.createdAt;
  this.updatedAt = customerSubscription.updatedAt;
  this.subscriptionDate = customerSubscription.subscriptionDate;
  this.subscriptionStatus = customerSubscription.subscriptionStatus;
};

CustomerSubscription.addSubscription = (customerSubscription) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      customerSubscriptionQuery.addSubscription,
      customerSubscription,
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

module.exports = CustomerSubscription;
