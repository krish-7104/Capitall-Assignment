import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BaseLink } from "../../utils/BaseApi";
import ListedCard from "../components/ListedCard";
import PurchasedCard from "../components/PurchaseCard";
import Loader from "../components/Loader"; // Import the Loader component

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [listedProducts, setListedProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${BaseLink}/auth/user-details/${user?._id}`
        );
        if (response.data.success) {
          const { name, email, listedProducts, purchasedProducts } =
            response.data.data;
          setUserDetails({ name, email });
          setListedProducts(listedProducts);
          setPurchasedProducts(purchasedProducts);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    if (user?._id) {
      getUser();
    } else {
      setLoading(false); // Set loading to false if there's no user
    }
  }, [user?._id]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BaseLink}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <Loader />; // Display loader while loading
  }

  return (
    <section className="w-full max-w-6xl mx-auto mt-20 mb-10">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Account</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {userDetails && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-2">User Details</h2>
            <p className="text-lg">
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userDetails.email}
            </p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Listed Products</h2>
          {listedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listedProducts.map((product) => (
                <ListedCard
                  key={product._id}
                  id={product._id}
                  name={product.title}
                  price={product.price}
                  imageUrl={product.image}
                  location={product.location}
                  time={product.createdAt}
                />
              ))}
            </div>
          ) : (
            <p>No listed products found.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Purchased Products</h2>
          {purchasedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchasedProducts.map((product) => (
                <PurchasedCard
                  key={product._id}
                  id={product._id}
                  name={product.title}
                  price={product.price}
                  imageUrl={product.image}
                  location={product.location}
                  time={product.soldAt}
                  sellerName={product.seller.name}
                />
              ))}
            </div>
          ) : (
            <p>No purchased products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
