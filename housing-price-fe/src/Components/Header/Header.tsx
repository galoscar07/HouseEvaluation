import "./Header.scss"
import {Link} from "react-router-dom";
import {routesUi} from "../../Utils/Routes";
import {useContext} from "react";
import AuthContext from "../../AuthHelpers/AuthProvider"
import React from "react";

function Header() {
    const { authState, globalLogOutDispatch } = useContext(AuthContext)

    const handleLogOut = () => {
        globalLogOutDispatch()
    }

    return (
        <header className="header">
            <div>
                <img src="/house.svg" alt="Company Logo" className="logo" />
                <h2>EvaluateHouse</h2>
            </div>
            <nav>
                <ul>
                    {
                        authState.isLoggedIn
                            ? <React.Fragment>
                                <li><Link to={routesUi.DASHBOARD}>Dashboard</Link></li>
                                <li onClick={handleLogOut}>Log Out</li>
                            </React.Fragment>
                            : <li><Link to={routesUi.AUTHENTICATION}>Authenticate</Link></li>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header