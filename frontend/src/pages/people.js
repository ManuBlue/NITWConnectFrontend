import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Link, useNavigate } from "react-router-dom";

function People() {
  const [userData, setUserData] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [myData, setMyData] = useState(null);
  const [friendsList, setFriendsList] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return; // Stop execution if token is not present
    }

    fetch(`https://nitw-connect-backend.vercel.app/allusers?token=${token}`)
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        setUserData(data);
        setLoading1(false); // Update loading state when data is received
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setLoading1(false); // Update loading state in case of error
      });
  }, [token, navigate]); // Make sure to include dependencies in useEffect dependencies array

  useEffect(() => {
    fetch(`https://nitw-connect-backend.vercel.app/mydata?token=${token}`)
      .then(response => response.json()) // Parse response JSON
      .then(data => {
        setMyData(data);
        setFriendsList(data.friends);
        setLoading2(false); // Update loading state when data is received
      })
      .catch(error => {
        console.error("Error fetching my data:", error);
        setLoading2(false); // Update loading state in case of error
      });
  }, [token]);

  // Function to handle sending friend request
  const sendFriendRequest = (email) => {
    let data = { to: email, from: myData.email };
    fetch("https://nitw-connect-backend.vercel.app/addfriend", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        if (result.status === 201) {
          alert("Sent friend request successfully!");
        }
      })
      .catch(error => {
        console.error("Error sending friend request:", error);
        alert("Error sending friend request");
      });
  };

  // If loading, display a loading message
  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex antialiased bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">People</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userData.map((user, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <img className="w-40 h-40 rounded-full object-cover" src={user.profilePicture} alt="Profile"/>
              </div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-700">Branch: {user.branch}</p>
              <p className="text-gray-700">CGPA: {user.cgpa}</p>
              {friendsList.includes(user.email) ? (
                <Link to='/messages' className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"><p>Message</p></Link>
              ) : (
                <button onClick={() => sendFriendRequest(user.email)} className="mt-2 text-indigo-500 hover:underline focus:outline-none">
                  Add Friend
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default People;
