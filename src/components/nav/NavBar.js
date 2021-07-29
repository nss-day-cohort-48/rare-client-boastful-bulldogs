import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("rare_user_id"))

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__logo" to="/">
                    <img className="navbar__logo" src={Logo} alt="Rare logo"/>
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">All Posts</Link>
            </li>
            <li className="navbar__item">
                {userId > 0
                ?
                <Link className="navbar__link" to="/myposts">My Posts</Link>
                :
                <Link className="navbar__link" onClick={() => {history.push("/login")}}>My Posts</Link>
                }
            </li>
            <li className="navbar__item">
                {userId > 0
                ?
                <Link className="navbar__link" to="/tags">Tag manager</Link>
                :
                <Link className="navbar__link" onClick={() => {history.push("/login")}}>Tag manager</Link>
                }
            </li>
            {
                (localStorage.getItem("rare_user_id") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user_id")
                                history.push({ pathname: "/posts" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
