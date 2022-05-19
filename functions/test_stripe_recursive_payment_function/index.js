const express = require('express');
const app = express();
const { resolve } = require('path');
require('dotenv').config({ path: './.env' });

app.use(express.json());

checkEnv();

const stripe = require('stripe')('sk_test_ZS5U8YbLx84cZCUZekZ1AOmWqbmbVDZB1o8RUrP5mvKa1P2JNhef4600riYWq166');


function checkEnv() {
    const price = process.env.PRICE;
    console.log('Price is ' + price);
    if (price === "price_12345" || !price) {
        console.log("You must set a Price ID in the environment variables. Please see the README.");
    }
}



app.post('/create-checkout-session', async(req, res) => {
    console.log('in create checkout session ');
    console.log(req.body);
    const domainURL = 'https://teststriperecursivepayment-698833516.development.catalystserverless.com/app';

    var quantity = req.body.data;
    console.log('quantity is  ' + quantity);

    const pmTypes = ('card').split(',').map((m) => m.trim());

    const session = await stripe.checkout.sessions.create({

        billing_address_collection: 'auto',
        payment_method_types: pmTypes,
        line_items: [{
            price: 'price_1JlrYVSChu38Ip39WlHdDlET',
            // For metered billing, do not pass quantity
            quantity: 1,
        }, ],
        mode: 'subscription',
        success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/cancel.html`,
    });
    console.log(session);
    return res.json({ url: session.url })
});



module.exports = app;
