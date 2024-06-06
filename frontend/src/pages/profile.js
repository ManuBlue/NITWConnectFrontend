import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "./sidebar";
import {useNavigate, Link } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // If token is not found, redirect to login page
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data from the server with token included in query parameters
    fetch(`https://nitw-connect-backend.vercel.app/mydata?token=${token}`)
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
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-row antialiased bg-gray-50 text-gray-800 bg-pattern">
        <Sidebar />
        <div className="flex-grow flex justify-center items-center p-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
            <h1 className="text-3xl font-semibold mb-4">Welcome to your profile, {userData.username}!</h1>
            {userData.profilePicture && (
              <div className="flex justify-center mb-4">
                <img
                  className="w-40 h-40 rounded-full object-cover"
                  src={userData.profilePicture}
                  alt="Profile"
                />
              </div>
            )}
            <div className="text-lg">
              <p className="mb-2"><span className="font-medium">Email:</span> {userData.email}</p>
              <p className="mb-2"><span className="font-medium">Age:</span> {userData.age}</p>
              <p className="mb-2"><span className="font-medium">Gender:</span> {userData.gender}</p>
              <p className="mb-2"><span className="font-medium">Branch:</span> {userData.branch}</p>
              <p className="mb-2"><span className="font-medium">CGPA:</span> {userData.cgpa}</p>
            </div>
            <div className="flex justify-center mt-6">
              <Link
                to="/editprofile"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
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

export default Profile;
