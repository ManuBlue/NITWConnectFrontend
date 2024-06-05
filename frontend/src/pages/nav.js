import React from "react";
import {Link } from "react-router-dom";

const Nav = ()=> {
    return(
        <ul>
            <li> <Link to = "/">Home page</Link></li>
            <li> <Link to = "/profile">My profile</Link></li>
            <li> <Link to = "/logout">Logout</Link></li>

        </ul>
    )
}
export default Nav