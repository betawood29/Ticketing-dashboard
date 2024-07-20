import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSubmit = (values) => {
    console.log('Login:', values);
  };

  const handleSignupSubmit = (values) => {
    console.log('Signup:', values);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {isLogin ? (
          <>
            <h2 className="text-2xl mb-4 text-center">Login</h2>
            <Login onSubmit={handleLoginSubmit} />
            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <button className="text-blue-500" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
            <SignUp onSubmit={handleSignupSubmit} />
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <button className="text-blue-500" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserAuth;