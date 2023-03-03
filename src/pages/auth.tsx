import RegisterForm from "@/components/forms/Register";
import Link from "next/link";
import React from "react";

const auth = () => {
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="w-full h-100 flex items-center justify-center">
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex items-center justify-center">
          <div className="w-full px-12 py-4">
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
              Sign Up
            </h2>
            <p className="text-center text-sm text-grey-600 mt-2 space-x-2">
              You already have an account? &nbsp;
              <a className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                Sign In
              </a>
            </p>
            {/*-----Sign up form ----*/}
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth;