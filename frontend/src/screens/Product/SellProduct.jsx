import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseLink } from "../../../utils/BaseApi";
import { UserContext } from "../../context/UserContext";

const SellProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const tokenResponse = await axios.get(
          "https://www.universal-tutorial.com/api/getaccesstoken",
          {
            headers: {
              "api-token": import.meta.env.VITE_STATE_API_TOKEN,
              "user-email": import.meta.env.VITE_STATE_API_EMAIL,
            },
          }
        );

        const token = tokenResponse.data.auth_token;

        const statesResponse = await axios.get(
          "https://www.universal-tutorial.com/api/states/India",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        setStates(statesResponse.data);
      } catch (error) {
        console.error("Error fetching states", error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    const tokenResponse = await axios.get(
      "https://www.universal-tutorial.com/api/getaccesstoken",
      {
        headers: {
          "api-token": import.meta.env.VITE_STATE_API_TOKEN,
          "user-email": import.meta.env.VITE_STATE_API_EMAIL,
        },
      }
    );

    const token = tokenResponse.data.auth_token;
    try {
      const response = await axios.get(
        `https://www.universal-tutorial.com/api/cities/${event.target.value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BaseLink}/product/add-product`, {
        name,
        price,
        image: imageUrl,
        location: {
          city: selectedCity,
          state: selectedState,
        },
        seller: user._id,
      });

      if (response.status === 201) {
        alert("Product created successfully!");
      }
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  return (
    <section className="flex flex-col mx-auto justify-center items-center h-[100vh] w-full bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Sell Your Product
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="sr-only">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="sr-only">
              State
            </label>
            <select
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              required
            >
              <option value="" disabled>
                Select state
              </option>
              {states.map((state) => (
                <option key={state} value={state.state_name}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className="sr-only">
              City
            </label>
            <select
              name="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              required
              disabled={!selectedState}
            >
              <option value="" disabled>
                Select city
              </option>
              {cities.map((city) => (
                <option key={city} value={city.city_name}>
                  {city.city_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="image" className="sr-only">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              required
            />
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="inline-block rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default SellProduct;
