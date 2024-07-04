import { useEffect, useState } from 'react';

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('AUD');

  useEffect(() => {

    const getConfig = async () => {
      const testURL = "http://localhost:5001/api/stripe/config"
      await fetch(testURL)
      .then(function (response) {
        if (!response.ok) {
          alert('Error message');
        } else {
          return response.json()
        }
      }).then(function (data) {
        setAmount(data.unitAmount)
        setCurrency(data.currency)
      })
    }

    getConfig()
  }, []);

  useEffect(() => {

    // const getCheckout = async () => {
    //   const testURL = "http://localhost:5001/api/stripe/config"
    //   await fetch(testURL)
    //   .then(function (response) {
    //     if (!response.ok) {
    //       alert('Error message');
    //     } else {
    //       return response.json()
    //     }
    //   }).then(function (data) {
    //     setAmount(data.unitAmount)
    //     setCurrency(data.currency)
    //   })
    // }

    // getConfig()
  }, []);


  return (
    <div className="sr-root">
      <div className="sr-main">
        <section className="container">
          <div>
            <h1>Single photo</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div>
          <form action="http://localhost:5001/create-checkout-session" method="POST">
            <div className="quantity-setter">
              <button
                className="increment-btn"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity-input"
                min="1"
                max="10"
                value={quantity}
                name="quantity"
                readOnly
              />
              <button
                className="increment-btn"
                disabled={quantity === 10}
                onClick={() => setQuantity(quantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
            <p className="sr-legal-text">Number of copies (max 10)</p>

            <button role="link" id="submit" type="submit">
              Buy {formatPrice({amount, currency, quantity})}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;




// import { useState, useCallback, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
// import { Navigate } from "react-router";

// // This is your test secret API key.
// const stripePromise = loadStripe("pk_test_51PXfoWRxyTulRXt9uelI7XbuOfh7wUwk7RfnjVnCKa2Vvu9FKuVqIsJyHyywe7wrZUk4Vlwdr1NjAaNevUzY1Ok300e6raXtI8");

// export const CheckoutForm = () => {

    
//     //   const fetchClientSecret = useCallback(async () => {
//     // await fetch("http://localhost:5001/api/create-checkout-session", {
//     //     method: 'POST',
//     //     // body: JSON.stringify({ firstName, lastName, email, password, initials }),
//     //     headers: { 'Content-Type': 'application/json' },
//     //   })
//     //   .then(function (response) {
//     //     if (!response.ok) {
//     //       alert('Error message');
//     //     } else {
//     //       return response.json()
//     //     }
//     //   }).then(function (data) {

//     //     console.log(data)
//     //   })
//     // }, [])

//   const fetchClientSecret = useCallback(() => {
//     // Create a Checkout Session
//     return fetch("https://localhost:5001/api/stripe/create-checkout-session", {
//       method: "POST",
//       request: {
//         headers: [
//           {
//             name: 'Authorization',
//             value: 'Bearer eyJhbGciOiJIUzI1NiJ9.Zm9yd2FyZGluZy1hcGktZGVtbw.2qoK37CNBmMjMDRERSYUSE-YrjsTgGhHnxMeqOxjrAg',
//           },
//         ],
//         body: '{"metadata":{"reference":"Your Token Reference"},"card":{"number":"","exp_month":"","exp_year":"","cvc":"","name":""}}',
//       },
//     })
//       .then((res) => console.log(res.json()))
//       .then((data) => data.clientSecret);
//   }, []);

//   const options = { fetchClientSecret };

//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   );
// };


// export const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState("");

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get("session_id");

//     fetch(`/session-status?session_id=${sessionId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === "open") {
//     return <Navigate to="/checkout" />;
//   }

//   if (status === "complete") {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to {customerEmail}. If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }

//   return null;
// };
