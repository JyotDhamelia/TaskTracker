
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebaseconfig';
import { FcGoogle } from "react-icons/fc";
import Footer from './Footer';

const Main = () => {
  
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl py-28 sm:py-30 lg:py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            "Where goals become accomplishments." {''}
              <a href="https://github.com/JyotDhamelia/Task-Tracker" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Task Tracker 
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Stay on top of your tasks with TaskTracker. Simple, effective task management tool.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                  className="flex font-mono items-center justify-center gap-x-2 transition ease-out rounded-md bg-white px-3.5 py-2.5 text-sm text-black  outline-indigo-600 outline-2 shadow-sm hover:bg-white outline hover:outline-2 hover:outline-offset-1"
              onClick={handleSignIn}>
                <FcGoogle className='h-6 w-6'/>Sign in with Google
              </button>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default Main;
