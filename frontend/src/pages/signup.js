import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hero from "./hero";
function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    profilePicture: null,
    gender: "male",
    branch: "ECE",
    age: 18,
    cgpa: "4-5",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds the limit of 10MB.");
      return;
    }
  
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      setData({
        ...data,
        profilePicture: event.target.result,
      });
    };
  
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://nitw-connect-backend.vercel.app/signup", data)
    .then(result => {
      console.log(result.data.message);
      if (result.status === 201) {
        // User created successfully
        navigate('/');
      }
    })
    .catch(error => {
      if (error.response) {
        console.error(error.response.data.message);
        // Handle different error statuses
        if (error.response.status === 409) {
          alert("User already exists");
        } else if (error.response.status === 500) {
          alert("Internal server error");
        }
      } else {
        console.error("Error", error.message);
      }
    });
  };

  return (
    <>
    <Hero/>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Signup</h2>
    </div>

    <form onSubmit={handleSubmit} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="username" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Enter your full name (This will be your username)*</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email*</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password*</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        />
      </div>

      <div>
        <label htmlFor="profile-picture" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Upload your profile picture: (Size ratio : 1x1)*</label>
        <input
          type="file"
          accept="image/*"
          name="profilePicture"
          onChange={handleFileChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        />
      </div>

      <div>
        <label htmlFor="gender" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Gender*</label>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="branch" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Branch*</label>
        <select
          name="branch"
          value={data.branch}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        >
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="Mech">Mech</option>
          <option value="Chem">Chem</option>
          <option value="Bio">Bio</option>
          <option value="MME">MME</option>
        </select>
      </div>

      <div>
        <label htmlFor="age" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Age*</label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        />
      </div>

      <div>
        <label htmlFor="cgpa" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">CGPA*</label>
        <select
          name="cgpa"
          value={data.cgpa}
          onChange={handleChange}
          className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
        >
          <option value="4-5">4-5</option>
          <option value="5-6">5-6</option>
          <option value="6-7">6-7</option>
          <option value="7-8">7-8</option>
          <option value="8-9">8-9</option>
          <option value="9-10">9-10</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <input type="submit" value="Register" className="block w-full rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base" />
      </div>
    </form>
  </div>
</div>

    </>
  );
}

export default Signup;
