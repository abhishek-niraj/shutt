const signUp = `Insert Into customer Set ?`;
const login = `Select customerId, password, subscriptionPlan, role From customer Where email = ?`;
const updateCustomerDetails = `Update customer Set profileImage = COALESCE(?,profileImage) Where customerId = ?`;
const updateCustomerSubscriptionPlan = `Update customer Set subscriptionPlan = COALESCE(?,subscriptionPlan)
Where customerId = ?`;
module.exports = {
  signUp,
  login,
  updateCustomerDetails,
  updateCustomerSubscriptionPlan,
};
