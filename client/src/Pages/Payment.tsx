import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: new (options: any) => any;
  }
}

const RazorpayButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkoutData } = location.state || {};
  const { userDetails, products, totalAmount } = checkoutData || {};
  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePayment = () => {
    if (!checkoutData) {
      alert('Missing checkout information. Please return to the previous page.');
      navigate('/checkout');
      return;
    }
    
    alert(
      "Terms & Conditions:\n\n" +
      "1. Once the order is placed, it cannot be cancelled or refunded.\n" +
      "2. Additional charges such as taxes, shipping, or handling may apply.\n" +
      "3. Please review your order details carefully before proceeding with payment.\n" +
      "4. By proceeding, you agree to our terms and conditions."
    );

    const options = {
      key: "rzp_test_1sDF18yyfXH6Av", // Replace with your actual test/live key
      amount: totalAmount * 100, // Amount in paisa
      currency: "INR",
      name: "Jewelry.com",
      description: "Jewelry Purchase",
      image: "Frame.png", // Optional: provide correct path if local
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay Using UPI",
              instruments: [{ method: "upi" }],
            },
            wallets: {
              name: "Pay Using Wallets",
              instruments: [{ method: "wallet" }],
            },
            cards: {
              name: "Pay Using Credit/Debit Card",
              instruments: [{ method: "card" }],
            },
            netbanking: {
              name: "Pay Using Net Banking",
              instruments: [{ method: "netbanking" }],
            },
          },
          sequence: ["block.upi", "block.wallets", "block.cards", "block.netbanking"],
          preferences: { show_default_blocks: true },
        },
      },
      handler: async function (response: any) {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;

        const orderPayload = {
          userDetails,
          products,
          totalAmount,
          paymentData: {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            user: user ? user._id : null,
            paymentMethod: response,
          },
        };

        try {
          const result = await axios.post('http://localhost:5000/api/orders/create', orderPayload);
          
          const orderId = result.data.orderId;
          alert(`Payment successful! Your Order ID is: ${orderId}`);
          navigate("/");

        } catch (error) {
          console.error('Failed to create order:', error);
          alert(`Payment was successful, but we failed to save your order. Please contact support with Payment ID: ${response.razorpay_payment_id}`);
          navigate("/");
        }
      },
      modal: {
        ondismiss: function () {
          if (window.confirm("Are you sure you want to close the payment window?")) {
            console.log("Payment form closed by user.");
          } else {
            console.log("Payment in progress.");
          }
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  React.useEffect(() => {
    loadRazorpayScript();
  }, []);

  return (
    <div>
      <div className='text-center' style={{ marginTop: "2rem" }}>
        <button
          onClick={handlePayment}
          className="btn btn-outline-dark btn-lg"
          style={{
            background: "#d4af37",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 2.5rem",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 2px 8px rgba(212, 175, 55, 0.15)",
            transition: "background 0.2s, color 0.2s",
            marginBottom: "1rem",
            cursor: "pointer",

          }}
          onMouseOver={e => (e.currentTarget.style.background = "#bfa145")}
          onMouseOut={e => (e.currentTarget.style.background = "#d4af37")}
        >
          <i className="fas fa-money-bill"></i> Proceed to Payment
        </button>
      </div>
      <div
        style={{
          marginTop: "1rem",
          background: "#f9f6ef",
          border: "1px solid #d4af37",
          borderRadius: "8px",
          padding: "1rem",
          color: "#333",
          fontSize: "1.05rem",
          textAlign: "center"
        }}
      >
        <p style={{ margin: 0 }}>
          Do you want to buy something more, in combo or in offers?
        </p>
      </div>
      <div style={{
        border: "2px dashed #d4af37",
        borderRadius: "12px",
        padding: "1.5rem",
        background: "#fffbe6",
        marginTop: "2rem",
        textAlign: "center"
      }}>
        <h3 style={{ color: "#bfa145", marginBottom: "0.5rem" }}>
          Combo Offers – Last Chance!
        </h3>
        <p style={{ color: "#333", fontSize: "1.1rem" }}>
          Our exclusive combo deals are ending soon. Don’t miss out on special prices for selected jewelry sets!
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
          <li>
            <strong>Gold Necklace + Earrings Set</strong> – <span style={{ color: "#bfa145" }}>₹7,999</span> <del>₹10,000</del>
          </li>
          <li>
            <strong>Silver Bracelet + Ring Combo</strong> – <span style={{ color: "#bfa145" }}>₹2,499</span> <del>₹3,200</del>
          </li>
          <li>
            <strong>Diamond Pendant + Studs</strong> – <span style={{ color: "#bfa145" }}>₹12,999</span> <del>₹16,000</del>
          </li>
        </ul>
        <button
          style={{
            background: "#bfa145",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.75rem 2rem",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem"
          }}
          onClick={() => alert("Combo offers coming soon! Stay tuned.")}
        >
          View Combo Offers
        </button>
        <div style={{ marginTop: "1rem", color: "#b22222", fontWeight: "bold" }}>
          Hurry! Sale ends in 2 days.
        </div>
      </div>
    </div>);
};

export default RazorpayButton;
