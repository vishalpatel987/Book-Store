import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    url: "",
    title: "",
    author: "",
    desc: "",
    price: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v2/create-book",
        book,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            id: localStorage.getItem("id"),
          },
        }
      );

      alert("Book added successfully!");
      navigate("/all-books");
    } catch (error) {
      alert("Error adding book: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-center p-6">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="url"
            value={book.url}
            onChange={handleChange}
            placeholder="Book Image URL"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <textarea
            name="desc"
            value={book.desc}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            value={book.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="language"
            value={book.language}
            onChange={handleChange}
            placeholder="Language"
            className="w-full p-2 rounded bg-zinc-700 text-white border border-gray-600 focus:ring focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
