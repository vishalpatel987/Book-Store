const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_test_AiNgPXDD53xfH5',
  key_secret: 'WrgHzIslBPBMvokeS0drmFWA',
});

router.post('/order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paisa
      currency: "INR",
      receipt: "receipt_order_74394"
    };
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
