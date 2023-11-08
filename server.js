const dotenv = require('dotenv');
const app = require('./app');
const admin = require('firebase-admin');
const serviceAccount = require('./utils/firebase_credentials.json');

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 9000;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://phoneauth-3909f-default-rtdb.firebaseio.com/',
});
app.listen(port, () => {
  console.log(`App Listening on the port number ${port}`);
});
