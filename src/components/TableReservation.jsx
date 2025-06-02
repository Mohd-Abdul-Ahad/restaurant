import React from "react";
import { Link } from "react-router-dom";

const TableReservation = () => {
  const tables = [
    { id: 1, name: "Table 1", capacity: 2, status: "available" },
    { id: 2, name: "Table 2", capacity: 4, status: "available" },
    { id: 3, name: "Table 3", capacity: 6, status: "reserved" },
    { id: 4, name: "Table 4", capacity: 2, status: "available" },
    { id: 5, name: "Table 5", capacity: 8, status: "available" },
    { id: 6, name: "Private Booth", capacity: 4, status: "available" },
    { id: 7, name: "Chef's Counter", capacity: 2, status: "reserved" },
    { id: 8, name: "Garden Terrace", capacity: 6, status: "available" },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header Section */}
      <div className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-3xl font-serif font-light tracking-wider text-center">
            Table Reservations at ÉCLAT
          </h1>
          <div className="w-24 h-px bg-amber-400 mx-auto mt-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Restaurant Layout Visualization */}
        <div className="mb-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-serif font-light mb-6 text-gray-800">
            Our Dining Spaces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Restaurant interior"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-light mb-4 text-gray-800">
                Select Your Preferred Table
              </h3>
              <p className="text-gray-600 mb-6">
                Choose from our elegant dining spaces to reserve your perfect
                table. Our maître d' will ensure your dining experience is
                nothing short of exceptional.
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Available</span>
                <div className="w-4 h-4 bg-gray-400 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600">Reserved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${
                table.status === "available"
                  ? "border-amber-500"
                  : "border-gray-400"
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-light text-gray-800">
                    {table.name}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      table.status === "available"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {table.status === "available" ? "Available" : "Reserved"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Seats up to {table.capacity} guests
                </p>
                {table.status === "available" ? (
                  <Link
                    to="/confirmTable"
                    state={{ table: table.name }}
                    className="inline-block w-full text-center bg-black hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Reserve Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 px-4 py-2 rounded-md font-medium cursor-not-allowed"
                  >
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-serif font-light mb-4 text-gray-800">
            Reservation Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-medium text-gray-800">
                  Dining Duration
                </h3>
                <p className="text-gray-600 text-sm">
                  Reservations are held for 15 minutes past the booked time.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-medium text-gray-800">
                  Cancellation
                </h3>
                <p className="text-gray-600 text-sm">
                  24-hour notice required for cancellations.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-medium text-gray-800">
                  Payment
                </h3>
                <p className="text-gray-600 text-sm">
                  Credit card required to secure reservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-serif font-light mb-4">
            Need Special Arrangements?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Contact our reservations team for private dining, large parties, or
            special occasions.
          </p>
          <a
            href="tel:+912212345678"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
          >
            Call +91 22 1234 5678
          </a>
        </div>
      </div>
    </div>
  );
};

export default TableReservation;