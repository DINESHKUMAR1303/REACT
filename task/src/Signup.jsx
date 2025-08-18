import React from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters required" },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
