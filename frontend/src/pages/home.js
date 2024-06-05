import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./sidebar";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://nitw-connect-backend.vercel.app/mydata')
      .then(response => response.json())
      .then(mydata => {
        if (!mydata || !mydata.username) {
            navigate('/login');
          } else {
            setData(mydata);
          }
        setLoading(false);
      });
  }, [navigate]);

  return (
    <>
      <div className="min-h-screen flex flex-row antialiased bg-gray-50 text-gray-800 bg-pattern">
        <Sidebar />
        {loading ? (
          <div className="flex-grow flex items-center justify-center ">
            <h1 className="text-2xl">Loading...</h1>
          </div>
        ) : (
          <section className="text-gray-600 body-font flex-grow">
            <div className="container mx-auto flex py-24 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-6xl text-6xl mb-4 font-medium text-gray-900">
                  Welcome back!
                  <br className="hidden lg:inline-block" />
                  {data.username}
                </h1>
                <p className="mb-8 leading-relaxed text-2xl">
                  Ready to make some connections? <br />
                  Click any of the buttons on the sidebar to get started!
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/"
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Main page
                  </Link>
                  <Link
                    to="/logout"
                    className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <style>
        {`
          .bg-pattern {
            background-image: url('https://www.transparenttextures.com/patterns/diamond-upholstery.png');
          }
        `}
      </style>
    </>
  );
}

export default Home;
