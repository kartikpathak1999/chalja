import React from 'react'

import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'
const PUBLIC_KEY = "pk_test_51LusLrSGrYngLGnUX6aFkSV2cPFCNWCp5Vu9AHDefDNW1gEpygSeQjfq5qhJq25x32VxysPx4P7Du9NmJt8ONrdF00oo3PbkH3"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm />
        </Elements>
  )
}
