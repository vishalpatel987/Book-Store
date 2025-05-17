import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";

// Components & Pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import UserDetailPage from "./pages/UserDetailPage";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedId && storedToken && storedRole) {
      dispatch(authAction.login());
      dispatch(authAction.changeRole(storedRole));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/edit-book/:bookid" element={<EditBook />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<Profile />}>
          <Route index element={role === "user" ? <Favourites /> : <AllOrders />} />
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Setting />} />
          {role === "admin" && <Route path="add-book" element={<AddBook />} />}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
