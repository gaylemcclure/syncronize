import { useEffect, useState } from "react";
import WelcomeFooter from "../components/nav/welcomeFooter";
import styled from "styled-components";
import { singleData, recurringData } from "../assets/data/pricingData";

const formatPrice = (amount, currency) => {
  const numberFormat = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (1 * amount).toFixed(2);
  return numberFormat.format(total);
};

const Checkout = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("AUD");
  const [productData, setProductData] = useState({});
  const [user, setUser] = useState("");

  let planType = "";
  const paramString = window.location.href;
  const searchParams = new URLSearchParams(paramString);
  searchParams.forEach((value) => {
    planType = value;
  });

  useEffect(() => {
    if (planType !== "") {
      const getConfig = async () => {
        console.log(singleData)
        console.log(recurringData)
        const testURL = `http://localhost:3001/api/stripe/config?plan=${planType}`
        await fetch(testURL)
          .then(function (response) {
            if (!response.ok) {
              alert("Error message");
            } else {
              return response.json();
            }
          })
          .then(function (data) {
            setProductData(data);
            setAmount(data.unitAmount);
            setCurrency(data.currency);
          });
      };

      getConfig();
    }
  }, [planType])

  const features = recurringData.filter((data) => data.value === planType);
  const action = `http://localhost:3001/api/stripe/create-checkout-session?=${planType}`
  const recurringAction = `http://localhost:3001/api/stripe/create-checkout-session-recurring?=${planType}`

  return (
    <>
      <CheckoutContainer>
        <div className="sr-root">
          <div className="sr-main">
            {planType === "lifetime" && (
              <section className="container">
                <h1>Confirm Syncronize purchase</h1>
                <PriceBox>
                  <div>
                    <h2>{productData.name}</h2>
                    <h4>{productData.description}</h4>
                  </div>
                  <form action={action} method="POST">
                    <button role="link" id="submit" type="submit">
                      Buy {formatPrice(amount, currency)}
                    </button>
                  </form>
                </PriceBox>
              </section>
            )}

            {planType !== "lifetime" && (
              <section className="container">
                <h1>Confirm Syncronize subscription</h1>
                <PriceBox>
                  <div className=" flex-col align">
                    <h2>{productData.name}</h2>
                    <h3>{formatPrice(amount, currency)} per month</h3>
                    <h4>{productData.description}</h4>
                  </div>
                  <p>Key features</p>
                  <ul>
                    {features[0].features.map((feat) => {
                      return (
                        <li key={feat.id}>
                          <span className="material-symbols-outlined">check</span>
                          {feat.name}
                        </li>
                      );
                    })}
                  </ul>

                  <form action={recurringAction} method="POST">
                    <button role="link" id="submit" type="submit">
                      Get now
                    </button>
                  </form>
                </PriceBox>
              </section>
            )}
            <div> Select another plan</div>
          </div>
        </div>
      </CheckoutContainer>
      <WelcomeFooter />
    </>
  );
};

const CheckoutContainer = styled.div`
height: 84.5%;
  display: flex;
  justify-content: center;
  h1 {
    font-size: 2.2rem;
    font-weight: 800;
  }
  h2 {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
    color: var(--main-green);
  }
  h3 {
    margin: 0.5rem 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form {
    width: 100%;
    margin-top: 2rem;
  }
  button {
    width: 100%;
    border: none;
    background-color: var(--main-green);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 12px;
    font-size: 1.2rem;
  }
`;
const PriceNav = styled.nav`
  background-color: var(--black);
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  .logo {
    width: 14rem;
    padding-top: 2px;
  }
  .nav-link {
    text-decoration: none;
    align-self: center;
    padding: 0 1.5rem;
    color: var(--gray-text);
    font-size: 18px;
  }
  .link-wrapper {
    margin-left: 4rem;
  }

  .nav-button {
    padding: 0.7rem 2rem;
    font-size: 1rem;
    background-color: #06866e;
    border-radius: 25px;
    border: none;
    color: white;
  }

  .nav-signup {
    margin-left: auto;
    padding-right: 2rem;
  }

  .mobile {
    display: none;
  }
  ul {
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 2rem 1rem 2rem;
    .link-wrapper,
    .nav-signup {
      display: none;
    }
    .mobile {
      display: flex;
      margin-left: auto;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    .link-wrapper {
      margin-left: 1.5rem;
    }
    .nav-link {
      padding: 0 1rem;
    }
  }
`;

const UserIcon = styled.div`
  background-color: var(--main-green);
  border-radius: 50%;
  border: none;
  color: white;
  font-weight: 600;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  height: 40px;
  width: 40px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
const PriceBox = styled.div`
  border: 1px solid black;
  border-radius: 12px;
  padding: 1rem 2rem;
  max-width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 0;
  }
  h4 {
    margin-top: 10px;
    font-weight: 500;
  }
  h5 {
    margin-top: 0;
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  p {
    margin-top: 2rem;
    font-weight: 800;
    text-decoration: underline;
  }
`;
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
