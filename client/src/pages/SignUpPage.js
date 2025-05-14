import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        email,
        username,
        password,
      });

      navigate("/login");
    } catch (err) {
      setErrorMsg("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="text-white relative text-center max-w-md px-6 space-y-6"
      >
        {/* Back Button */}
        <button 
          className="absolute left-0 top-4 h-8 w-8 p-1 border border-white rounded-full hover:bg-zinc-600" 
          onClick={() => navigate('/login-landing')}
          type="button"
        >
          <ArrowLeftIcon className="text-white" />
        </button>
        <h1 className="text-3xl font-bold">Create your account</h1>
        
        <input
          type="text"
          placeholder="Email"
          className="w-full bg-zinc-800 p-3 rounded-lg text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-zinc-800 p-3 rounded-lg text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-zinc-800 p-3 rounded-lg text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-full text-white font-semibold"
          onClick={() => navigate("/login")}
        >
          Sign up
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>

      </form>
    </div>
  );
}

export default SignupPage;
