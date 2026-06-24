import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      setIsLoggedIn(true);

    } catch {

      setError(
        "Invalid Username or Password"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-8 rounded-2xl w-[400px] border border-slate-800">

        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Driver Dashboard Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded-xl bg-slate-800 text-white mb-4"
        />

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl text-white font-semibold"
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;