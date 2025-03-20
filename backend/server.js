const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});
