// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loder from "../Loder/Loder"
// import { Link } from 'react-router-dom';

// function UserOrderHistory() {
//   const [OrderHistory, setOrderHistory] = useState(); 
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('id');
//         if (!token || !userId) {
//           console.error('User ID or Token is missing!');
//           return;
//         }
//         const response = await axios.get('http://localhost:5000/api/v5/get-order-history', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             id: userId,
//           },
//         });
//         setOrderHistory(response.data.data);
//       } catch (error) {
//         console.error('Error fetching favorite books:', error);
//       }
//     };
//     fetchFavorites();
//   }, []);
//   return (
//    <>
//     {!OrderHistory && (
//       <div className='flex items-center justify-center h-[100%]'>
//         <Loder/>
//       </div>
//     )}
//     {setOrderHistory && setOrderHistory.length === 0 && (
//       <div className='h-[80vh] p-4 text-zinc-100'>
//         <div className='h-[100%] flex flex-col items-center justify-center'>
//           <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
//             No Order History
//           </h1>
//           <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" alt="" />
//         </div>
//       </div>
//     )}
//     {OrderHistory && OrderHistory.length > 0 && (
//       <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
//         <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
//           Your Order History
//         </h1>
//         <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
//           <div className='w-[3%]'>
//             <h1 className='text-center'>Sr.</h1>
//           </div>
//           <div className='w-[22%]'>
//             <h1 className=''>Books</h1>
//           </div>
//           <div className='w-[45%]'>
//             <h1 className=''>Description</h1>
//           </div>
//           <div className='w-[9%]'>
//             <h1 className=''>Price</h1>
//           </div>
//           <div className='w-[16%]'>
//             <h1 className=''>Status</h1>
//           </div>
//           <div className='max-w-none md:w-[5%] hidden md:block'>
//             <h1 className=''>Mode</h1>
//           </div>
//         </div>
//         {OrderHistory.map((item, i)=>(
//           <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
//             <div className='w-[3%]'>
//               <h1 className='text-center'>{i+1}</h1>
//             </div>
//             <div className='w-[22%]'>
//               <Link to = {`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
//                {item.book.title}
//               </Link>
//             </div>
//             <div className='w-[45%]'>
//               <h1 className=''>{item.book.desc.slice(0,50)} ...</h1>
//             </div>
//             <div className='w-[9%]'>
//               <h1 className=''>{item.book.price}</h1>
//             </div>
//             <div className='w-[16%]'>
//               <h1 className='font-semibold text-green-500'>
//                 {item.status === "Order placed" ? (<div className='text-yellow-500'>{item.status}</div>):
//                   item.status === "Canceled" ? (
//                     <div className='text-red-500'>
//                       {item.status}
//                     </div>
//                   ): (
//                     item.status
//                   )}
//               </h1>
//             </div>
//             <div className='w-none md:w-[5%] hidden md:block'>
//               <h1 className='text-sm text-zinc-400'>COD</h1>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//    </>
//   );
// }

// export default UserOrderHistory




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loder from "../Loder/Loder";
import { Link } from 'react-router-dom';

function UserOrderHistory() {
  const [OrderHistory, setOrderHistory] = useState();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');

        if (!token || !userId) {
          console.error('User ID or Token is missing!');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/v5/get-order-history', {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        });

        setOrderHistory(response.data.data);

      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className='flex items-center justify-center h-[100%]'>
          <Loder />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              No Order History
            </h1>
            <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" alt="" />
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>

          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'><h1 className='text-center'>Sr.</h1></div>
            <div className='w-[22%]'><h1>Books</h1></div>
            <div className='w-[45%]'><h1>Description</h1></div>
            <div className='w-[9%]'><h1>Price</h1></div>
            <div className='w-[16%]'><h1>Status</h1></div>
            <div className='max-w-none md:w-[5%] hidden md:block'><h1>Mode</h1></div>
          </div>

          {OrderHistory.map((item, i) => (
            <div key={item._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>

              <div className='w-[22%]'>
                <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                  {item.book.title}
                </Link>
              </div>

              <div className='w-[45%]'>
                <h1>{item.book.desc.slice(0, 50)} ...</h1>
              </div>

              <div className='w-[9%]'>
                <h1>{item.book.price}</h1>
              </div>

              <div className='w-[16%]'>
                <h1 className='font-semibold'>
                  {item.status === "Order Placed" ? (
                    <span className='text-yellow-500'>{item.status}</span>
                  ) : item.status === "Canceled" ? (
                    <span className='text-red-500'>{item.status}</span>
                  ) : (
                    <span className='text-green-500'>{item.status}</span>
                  )}
                </h1>
              </div>

              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className={`text-sm ${item.paymentMode === "COD" ? 'text-green-400' : 'text-blue-400'}`}>
                  {item.paymentMode}
                </h1>
              </div>
            </div>
          ))}

        </div>
      )}
    </>
  );
}

export default UserOrderHistory;
