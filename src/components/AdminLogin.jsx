import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = "http://localhost:3000/auth/admin";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Crucial for cookies
      });

      if (!response.ok) throw new Error(`Login failed: ${response.status}`);

      const json = await response.json();
      console.log(json);
      window.location.href = "/dashboard"; // Full page reload to ensure cookie is sent
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          className="border-2"
          placeholder="Email..."
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <input
          className="border-2"
          placeholder="password"
          {...register("password", { required: true })}
        />

        {errors.password && <span>This field is required</span>}

        <input className="border-2" type="submit" />
      </form>{" "}
    </div>
  );
};

export default AdminLogin;
