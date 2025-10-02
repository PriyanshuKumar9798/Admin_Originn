import React, { useState } from "react";

const FIXED_EMAIL = "admin@originn.com";
const FIXED_PASSWORD = "Jeet123@";

const Login = ({ onLoginSuccess } = {}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email) return "Please enter email.";
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Enter a valid email address.";
    if (!password) return "Please enter password.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const vErr = validate();
    if (vErr) {
      setError(vErr);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
        setSuccess(true);
        setError("");
        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        } else {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 700);
        }
      } else {
        setError("Invalid email or password. Use the demo credentials below.");
      }
    }, 600);
  };

  const fillDemo = () => {
    setEmail(FIXED_EMAIL);
    setPassword(FIXED_PASSWORD);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6efe6] to-[#efe1c8] p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#6c3e26]">Originn Admin Panel</h1>
          <p className="text-sm text-gray-600 mt-1">Sign in to manage your dashboard</p>
        </div>

        {success ? (
          <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-700 text-center font-medium">
            Login successful — redirecting...
          </div>
        ) : (
          <>
            {error && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 mb-4 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6c3e26] transition"
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6c3e26] transition"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-600">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-xl text-white font-semibold shadow-sm transition ${
                  loading ? "bg-[#a98a73] opacity-80" : "bg-[#6c3e26] hover:bg-[#8b5c3c]"
                }`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-600">
              Demo credentials — <span className="font-medium">{FIXED_EMAIL}</span> / <span className="font-medium">{FIXED_PASSWORD}</span>
              <button
                onClick={fillDemo}
                className="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
              >
                Fill Demo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
