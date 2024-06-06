import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Failed to logout :(");

  useEffect(() => {
    localStorage.clear();
    setMessage("Successfully logged out!");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default Logout;
