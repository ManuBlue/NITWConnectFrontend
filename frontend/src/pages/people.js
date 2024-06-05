import React, { useState, useEffect } from "react";
import axios from 'axios';
function People() {
  useEffect(() => {
    axios.get('/allusers', {params: {token: token},withCredentials: true})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  

  return (
    <h1>Testing</h1>
  );
}

export default People;
