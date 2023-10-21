const addMerchant = `Insert Into merchant Set ?`;
const getMerchant = `Select merchantId, email, password, role From merchant Where email = ?`;
module.exports = {
  addMerchant,
  getMerchant,
};
