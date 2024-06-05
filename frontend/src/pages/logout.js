import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Logout() {
  const [message, setMessage] = useState("Failed to logout : c");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/mydata', { credentials: 'include' })
      .then(response => {
        if (response.status === 401) {
          return null;
        }
        return response.json();
      })
      .then(mydata => {
        if (mydata && mydata.username) {
            axios.post('http://localhost:5000/logout', 1, { withCredentials: true })
            .then(() => {
                setMessage("Successfully logged out!");
              })
        }
        setTimeout(() => {
            navigate("/");
          }, 1000); 
      });
  }, [navigate]);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default Logout;
