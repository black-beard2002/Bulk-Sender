import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import PasswordResetPopup from "../../components/PasswordResetPopup";

const SignIn: React.FC = () => {
  // Moved the hook to the top level
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password);
  };
  const handlePasswordReset = async (email, newPassword) => {
    // Handle the password reset logic here
    console.log("Resetting password for:", email);
    try {
      // Make API call to reset password
      await resetPassword(email, newPassword);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex w-full h-full justify-center bg-[url('https://wallpapercave.com/wp/wp10117165.png')] items-center bg-cover bg-center">
      <PasswordResetPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handlePasswordReset}
      />
      <div className="flex p-1 w-96">
        <div className="max-w-lg w-full">
          <form
            style={{
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
            onSubmit={handleSignIn}
          >
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-white">
                Welcome Back
              </h2>
              <p className="mt-4 text-center text-gray-400">
                Sign in to continue
              </p>

              <div className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email address
                    </label>
                    <input
                      placeholder="Email address"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required
                      autoComplete="email"
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="password">
                      Password
                    </label>
                    <input
                      placeholder="Password"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required
                      autoComplete="current-password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                    />
                    <label
                      className="ml-2 block text-sm text-gray-400"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      className="font-medium text-indigo-500 hover:text-indigo-400"
                      href="#"
                      onClick={() => setIsOpen(true)}
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
            <div className="px-8 py-4 bg-gray-700 text-center flex flex-wrap gap-2 justify-center items-center">
              <span className="text-gray-400">Don't have an account?</span>
              <a
                className="font-medium text-indigo-500 hover:text-indigo-400"
                href="/signup"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
