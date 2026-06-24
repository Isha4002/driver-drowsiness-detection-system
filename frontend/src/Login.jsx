import { useState } from "react";
import axios from "axios";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import bgImage from "./assets/login-bg.png";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "username",
        username
      );

      setIsLoggedIn(true);

    } catch {

      setError(
        "Invalid Username or Password"
      );

    }

  };

  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-cover
      bg-center
      bg-no-repeat
    "
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >

      <div
        className="
        w-[450px]
        bg-white/90
        backdrop-blur-xl
        rounded-3xl
        shadow-2xl
        p-10
      "
      >

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="text-6xl mb-3">
            😴
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Driver Drowsiness
          </h1>

          <p className="text-slate-500 mt-1">
            Monitoring System
          </p>

        </div>

        {/* Username */}

        <div className="relative mb-4">

          <FaUser
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
            w-full
            pl-12
            pr-4
            py-3
            border
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          />

        </div>

        {/* Password */}

        <div className="relative mb-4">

          <FaLock
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
            w-full
            pl-12
            pr-12
            py-3
            border
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          >

            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}

          </button>

        </div>

        {/* Remember + Forgot */}

        <div className="flex justify-between items-center mb-6">

          <label className="flex items-center gap-2 text-sm text-slate-600">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(
                  !rememberMe
                )
              }
            />

            Remember Me

          </label>

          <button
            className="
            text-blue-600
            text-sm
            hover:underline
          "
          >
            Forgot Password?
          </button>

        </div>

        {/* Error */}

        {error && (

          <div
            className="
            bg-red-100
            text-red-600
            p-3
            rounded-xl
            mb-4
          "
          >
            {error}
          </div>

        )}

        {/* Login */}

        <button
          onClick={handleLogin}
          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          font-semibold
          transition
        "
        >
          Login
        </button>

        {/* Footer */}

        <p
          className="
          text-center
          text-slate-500
          text-sm
          mt-6
        "
        >
          AI Powered Driver Safety Platform
        </p>

      </div>

    </div>

  );

}

export default Login;