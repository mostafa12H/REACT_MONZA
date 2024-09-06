require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return Math.round(total * 100);
};

const createInvoice = async (customerId, paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      throw new Error("Payment intent not found");
    }

    const invoiceItem = await stripe.invoiceItems.create({
      customer: customerId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      description: `Invoice for Payment Intent ID: ${paymentIntentId}`,
    });

    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 30,
    });

    await stripe.invoices.finalizeInvoice(invoice.id);
    await stripe.invoices.sendInvoice(invoice.id);

    return invoice;
  } catch (error) {
    console.error("Error creating invoice: ", error);
    throw new Error("Could not create invoice");
  }
};

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items, customerEmail } = req.body;
    const amount = calculateOrderAmount(items);

    let customer = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (customer.data.length === 0) {
      customer = await stripe.customers.create({
        email: customerEmail,
      });
    } else {
      customer = customer.data[0];
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).send({ error: error.message });
  }
});

app.post("/create-invoice", async (req, res) => {
  try {
    const { customerId, paymentIntentId } = req.body;

    if (!customerId || !paymentIntentId) {
      throw new Error("Missing customerId or paymentIntentId");
    }

    const invoice = await createInvoice(customerId, paymentIntentId);
    res.send({ invoice });
  } catch (error) {
    console.error("Error creating invoice:", error.message);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {});
