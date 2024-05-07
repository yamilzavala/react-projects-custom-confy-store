import React, { useState, useEffect } from 'react'
import {
    CardElement,
    useStripe,
    Elements,
    useElements,
  } from '@stripe/react-stripe-js'
  import axios from 'axios'
  import { useCartContext } from '../context/cart_context'
  import { useUserContext } from '../context/user_context'
  import { formatPrice } from '../utils/helpers'
  import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const {cart, total_amount, shipping_fee, clearCart} = useCartContext();
    const {myUser} = useUserContext();
    const navigate = useNavigate();
  
  //STRIPE STUFF
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
  
    const cardStyle = {
      style: {
        base: {
          color: '#32325d',
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#32325d',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    };
  
    const createPaymentIntent = async () => {
      try {
        const resp = await axios.post(
            '/.netlify/functions/create-payment-intent', 
            JSON.stringify({cart, total_amount, shipping_fee})
        )
        setClientSecret(resp.data.clientSecret)        
        console.log('RESPONSE STRIPE: ', resp)
      } catch (error) {
        console.log(error.response)        
      }
    }
  
    //when the component is loaded, connect with stripe to get the secretkey to after try to pay with submit 
    useEffect(() => {
      createPaymentIntent()
      // eslint-disable-next-line
    } ,[])
  
    const handleChange = async (event) => {
        setDisabled(!event.complete)
        setError(event.error ? event.error.message : '')
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setProcessing(true)
        //try to pay
        const payload = stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        //if payment fails
        if(payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)
            setSucceeded(false)
        }
        //if payment was ok
        else {
            setError(null)
            setProcessing(false)
            setSucceeded(true)
            //redirect to home
            setTimeout(() => {
                clearCart();
                navigate('/')
            }, 10000)
        }
     }  
  
    return (
      <div>
        {
            succeeded ? 
            (
                <article>
                    <p> Thanks, you payment was successful! </p>
                    <p> Redirecting to home page... </p>
                </article>
            ) : 
            (
                <article>
                    <h3> Hello, {myUser && myUser.name} </h3>
                    <p> Your total is {formatPrice(total_amount + shipping_fee)} </p>
                    <p> Test card number: 4242 4242 4242 4242  </p>
                </article>
            )
        }

        <form id='payment-form' onSubmit={handleSubmit}>
          <CardElement id='card-element' onChange={handleChange} options={cardStyle}/>
          <button id='submit' disabled={processing || disabled || succeeded}>
            <span id='button-text'>
              { processing ? 
                (
                  <div className='spinner' id='spinner'></div>
                ) :
                'Pay' 
              }
            </span>
          </button>
          {/* Show any errors that happens when processing the payment */}
          {error && <div className='card-error' role='alert'>{error}</div>}
          {/* Show a success message upon completion */}
          <p className={succeeded ? `result-message` : `result-message hidden`}>
            Payment succeeded, see the result in your 
            <a target="_blank" href={`https://dashboard.stripe.com/test/payments`}>
              {' '}
              Stripe dashboard.
            </a>{' '}
            Refresh the page to page again
          </p>
        </form>
      </div>
    )
  }

export default CheckoutForm;