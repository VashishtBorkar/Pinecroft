import React from "react";
import { useNavigate } from "react-router-dom";

function LoginLandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-center max-w-md px-6">
        <div className="w-full flex justify-center mb-10">
          <h1 className="text-9xl font-bold text-white">Pinecroft</h1>
        </div>

        <div className="flex justify-center items-center">
          <span className="text-4xl font-extrabold mb-2">Where ideas take </span>
          <span className="text-4xl font-extrabold mb-2 ml-1.5 text-green-600"> root </span>
        </div>
        
        <p className="text-xl font-semibold mb-8">Join today.</p>

        <div className="space-y-4">
          <button className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200">
            <img src="/google-icon.svg" alt="" className="inline-block w-5 mr-2" />
            Sign up with Google
          </button>
          <button className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200">
            <img src="/apple-icon.svg" alt="" className="inline-block w-5 mr-2" />
            Sign up with Apple
          </button>

          <div className="flex items-center gap-2 my-2">
            <hr className="flex-grow border-zinc-700" />
            <span className="text-gray-500">or</span>
            <hr className="flex-grow border-zinc-700" />
          </div>

          <button 
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          By signing up, you agree to the{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          , including{" "}
          <a href="#" className="underline">
            Cookie Use
          </a>
          .
        </p>

        <div className="mt-10">
          <p className="text-gray-500 mb-2">Already have an account?</p>
          <button 
            className="w-full py-3 border border-white text-white rounded-full hover:bg-white hover:text-black"
            onClick={() => navigate("/login")}  
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginLandingPage;
