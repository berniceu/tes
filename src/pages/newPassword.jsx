import React, {useState} from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ name, value, onChange, onBlur }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="password-input-container">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash size="20px"/> : <FaEye size="20px"/>}
        </button>
      </div>
    );
  };

const NewPassword = () => {

    const navigate = useNavigate();
  const location = useLocation();
  const { email, OTP } = location.state || {};

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePassword = (password) => {
    const rules = [
      {
        test: password.length >= 8,
        message: "Password must be at least 8 characters long",
      },
      {
        test: /[A-Z]/.test(password),
        message: "Password must contain at least one capital letter",
      },
      {
        test: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        message: "Password must contain at least one special character",
      },
      {
        test: /[0-9]/.test(password),
        message: "Password must contain at least one number",
      },
    ];

    for (let rule of rules) {
      if (!rule.test) return rule.message;
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.newPassword) {
      newErrors.newPassword = "Please fill in the new password field";
      isValid = false;
    } else {
      const passwordError = validatePassword(formData.newPassword);
      if (passwordError) {
        newErrors.newPassword = passwordError;
        isValid = false;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please fill in the confirm password field";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/confirm-reset/`, {
        code: OTP,
        email,
        new_password: formData.newPassword,
      });

      if (res.status === 200) {
        navigate("/login", {
          state: { message: "Password reset successful. Please log in." },
        });
      } else {
        setApiError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="font-outfit flex min-h-screen">
          <div className="flex flex-col justify-center items-center w-full bg-white p-8">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-bold text-primary mb-4">Create Password</h1>
              <p className="text-gray-500 mb-8">Create your new password</p>
              <form className="new-password-form" onSubmit={handleSubmit}>
            {["newPassword", "confirmPassword"].map((field) => (
              <div key={field}>
                <PasswordInput
                  type="password"
                  name={field}
                  placeholder={
                    field === "newPassword"
                      ? "New Password"
                      : "Confirm Password"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                />
                {isSubmitted && errors[field] && (
                  <div className="error-message">{errors[field]}</div>
                )}
              </div>
            ))}
            {isSubmitted && apiError && (
              <div className="error-message">{apiError}</div>
            )}
            <button type="submit" className="login-btn" disabled={loading}>
              Continue
            </button>
          </form>
    
              {errors && <div className="error">{errors}</div>}
    
              <div className="mt-4 flex flex-col gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-pink-100 text-primary font-bold px-4 py-3 rounded-lg hover:bg-pink-200"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default NewPassword;