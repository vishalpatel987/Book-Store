import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loder/Loder"; // Ensure the correct import path
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewBookDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const role = useSelector((state) => state.auth?.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v2/get-book-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
    fetchData();
  }, [id]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    id: localStorage.getItem("id"),
    bookId: id,
  };
console.log(headers.bookId)
  const onClickFavorite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v3/add-book-to-favorite",
        {},
        { headers }
      );
      alert(response.data.message || "Book added to favorites!");
    } catch (error) {
      alert("Error adding to favorites: " + error.response?.data?.message || error.message);
    }
  };

  const onClickCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v4/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message || "Book added to cart!");
    } catch (error) {
      alert("Error adding to cart: " + error.response?.data?.message || error.message);
    }
  };

  const deleteBook = async () => {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/v2/delete-book/${id}`,
            { headers }
        );
        alert(response.data.message || "Book deleted successfully!");
        navigate("/all-books");
    } catch (error) {
        alert("Error deleting book: " + (error.response?.data?.message || error.message));
    }
};



  if (!data) {
    return (
      <div className="px-6 py-8 bg-zinc-900 flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 min-h-screen">
      {/* Book Image Section */}
      <div className="relative bg-zinc-800 rounded p-4 w-full md:w-1/2 flex items-center justify-center">
        <img
          src={data?.url || "/placeholder.jpg"}
          alt={data?.title || "Book Cover"}
          className="h-80 md:h-[50vh] lg:h-[75vh] rounded object-cover w-full max-w-xs sm:max-w-md"
        />

        {/* Favorite & Cart Buttons for Users */}
        {isLoggedIn && role === "user" && (
          <div className="absolute top-10 right-10 flex flex-col gap-7">
            <button
              onClick={onClickFavorite}
              className="bg-white rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-200 transition"
            >
              <FavoriteIcon className="text-red-500 text-xl md:text-2xl" />
            </button>
            <button
              onClick={onClickCart}
              className="bg-white rounded-full cursor-pointer p-2 shadow-md hover:bg-gray-200 transition"
            >
              <ShoppingCartIcon className="text-black text-xl md:text-2xl" />
            </button>
          </div>
        )}

        {/* Edit & Delete Buttons for Admins */}
        {isLoggedIn && role === "admin" && (
          <div className="absolute top-10 right-10 flex flex-col gap-7">
            <Link
              to={`/edit-book/${id}`}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
            >
              <ModeEditIcon className="text-blue-500 text-xl md:text-2xl" />
            </Link>
            <button
              onClick={deleteBook}
              className="bg-white rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-200 transition"
            >
              <DeleteIcon className="text-black text-xl md:text-2xl" />
            </button>
          </div>
        )}
      </div>

      {/* Book Details Section */}
      <div className="p-4 w-full md:w-1/2 text-white">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-zinc-300 font-semibold">
          {data?.title || "Book Title"}
        </h1>
        <p className="text-zinc-400 mt-1 text-lg">By {data?.author || "Unknown Author"}</p>
        <p className="text-zinc-500 mt-4 text-base md:text-lg">
          {data?.desc || "No description available."}
        </p>

        {/* Language Section */}
        {data?.language && (
          <p className="flex mt-4 items-center gap-2 text-zinc-400">
            <LanguageIcon />
            {data.language}
          </p>
        )}

        {/* Price Section */}
        {data?.price && (
          <p className="mt-4 text-lg font-semibold text-zinc-300">
            Price: ₹ {data.price}
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewBookDetails;
