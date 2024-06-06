import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
function Messages() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [userData, setUserData] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    //Get uhhh user data and friends data
    useEffect(() => {
        fetch(`https://nitw-connect-backend.vercel.app/mydata?token=${token}`)
      .then(response => response.json())
      .then(mydata => {
        if (!mydata || !mydata.username) {
          navigate('/login');
        } else {
          setUserData(mydata);
        }
      });

        fetch('https://nitw-connect-backend.vercel.app/myfriends?token=${token}', { withCredentials: true })
            .then(res =>  res.json())
            .then()(response => {
                setFriends(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching friends:", error);
                setLoading(false);
            });
    }, []);

    //if uhhhh friend has been selected then refresh messages each second
    useEffect(() => {
        let interval;
        if (selectedFriend) {
            interval = setInterval(() => {
                axios.get(`https://nitw-connect-backend.vercel.app/messages?user1=${userData.email}&user2=${selectedFriend.email}`, { withCredentials: true })
                    .then(response => {
                        setMessages(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching messages:", error);
                    });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [selectedFriend, userData]);


    const openChat = (friend) => {
        if (!userData) return;

        setSelectedFriend(friend);
        setLoadingMessages(true);
        axios.get(`https://nitw-connect-backend.vercel.app/messages?user1=${userData.email}&user2=${friend.email}`, { withCredentials: true })
            .then(response => {
                setMessages(response.data);
                setLoadingMessages(false);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
                setLoadingMessages(false);
            });
    };


    //Obvious
    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            from: userData.email,
            to: selectedFriend.email,
            content: newMessage,
            timestamp: new Date()
        };

        axios.post('https://nitw-connect-backend.vercel.app/sendmessage?token=${token}', messageData, { withCredentials: true })
            .then(response => {
                setNewMessage("");
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold mb-4">Messages</h1>
                <div className="space-y-4">
                    {friends.map((friend, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md">
                            <img src={friend.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mb-4 sm:mb-0 sm:mr-4" />
                            <div className="flex-grow">
                                <p className="font-bold">{friend.username}</p>
                                <button
                                    onClick={() => openChat(friend)}
                                    className="bg-indigo-500 text-white py-2 px-4 rounded mt-2 sm:w-auto"
                                >
                                    Open Chat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedFriend && (
                    <div className="mt-6 sm:mt-8">
                        <h2 className="text-2xl font-bold mb-4">Chat with {selectedFriend.username}</h2>
                        {loadingMessages ? (
                            <div>Loading messages...</div>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message"
                                        className="w-full p-2 border rounded"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700"
                                    >
                                        Send
                                    </button>
                                </div>
                                <div className="space-y-4 mt-4">
                                    {messages.map((message, index) => (
                                        <div key={index} className="flex items-start bg-gray-100 p-4 rounded-lg shadow-md">
                                            <img src={message.from === userData.email ? userData.profilePicture : selectedFriend.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                                            <div>
                                                <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                                                <p className="text-lg">{message.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default Messages;
