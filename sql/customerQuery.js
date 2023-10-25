const signUp = `Insert Into customer Set ?`;
const login = `Select customerId, password, subscriptionPlan, role From customer Where email = ?`;
module.exports = {
  signUp,
  login,
};
