import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const categories = ["Starter", "Main menu", "Dessert", "Drinks"];

const Dashboard = () => {
  const [isAddScreenEnable, setIsAddScreenEnable] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items");
        const data = await res.json();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addScreen = () => {
    setIsAddScreenEnable(true);
  };

  const closeAddScreen = () => {
    setIsAddScreenEnable(false);
    reset();
    setImage(null);
    setSelectedFile(null);
    setSubmitError(null);
  };

  const removeItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        setDishes((prev) => prev.filter((dish) => dish._id !== id));
      } else {
        console.error("Failed to delete:", result.error);
      }
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append("dishname", data.dishname);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    if (selectedFile) {
      formData.append("image", selectedFile);
    } else {
      setSubmitError("Please select an image");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add dish");
      }

      const result = await res.json();
      setDishes([...dishes, result]);
      closeAddScreen();
    } catch (error) {
      console.error("Error uploading item:", error);
      setSubmitError(
        error.message || "An error occurred while adding the dish"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.dishname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Restaurant Dashboard
          </h1>
          <p className="text-gray-600">Manage your menu items</p>
        </header>

        {/* Search and Add Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search for dishes..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <button
            onClick={addScreen}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
            Table Reservation
          </button>
          <button
            onClick={addScreen}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Dish
          </button>
        </div>

        {/* Dishes Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`http://localhost:3000/uploads/${dish.image}`}
                    alt={dish.dishname}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => removeItem(dish._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                      title="Remove dish"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="font-bold text-lg text-gray-800">
                      {dish.dishname}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {dish.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {dish.description}
                  </p>
                  <p className="text-gray-900 font-bold mt-2">₹{dish.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Dish Modal */}
        {isAddScreenEnable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add New Dish
                </h3>
                <button
                  onClick={closeAddScreen}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                {submitError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {submitError}
                  </div>
                )}

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dish Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {image ? (
                      <img
                        src={image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="image-upload"
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {image ? "Change Image" : "Upload Image"}
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="mb-4">
                  <label
                    htmlFor="dishname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Dish Name
                  </label>
                  <input
                    type="text"
                    id="dishname"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dishname ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter dish name"
                    {...register("dishname", {
                      required: "Dish name is required",
                    })}
                  />
                  {errors.dishname && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dishname.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="price"
                      className={`w-full pl-8 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter price"
                      {...register("price", { required: "Price is required" })}
                    />
                  </div>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeAddScreen}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      "Add Dish"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
