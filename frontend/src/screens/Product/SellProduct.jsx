import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BaseLink } from "../../../utils/BaseApi";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const SellProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    status: "unsold",
    imageUrl: "",
    selectedState: "",
    selectedCity: "",
    postalCode: "",
    states: [],
    cities: [],
  });
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
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

        setFormData((prevFormData) => ({
          ...prevFormData,
          states: statesResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching states", error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (event) => {
    const state = event.target.value;
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
        `https://www.universal-tutorial.com/api/cities/${state}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedState: state,
        cities: response.data,
        selectedCity: "",
      }));
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    toast.loading("Submitting your product...");
    try {
      const response = await axios.post(`${BaseLink}/product/add-product`, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        status: formData.status,
        image: formData.imageUrl,
        location: {
          city: formData.selectedCity,
          state: formData.selectedState,
          postalCode: formData.postalCode,
        },
        seller: user._id,
      });

      if (response.status === 201) {
        toast.dismiss();
        toast.success("Product created successfully!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating product");
      console.error("Error creating product", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formDataObj = new FormData();
    formDataObj.append("file", file);
    formDataObj.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    formDataObj.append("folder", "OLX-Capitall");
    try {
      toast.loading("Uploading image...");
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formDataObj
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl: response.data.secure_url,
      }));
      setImageUploaded(true);
      toast.dismiss();
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Error uploading image to Cloudinary");
      console.error("Error uploading image to Cloudinary", error);
    }
  };

  return (
    <section className="flex flex-col mx-auto justify-center items-center py-10 w-full bg-white">
      <div className="w-full px-4 mt-14">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Sell Your Product
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-2xl grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold">Product Information</h2>
          </div>

          <div>
            <label htmlFor="title" className="sr-only">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter product title"
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
              value={formData.price}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="image" className="sr-only">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              required
            />
            {formData.imageUrl && (
              <div className="mt-4">
                <img
                  src={formData.imageUrl}
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold">Address Information</h2>
          </div>

          <div>
            <label htmlFor="selectedState" className="sr-only">
              State
            </label>
            <select
              name="selectedState"
              value={formData.selectedState}
              onChange={handleStateChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              required
            >
              <option value="" disabled>
                Select state
              </option>
              {formData.states.map((state) => (
                <option key={state.state_name} value={state.state_name}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="selectedCity" className="sr-only">
              City
            </label>
            <select
              name="selectedCity"
              value={formData.selectedCity}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              required
              disabled={!formData.selectedState}
            >
              <option value="" disabled>
                Select city
              </option>
              {formData.cities.map((city) => (
                <option key={city.city_name} value={city.city_name}>
                  {city.city_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label htmlFor="postalCode" className="sr-only">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 border focus:outline-violet-700 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter postal code"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className={`w-full rounded-lg bg-violet-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                !imageUploaded ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!imageUploaded || loading}
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellProduct;
