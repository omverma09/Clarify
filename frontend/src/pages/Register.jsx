import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        username,
        email,
        password,
      });

      // Success message
      alert(res.data.message || "OTP sent to email");

      // Clear form (optional)
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      // 👉 Navigate to OTP screen, NOT login
      navigate("/clarify/verify-otp", {
        state: {
          tempId: res.data.tempId,
          email: email,
        },
      });

    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 form">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an account
        </h2>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Register {loading ? <CircularProgress size={24} /> : "Send OTP"}
          </button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "10px",
              borderColor: "#bdbcbc",
              color: "#000",
              height: 48,
              display: "flex",
              gap: 1,
              "&:hover": {
                borderColor: "#5e5d5d",
                backgroundColor: "#fafafa",
              },
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
            Sign Up with Google
          </Button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/clarify/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;  
