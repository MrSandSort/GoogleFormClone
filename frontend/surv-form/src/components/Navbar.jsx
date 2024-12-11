import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center">
            <h1 className="text-white font-bold text-lg">Survey App</h1>
          </div>

          <div className="hidden md:flex space-x-4">
            <a href="#dashboard" className="text-white hover:text-gray-200">Dashboard</a>
            <a href="#survey" className="text-white hover:text-gray-200">Survey</a>
            <a href="#questions" className="text-white hover:text-gray-200">Questions</a>
            <a href="#logout" className="text-white hover:text-gray-200">Logout</a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-2 pt-2 pb-3">
            <a
              href="#dashboard"
              className="block text-white hover:text-gray-200"
            >
              Dashboard
            </a>
            <a href="#survey" className="block text-white hover:text-gray-200">
              Survey
            </a>
            <a
              href="#questions"
              className="block text-white hover:text-gray-200"
            >
              Questions
            </a>
            <a href="#logout" className="block text-white hover:text-gray-200">
              Logout
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
