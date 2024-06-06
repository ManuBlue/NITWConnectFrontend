import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";

function Notifications() {
    const [incomingFriendRequests, setIncomingFriendRequests] = useState([]);
    const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://nitw-connect-backend.vercel.app/mydata?token=${token}')
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

    const retrieveUserData = async (email) => {
        try {
            const response = await axios.get(`/retrievedata?email=${email}`);
            return response.data;
        } catch (error) {
            console.error("Error retrieving user data:", error);
            return null;
        }
    };

    useEffect(() => {
        if (loading1) {
            axios.get('/incomingfriendrequests', { withCredentials: true })
                .then(async (response) => {
                    const requests = response.data;
                    const incomingDataPromises = requests.map(async (request) => {
                        const userData = await retrieveUserData(request.from);
                        return { ...request, userData };
                    });
                    const incomingData = await Promise.all(incomingDataPromises);
                    setIncomingFriendRequests(incomingData);
                    setLoading1(false);
                })
                .catch(error => {
                    console.error("Error fetching incoming friend requests:", error);
                    setLoading1(false);
                });
        }
    }, loading1);

    useEffect(() => {
        if (loading2) {
            axios.get('/outgoingfriendrequests', { withCredentials: true })
                .then(async (response) => {
                    const requests = response.data;
                    const outgoingDataPromises = requests.map(async (request) => {
                        const userData = await retrieveUserData(request.to);
                        return { ...request, userData };
                    });
                    const outgoingData = await Promise.all(outgoingDataPromises);
                    setOutgoingFriendRequests(outgoingData);
                    setLoading2(false);
                })
                .catch(error => {
                    console.error("Error fetching outgoing friend requests:", error);
                    setLoading2(false);
                });
        }
    }, loading2);

    const acceptFriendRequest = (email) => {
        if (data) {
            let requestData = { to: data.email, from: email };
            axios.post("http://localhost:5000/createreq", requestData)
                .then(response => {
                    alert("Successfully added friend");
                    setLoading1(false);
                })
                .catch(error => {
                    console.error("Error sending friend request:", error);
                    // Handle error, show error message, etc.
                });
        }
    };

    const deleteFriendRequest = (email) => {
        if (data) {
            let requestData = { to: email, from: data.email };
            axios.post("http://localhost:5000/deletereq", requestData)
                .then(response => {
                    alert("Successfully deleted friend");
                    setLoading2(false);
                })
                .catch(error => {
                    console.error("Error deleting friend request:", error);
                    // Handle error, show error message, etc.
                });
        }
    };

    if (loading || loading1 || loading2) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="min-h-screen flex antialiased bg-gray-50 text-gray-800">
                <Sidebar />
                <div className="flex-grow p-6">
                    <h1 className="text-3xl font-bold mb-4">Notifications</h1>

                    <h2 className="text-2xl font-semibold mb-4">Incoming Friend Requests</h2>
                    {incomingFriendRequests.length === 0 ? (
                        <div>You have no incoming friend requests.</div>
                    ) : (
                        <ul className="space-y-4">
                            {incomingFriendRequests.map((request, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    {request.userData ? (
                                        <>
                                            <p><strong>From:</strong> {request.userData.username}</p>
                                            <img src={request.userData.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
                                            <p><strong>Branch:</strong> {request.userData.branch}</p>
                                            <p><strong>CGPA:</strong> {request.userData.cgpa}</p>
                                            <button onClick={() => acceptFriendRequest(request.userData.email)} className="mt-2 text-indigo-500 hover:underline focus:outline-none">Accept Request</button>
                                        </>
                                    ) : (
                                        <p>Loading user data...</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}

                    <h2 className="text-2xl font-semibold mb-4">Outgoing Friend Requests</h2>
                    {outgoingFriendRequests.length === 0 ? (
                        <div>You have no outgoing friend requests.</div>
                    ) : (
                        <ul className="space-y-4">
                            {outgoingFriendRequests.map((request, index) => (
                                <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                                    {request.userData ? (
                                        <>
                                            <p><strong>To:</strong> {request.userData.username}</p>
                                            <img src={request.userData.profilePicture} alt="Profile" className="w-16 h-16 rounded-full" />
                                            <p><strong>Branch:</strong> {request.userData.branch}</p>
                                            <p><strong>CGPA:</strong> {request.userData.cgpa}</p>
                                            <button onClick={() => deleteFriendRequest(request.userData.email)} className="mt-2 text-indigo-500 hover:underline focus:outline-none">Delete Request</button>
                                        </>
                                    ) : (
                                        <p>Loading user data...</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default Notifications;
