//http://localhost:8888/.netlify/functions/create-payment-intent
//      domain         /.netlify/functions/create-payment-intent

require('dotenv').config()

// This is your test secret API key
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

//call to stripe
exports.handler = async function(event, context) {
    //response if is a POST request 
    if(event.body) {
        const {cart, total_amount, shipping_fee} = JSON.parse(event.body);

        //total to send to stripe
        const calculateOrderAmount = () => {
            return total_amount + shipping_fee
        }

        //response 
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: "usd",
            })
            return{ 
                statusCode: 200,
                body: JSON.stringify({clientSecret: paymentIntent.client_secret})
            }
        } catch (error) {
            return{ 
                statusCode: 500,
                body: JSON.stringify({msg: error.message})
            }
        }
    }

    //response if is a GET request
    return {        
        statusCode: 200,
        body: 'Create Payment intent'
    }
}