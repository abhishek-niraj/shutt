const addMerchant = `Insert Into merchant Set ?`;
const getMerchant = `Select merchantId, email, password, role From merchant Where email = ?`;
const getMerchants =
  'Select name,contactNumber, email, profileImage, merchantId,qrId from merchant';
const updateMerchant = `UPDATE merchant SET qrId = COALESCE(?,qrId), gymId = COALESCE(?,gymId) Where merchantId = ?`;

module.exports = {
  addMerchant,
  getMerchant,
  getMerchants,
  updateMerchant,
};
