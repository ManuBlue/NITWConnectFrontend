import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return(
        <>
        {/* hero - start */}
<div className="bg-white pb-6 sm:pb-8 lg:pb-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16">
      {/* logo - start */}
      <Link to="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
        <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>

        NITWConnect
      </Link>
      {/* logo - end */}

      {/* nav - start */}
      <nav className=" gap-12 lg:flex ">
      <Link to="/" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 px-1">Home</Link>
      <Link to="/features" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 px-1">Features</Link>
      <Link to="/pricing" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 px-1">Pricing</Link>
      <Link to="/faq" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 px-1">FAQ</Link>
    </nav>
      {/* nav - end */}

      {/* buttons - start */}

      
      {/* buttons - end */}
    </header>
  </div>
</div>
{/* hero - end */}

        </>
    )
}

export default Hero