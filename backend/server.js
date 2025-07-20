const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const authMiddleware = require('./middleware/authorisation');
const config = require('./config');
const setupSwagger = require('./swagger');
const cors = require('cors');

//dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5000', // React dev server
  credentials: true
}));

setupSwagger(app);

app.use('/api/users', userRoutes);


app.use('/api/news', authMiddleware(['admin', 'user']), newsRoutes);


app.use('/uploads', express.static('uploads'))
mongoose.connect(config.MONGOURI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
