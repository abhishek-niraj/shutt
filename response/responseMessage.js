const ResponseMessage = Object.freeze({
  userAdd: 'User added successfully',
  somethingWentWrong: 'Something went wrong',
  fillMandatoryField: 'Please fill mandatory fields',
  emailAvailable: 'This email is already available',
  invalidEmailAndPassword: 'Invalid email or password',
  loginSuccessfully: 'successfully',
  subscriptionPlanAdded: 'Subscription added successfully ',
  invalidToken: 'Invalid Token',
  accessDenied: 'Access Denied ! Unauthorized User',
  emailSent: 'Email Sent successfully',
  addMerchant: 'Merchant added successfully',
  welcomeMessage: `Dear [User Name],

Welcome to [Your Service Name]! Your registration is complete, and we're excited to have you on board. Here's your login information:

Email: [User Email]
Password: [Default Password]

Please change your password after logging in for security. If you need any assistance, contact us at [Support Email].

Best regards,
[Name]
[Service Name]`,
  emailAlreadyAvailable: 'This email already registered',
  noData: 'No data',
  qrCodeAdded: 'QrCode added successfully',
  qrCodeAlreadyAvailable: 'This qrCode is already registered',
  qrNumberUpdated: 'QrNumber updated successfully',
  qrCodeDeleted: 'QrCode deleted successfully',
  gymAdd: 'Gym added successfully',
  signup: 'Signup successfully',
  gymDeleted: 'Gym deleted successfully',
  checkIn: 'CheckIn successfully',
  isCheckIn: 'You already checkIn on this date',
  customerDetailUpdated: 'Details updated successfully',
  invalidPrice: 'Input price is not matching with subscription price',
});

module.exports = ResponseMessage;
