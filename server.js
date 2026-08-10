const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let userData = {
  totalBalance: 782.04,
  deposited: 500.00,
  profit: 282.04
};

app.get('/', (req, res) => {
  res.send('Stockvance Backend API is running!');
});

app.get('/api/user-stats', (req, res) => {
  res.json({
    success: true,
    data: userData
  });
});

app.post('/api/deposit', (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid deposit amount.'
    });
  }

  const depositValue = parseFloat(amount);
  userData.deposited += depositValue;
  userData.totalBalance += depositValue;

  res.json({
    success: true,
    message: 'Deposit processed successfully.',
    data: userData
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Stockvance server running on port ${PORT}`);
});
