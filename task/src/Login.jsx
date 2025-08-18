import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css"; // 

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(isLogin ? "Login Data:" : "Signup Data:", data);
    reset();
  };

  return (
    <div className="form-container">
      
      <div className="tabs">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Log In
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
       
        <label>Email</label>
        <input
          type="email"
          placeholder="example@mail.com"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
 
       
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters required" },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

       
        {!isLogin && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (v) => v === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </>
        )}

        {isLogin && (
          <div className="options">
            {/* <label>
              <input type="checkbox" {...register("remember")} /> Remember 
            </label> */}
            <a href="#" className="forgot">
              Forgot Password?
            </a>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? "Login Now" : "Sign Up Now"}
        </button>
      </form>
    </div>
  );
}

export default App;
