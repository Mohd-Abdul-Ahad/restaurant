import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const ConfirmTable = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const table = location.state?.table || "Table 1";

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const tableNumber = parseInt(table.replace(/\D/g, "")) || 1;

    console.log("Submitting:", {
      ...data,
      tableNumber: tableNumber,
    });

    try {
      const response = await fetch("http://localhost:3000/auth/confirmTable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tableNumber: tableNumber,
        }),
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(text || "Invalid server response");
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error ${response.status}`);
      }

      alert(`Table ${tableNumber} reserved successfully!`);
      console.log("Reservation confirmed:", result);
    } catch (error) {
      console.error("Reservation failed:", error);
      alert(`Reservation failed: ${error.message}`);
    }
  };

  // Generate time slots from 12:00 PM to 11:55 PM in 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const displayHour = hour > 12 ? hour - 12 : hour;
        const period = hour >= 12 ? "PM" : "AM";
        const timeString = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        const value = `${hour}:${minute.toString().padStart(2, '0')}`;
        slots.push({ display: timeString, value });
      }
    }
    return slots;
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
            Complete Your Reservation
          </h1>
          <div className="w-24 h-px bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">
            You're reserving {table} at ÉCLAT
          </p>
        </div>

        {/* Reservation Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Table Display */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-serif font-medium text-gray-900 mb-4">
                  Your Selected Table
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h10M7 12h10M7 17h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{table}</p>
                      <p className="text-sm text-gray-500">
                        Premium dining experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-serif font-medium text-gray-900">
                  Personal Information
                </h3>

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your@email.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label
                    htmlFor="mobilenumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="mobilenumber"
                    type="tel"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.mobilenumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                    {...register("mobilenumber", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  {errors.mobilenumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.mobilenumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Reservation Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-serif font-medium text-gray-900">
                  Reservation Details
                </h3>

                {/* Time Selection */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Time *
                  </label>
                  <select
                    id="time"
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("time", { required: "Please select a time" })}
                  >
                    <option value="">Select a time</option>
                    {generateTimeSlots().map((slot, index) => (
                      <option key={index} value={slot.value}>
                        {slot.display}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.time.message}
                    </p>
                  )}
                </div>

                {/* Special Requests */}
                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Special Requests (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Dietary restrictions, celebrations, etc."
                    {...register("specialRequests")}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-amber-600 text-white px-6 py-4 rounded-md font-medium transition-colors duration-300 uppercase tracking-wider"
                >
                  Confirm Reservation
                </button>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500">
                By completing this reservation, you agree to ÉCLAT's reservation
                policy. We'll contact you to confirm your booking.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTable;