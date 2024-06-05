import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function People() {
  const [userData, setUserData] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [myData,setMyData] = useState(null);
  const[friendsList,setFriendsList] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  if(!token) {
    navigate('/login');
  }
  useEffect(() => {
    axios.get('/allusers', {params: {token: token},withCredentials: true})
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
        setLoading1(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        
      });
  }, []);

  useEffect(() => {
    axios.get('/mydata', { withCredentials: true })
      .then(response => {
        setMyData(response.data);
        setFriendsList(response.data.friends);
        setLoading2(false);
      })
      .catch(error => {
        console.error("Error fetching my data:", error);
      });
  }, []);
  
  
  const sendFriendRequest = (email) => {
    let data = { to: email, from: myData.email };
    axios.post("https://nitw-connect-backend.vercel.app/addfriend", data)
        .then(result => {
            console.log(result.data.message);
            if (result.status === 201) {
                alert("Sent friend request successfully!");
            }
        })
        .catch(error => {
            if (error.response) {
                console.error(error.response.data.message);
                // Handle different error statuses
                if (error.response.status === 409) {
                    alert(error.response.data.message); // Display the specific error message from the server
                } else if (error.response.status === 500) {
                    alert("Internal server error");
                }
            } else {
                console.error("Error", error.message);
            }
        });
};



  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

  return (
    <h1>Testing</h1>
  );
}

export default People;
