const express = require('express');
const app = express();
const { errHandler } = require('./middlewares/errhandler');
const cors = require('cors');
const { connectdb } = require('./db');
const userInfoRoutes = require('./routes/userinfo.routes');
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');
const compression = require('compression');
const hpp = require('hpp');
require('dotenv').config();

function sanitizeInput(input) {
  if (!input) return input;
  if (typeof input === 'object') {
    const sanitized = Array.isArray(input) ? [] : {};
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key]);
    }
    return sanitized;
  }
  return sanitize(input);
}

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(compression());

app.use((req, res, next) => {
  req.body = sanitizeInput(req.body);
  next();
});

app.use('/', userInfoRoutes);

app.use(errHandler);

connectdb()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
