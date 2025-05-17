import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loder/Loder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) {
          console.error('User ID or Token is missing!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/v5/get-all-orders-admin', {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        });
        setAllOrders(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');

      await axios.put(`http://localhost:5000/api/v5/update-status/${orderId}`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId
          },
        }
      );

      setAllOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-4 text-zinc-100 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-semibold text-zinc-500 mb-6 text-center">All Orders</h1>

      {allOrders.length === 0 ? (
        <div className="h-[80vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-500 mb-4">No Orders Found</h1>
          <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" alt="No Orders" className="w-32 md:w-40" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-zinc-700 text-sm md:text-base">
            <thead>
              <tr className="bg-zinc-800 text-white">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Book</th>
                <th className="p-2 border hidden sm:table-cell">Description</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border hidden sm:table-cell">
                  <AccountCircleIcon />
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, i) => (
                <tr key={order._id} className="hover:bg-zinc-900">
                  <td className="p-2 border text-center">{i + 1}</td>
                  <td className="p-2 border">
                    {order.book ? (
                      <Link to={`/view-book-details/${order.book?._id}`} className="text-blue-300 hover:underline">
                        {order.book?.title || "No Title"}
                      </Link>
                    ) : "N/A"}
                  </td>
                  <td className="p-2 border hidden sm:table-cell">
                    {order.book?.desc ? order.book.desc.slice(0, 50) + "..." : "No description"}
                  </td>
                  <td className="p-2 border">{order.book?.price || "N/A"}</td>
                  <td className="p-2 border">
                    <select
                      className="bg-zinc-600 hover:bg-zinc-800 border p-1 rounded w-full"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    >
                      <option value="Order placed">Order placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="p-2 border hidden sm:table-cell">
                   {/* <p className="text-xs md:text-sm text-zinc-400">{order.user.email}</p>  */}
                    <p className="text-xs md:text-sm text-zinc-400">{order.user?.email || "Unknown User"}</p>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllOrders;



