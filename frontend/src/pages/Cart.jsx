// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PaymentButton from "../components/PaymentButton/PaymentButton";


// function Cart() {
//   const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const userId = localStorage.getItem("id");
//   const authToken = localStorage.getItem("token");
//   const [paymentMode, setPaymentMode] = useState("COD");


//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/v4/get-all-cart", {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             id: userId,
//           },
//         });

//         const cartData = response.data.data || [];
//         setCart(cartData);
//         calculateTotal(cartData);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//     };

//     fetchCart();
//   }, [authToken, userId]);

//   const calculateTotal = (cartItems) => {
//     const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
//     setTotalPrice(total);
//   };

//   const handleRemove = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/v4/delete-from-cart/${id}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           id: userId,
//         },
//       });

//       alert(response.data.message);
//       const updatedCart = cart.filter((item) => item._id !== id);
//       setCart(updatedCart);
//       calculateTotal(updatedCart);
//     } catch (error) {
//       console.error("Error removing item:", error);
//       alert("An error occurred, try again.");
//     }
//   };

//   const handleOrder = async () => {
//     try {
//       if (cart.length === 0) {
//         alert("Your cart is empty.");
//         return;
//       }

//       const bookIds = cart.map((item) => item._id);

//       const response = await axios.post(
//         "http://localhost:5000/api/v5/order-book",
//         { bookIds },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             id: userId,
//           },
//         }
//       );

//       alert(response.data.message);
//       setCart([]);
//       setTotalPrice(0);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("An error occurred, try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-6 bg-zinc-900">
//       <h4 className="text-3xl text-yellow-100 font-semibold mb-4">Your Cart</h4>

//       {!cart.length ? (
//         <div className="flex items-center justify-center my-8 text-yellow-100">
//           No items in the cart.
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center md:justify-between bg-zinc-800 p-3 rounded-lg shadow-md"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.url}
//                   alt={item.title}
//                   className="h-[120px] w-[90px] object-cover rounded-md"
//                 />
//                 <div>
//                   <h2 className="text-lg text-yellow-100 font-semibold">{item.title}</h2>
//                   <p className="text-yellow-300 text-sm">by {item.author}</p>
//                   <p className="text-yellow-500 text-md font-bold">₹ {item.price}</p>
//                 </div>
//               </div>
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mt-2 md:mt-0"
//                 onClick={() => handleRemove(item._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {cart.length > 0 && (
//         <div className="mt-6 p-4 bg-zinc-800 rounded-lg text-yellow-100 flex justify-between items-center">
//           <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//             onClick={handleOrder}
//           >
//             Order Now
//           </button>
//            <PaymentButton amount={totalPrice} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;



import React, { useState, useEffect } from "react";
import axios from "axios";
import PaymentButton from "../components/PaymentButton/PaymentButton";

function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem("id");
  const authToken = localStorage.getItem("token");
  const [paymentMode, setPaymentMode] = useState("COD");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v4/get-all-cart", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            id: userId,
          },
        });

        const cartData = response.data.data || [];
        setCart(cartData);
        calculateTotal(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [authToken, userId]);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
    setTotalPrice(total);
  };

  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v4/delete-from-cart/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          id: userId,
        },
      });

      alert(response.data.message);
      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);
      calculateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
      alert("An error occurred, try again.");
    }
  };

  const handleOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const bookIds = cart.map((item) => item._id);

      const response = await axios.post(
        "http://localhost:5000/api/v5/order-book",
        { bookIds },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            id: userId,
          },
        }
      );

      alert(response.data.message);
      setCart([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred, try again.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-6 bg-zinc-900">
      <h4 className="text-3xl text-yellow-100 font-semibold mb-4">Your Cart</h4>

      {!cart.length ? (
        <div className="flex items-center justify-center my-8 text-yellow-100">
          No items in the cart.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center md:justify-between bg-zinc-800 p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-[120px] w-[90px] object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg text-yellow-100 font-semibold">{item.title}</h2>
                  <p className="text-yellow-300 text-sm">by {item.author}</p>
                  <p className="text-yellow-500 text-md font-bold">₹ {item.price}</p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mt-2 md:mt-0"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <>
          {/* Payment Mode Selection */}
          <div className="mt-6 p-4 bg-zinc-800 rounded-lg  text-yellow-100">
            <label className="block mb-2 font-semibold">Select Payment Mode:</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="text-white px-2 py-1 rounded"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          {/* Price and Button Section */}
          <div className="mt-6 p-4 bg-zinc-800 rounded-lg text-yellow-100 flex justify-between items-center">
            <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>
            {paymentMode === "COD" ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={handleOrder}
              >
                Order Now (COD)
              </button>
            ) : (
              <PaymentButton amount={totalPrice} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

