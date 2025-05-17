import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loder from '../components/Loder/Loder'
import BookCard from '../components/Bookcard/BookCard';

function AllBooks() {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/v2/all-books")
      setData(response.data.book);
    }
    fetchData();
  }, [])

  return (
    <div className=' px-12 py-8 bg-zinc-900 h-screen'>
        {" "}
        <h4 className='text-3xl text-yellow-100'>All books</h4>
        {!Data && <div className='flex items-center justify-center my-8'><Loder /></div>}
        <div className='py-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {Data && Data.map((items, i) =>
            <div key={i}>
              <BookCard data={items} />
            </div>)}
        </div>
      </div>
      )
}

      export default AllBooks