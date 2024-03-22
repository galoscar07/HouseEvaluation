import {Route, Routes, Navigate} from "react-router-dom"
import React, {useContext} from "react"
import AuthContext from "./AuthHelpers/AuthProvider"
import {routesUi} from "./Utils/Routes"

import Header from "./Components/Header/Header"
import Authentication from "./Pages/Auth/Authentication"
import Dashboard from "./Pages/Dashboard/Dashboard"
import NotFoundPage from "./Pages/404/404"
import AuthVerify from "./Pages/AuthVerify/AuthVerify";

function App() {
    const { authState } = useContext(AuthContext)

  return (
      <div className="App">
          <Header />
              <Routes>
                  <Route path="/" element={<Navigate to={!authState.isLoggedIn ? routesUi.AUTHENTICATION : routesUi.DASHBOARD} />}/>
                  {!authState.isLoggedIn && (
                      <Route path={routesUi.AUTHENTICATION} element={<Authentication />}/>
                  )}
                  {authState.isLoggedIn && (
                      <Route path={routesUi.DASHBOARD + "/*"} element={<Dashboard />} />
                  )}
                  <Route path={routesUi.AUTHENTICATION_VERIFY}>
                      <Route path=":token" element={<AuthVerify />}/>
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
              </Routes>
      </div>
  )
}

export default App