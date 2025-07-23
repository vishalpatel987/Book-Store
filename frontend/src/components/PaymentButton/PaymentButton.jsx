// import React from 'react';

// function PaymentButton({ amount }) {
//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_AiNgPXDD53xfH5", // 🔴 apna key id yaha dalna
//       amount: amount * 100, // paisa me
//       currency: "INR",
//       name: "Book Store",
//       description: "Book Purchase",
//       image: "https://yourlogo.url/logo.png",
//       handler: function (response) {
//         alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//         // yaha payment success hone ke baad jo karna hai wo likh
//       },
//       prefill: {
//         name: "Vishal Patel",
//         email: "vishalpatel581012@example.com",
//         contact: "7724817688"
//       },
//       theme: {
//         color: "#3399cc"
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//     >
//       Pay ₹{amount}
//     </button>
//   );
// }

// export default PaymentButton;



import React from 'react';
import axios from 'axios';

function PaymentButton({ amount }) {
  const handlePayment = () => {
    const options = {
      key: "rzp_test_AiNgPXDD53xfH5",
      amount: amount * 100,
      currency: "INR",
      name: "Book Store",
      description: "Book Purchase",
      image: "https://yourlogo.url/logo.png",
      handler: async function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

        try {
          const userId = localStorage.getItem("id");
          const authToken = localStorage.getItem("token");

          const cartResponse = await axios.get("http://localhost:5000/api/v4/get-all-cart", {
            headers: {
              Authorization: `Bearer ${authToken}`,
              id: userId,
            },
          });

          const cartData = cartResponse.data.data || [];
          const bookIds = cartData.map((item) => item._id);

          if (bookIds.length === 0) {
            alert("Cart is empty.");
            return;
          }

          // ✅ Order API call with paymentMode: "Online"
          const orderResponse = await axios.post(
            "http://localhost:5000/api/v5/order-book",
            { bookIds, paymentMode: "Online" },  // 👈 yaha add kiya
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                id: userId,
              },
            }
          );

          alert(orderResponse.data.message);

        } catch (error) {
          console.error("Error placing order after payment:", error);
          alert("Order failed after payment.");
        }
      },
      prefill: {
        name: "Vishal Patel",
        email: "vishalpatel581012@example.com",
        contact: "7724817688"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Pay ₹{amount}
    </button>
  );
}

export default PaymentButton;
