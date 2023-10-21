const addSubscription = `Insert into subscription_plan Set ?`;
const getAllSubscription = `Select * from subscription_plan`;
module.exports = {
  addSubscription,
  getAllSubscription,
};
