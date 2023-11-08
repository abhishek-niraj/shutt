const addSubscription = `Insert into subscription_plan Set ?`;
const getAllSubscription = `Select * from subscription_plan`;
const getSubscriptionById = `Select subscriptionId, price From subscription_plan Where subscriptionId = ?`;
module.exports = {
  addSubscription,
  getAllSubscription,
  getSubscriptionById,
};
