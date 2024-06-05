// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import  Home  from './pages/home';
import Profile from './pages/profile';
import Main from './pages/main';
import Signup from './pages/signup';
import Login from './pages/login';
import Logout from './pages/logout';
import Pricing from './pages/pricing';
import Faq from './pages/faq';
import Features from './pages/features';
import People from './pages/people';
import Notifications from './pages/notifications';
import Messages from './pages/messages';
import Sidebar from './pages/sidebar';
function App() {
  return (
    <>
      
      <Routes>
      <Route path="/" element = { <Main /> }/>
      <Route path="/homepage" element={<Home />} />
      <Route path="/profile" element = {<Profile />} />
      <Route path="/signup" element = {<Signup />} />
      <Route path="/login" element = {<Login />} />
      <Route path= "/logout" element = {<Logout/>} />
      <Route path='/pricing' element={<Pricing/>} />
      <Route path='/faq' element={<Faq/>} />
      <Route path='/features' element={<Features/>} />
      <Route path='/features' element={<Features/>} />
      <Route path='/people' element={<People/>} />
      <Route path='/notifications' element={<Notifications/>} />
      <Route path='/messages' element={<Messages/>} />
      <Route path='/sidebar' element={<Sidebar/>} />
      </Routes>
    </>
    
  );
}

export default App;
