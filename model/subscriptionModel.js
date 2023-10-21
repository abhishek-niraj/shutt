const dbConn = require('../database/db.config');
const subscriptionPlanQuery = require('../sql/subscriptionPlanQuery');
const SubscriptionPlan = (subscription) => {
  this.subscriptionId = subscription.subscriptionId;
  this.name = subscription.name;
  this.price = subscription.price;
};

SubscriptionPlan.addSubscription = (subscription) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      subscriptionPlanQuery.addSubscription,
      subscription,
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

SubscriptionPlan.getAllSubscriptionPlan = () => {
  return new Promise((resolve, reject) => {
    dbConn.query(subscriptionPlanQuery.getAllSubscription, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
module.exports = SubscriptionPlan;
