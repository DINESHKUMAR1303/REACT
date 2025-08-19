import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container">
      {/* Left Image Section */}
      <div className="image-section">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413"
          alt="Creative"
        />
        <div className="caption">Capturing Moments, Creating Memories</div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-box">
          <h2>Create an account</h2>
          <p>
            Already have an account? <a href="#">Log in</a>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-row">
              <input
                type="text"
                placeholder="First name"
                {...register("firstName", { required: "First name is required" })}
              />
              <input
                type="text"
                placeholder="Last name"
                {...register("lastName", { required: "Last name is required" })}
              />
            </div>
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            <div className="input-row">
              <input
                type="date"
                {...register("dob", { required: "Date of birth is required" })}
              />
              <select {...register("gender", { required: "Gender is required" })}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {errors.dob && <p className="error">{errors.dob.message}</p>}
            {errors.gender && <p className="error">{errors.gender.message}</p>}

            <select {...register("country", { required: "Country is required" })}>
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </select>
            {errors.country && <p className="error">{errors.country.message}</p>}

            <input type="file" {...register("file")} />

            <button type="submit" className="btn">
              Create account
            </button>
          </form>

          {/* Terms Section (unchanged alignment) */}
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <div className="divider">Or register with</div>
          <div className="social-buttons">
            <button className="google-btn">Google</button>
            <button className="apple-btn">Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
