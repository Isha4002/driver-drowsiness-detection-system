import { useState } from "react";
import axios from "axios";

function Register({ setShowRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {

    if (!username || !password || !confirmPassword) {

      alert("Please fill all fields");
      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");
      return;

    }

    try {

      await axios.post(
        "http://driver-drowsiness-backends.onrender.com/register",
        {
          username,
          password
        }
      );

      alert("Registration Successful");

      setShowRegister(false);

    }

    catch (err) {

  console.log(err);

  console.log(err.response);

  console.log(err.response?.data);

  alert(
    err.response?.data?.error || err.message
  );

}

  };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('/login-bg.jpg')"
      }}
    >

      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-[420px]">

        <div className="text-center">

          <div className="text-6xl mb-3">
            🚗
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Driver Drowsiness Monitoring System
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={register}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

        </div>

        <p className="text-center mt-6 text-slate-600">

          Already have an account?

          <button
            onClick={() =>
              setShowRegister(false)
            }
            className="text-blue-600 ml-2 font-semibold"
          >
            Login
          </button>

        </p>

      </div>

    </div>

  );

}

export default Register;