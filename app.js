const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const adminRouter = require('./routes/adminRoutes');
const subscriptionRouter = require('./routes/subscriptionPlanRoutes');
const merchantRouter = require('./routes/merchantRoutes');
const qrRouter = require('./routes/qrRoutes');
const gymRouter = require('./routes/gymRoutes');
const customerRouter = require('./routes/customerRoutes');
dotenv.config({ path: './config.env' });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/merchant', merchantRouter);
app.use('/api/v1/qrCode', qrRouter);
app.use('/api/v1/gym', gymRouter);
app.use('/api/v1/customer', customerRouter);

module.exports = app;
