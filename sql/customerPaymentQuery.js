const addPayment = `Insert Into customer_payments Set ?`;
const updateCustomerPaymentDetails = `Update customer_payments Set transactionStatus = COALESCE(?,transactionStatus) Where id = ?`;
const deletePaymentHistory = `Delete customer_payments Where id = ?`;
module.exports = {
  addPayment,
  updateCustomerPaymentDetails,
  deletePaymentHistory,
};
