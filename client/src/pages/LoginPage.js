import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Login/UserContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function LoginPage() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/home");
    } else {
      setErrorMsg(result.message);
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
          className="absolute top-4 left-0 h-8 w-8 p-1 border border-white rounded-full hover:bg-zinc-600" 
          onClick={() => navigate('/login-landing')}
          type="button"
        >
          <ArrowLeftIcon className="text-white" />
        </button>

        <h1 className="text-3xl font-bold">Sign in to Pinecroft</h1>

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
        >
          Sign in
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
