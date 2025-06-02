import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = "http://localhost:3000/auth/signup";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      alert("Account created successfully! Welcome to ÉCLAT.");
    } catch (error) {
      console.error(error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
            Join ÉCLAT
          </h1>
          <div className="w-24 h-px bg-amber-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">
            Create your account to access exclusive benefits
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password *
                </label>
                <input
                  id="password"
                  type="password"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              {/* <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div> */}

              {/* Full Name Field */}
              {/* <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your full name"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div> */}

              {/* Phone Number Field */}
              {/* <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div> */}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 uppercase tracking-wider"
                >
                  Create Account
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Sign in
                </Link>
              </div>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500">
                By creating an account, you agree to ÉCLAT's{" "}
                <a href="#" className="text-amber-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-amber-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
