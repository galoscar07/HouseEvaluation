import React, { useEffect, useState, useContext, FormEventHandler } from "react"
import useApi from "../../Hooks/useApi"
import AuthContext from "../../AuthHelpers/AuthProvider"
import { validatePasswordLength, validateEmailFormat } from "./validations"
import { AuthData } from "../../Hooks/authData"
import "./Authentications.scss"
import {routesApi} from "../../Utils/Routes"

const Auth = () => {
    const [authData, setAuthData] = useState<AuthData>()
    const { request, setError } = useApi()
    const { globalLogInDispatch } = useContext(AuthContext)
    const [errors, setErrors] = useState<String | null>(null)
    const [signUpCompleted, setSignUpCompleted] = useState<String | null>(null)

    useEffect(() => {
        if (authData && "access_token" in authData) {
            globalLogInDispatch({
                access_token: authData.access_token,
                email: authData.email ,
            })
        }
        if (authData?.message === 'Successfully') {
            setSignUpCompleted("Check Your Email!")
        }
    }, [authData, globalLogInDispatch])

    const login = async (event: any) => {
        const data = new FormData(event.currentTarget)
        const userEmail = data.get("email")
        const userPassword = data.get("password")
        try {
            if (
                !validateEmailFormat(userEmail?.toString() || "") ||
                !validatePasswordLength(userPassword?.toString() || "")
            ) {
                throw new Error("Incorrect credential format!")
            }
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                }),
            }
            await request(routesApi.LOGIN, params, setAuthData)
        } catch (error: any) {
            setErrors("Incorrect credential format!")
            setError(error.message || error)
        }
    }

    const register = async (event: any) => {
        const data = new FormData(event.currentTarget)
        const userEmail = data.get("email")
        const userPassword = data.get("password")
        const userPasswordConfirm = data.get("passwordCopy")
        try {
            if (
                !validateEmailFormat(userEmail?.toString() || "") ||
                !validatePasswordLength(userPassword?.toString() || "") ||
                !validatePasswordLength(userPasswordConfirm?.toString() || "") ||
                userPassword !== userPasswordConfirm
            ) {
                throw new Error("Incorrect credential format!")
            }
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                }),
            }
            await request(routesApi.REGISTER, params, setAuthData)
        } catch (error: any) {
            setErrors("Incorrect credential format!")
            setError(error.message || error)
        }
    }

    const authHandler: FormEventHandler<HTMLFormElement> = async (event: any) => {
        event.preventDefault()
        if (event.target.name === 'login') {
            await login(event)
        } else if (event.target.name === 'register') {
            await register(event)
        }
    }

    const [swipeSide, setSwipeSide] = useState('')
    const handleSwipeSides = (ev: any) => {
        // @ts-ignore
        setAuthData({...authData, detail: ""})
        setSignUpCompleted(null)
        setError(null)
        setSwipeSide(ev.target.name === 'register' ? 'active' : '')
    }

    return (
        <div className="wrapper-authentication">
            <div className={`container ${swipeSide}`} >
                <div className="form-container sign-up">
                    <form onSubmit={authHandler} name="register">
                        <h1>Create Account</h1>
                        <input className={`${errors && 'error'}`} name="email" type="email" placeholder="Email" />
                        <input className={`${errors && 'error'}`} name="password" type="password" placeholder="Password" />
                        <input className={`${errors && 'error'}`} name="passwordCopy" type="password" placeholder="Conform Password" />
                        {authData?.detail && <p>{authData.detail} </p>}
                        {errors && <p>{errors} </p>}
                        <button>Sign Up</button>
                        {signUpCompleted && <p>{signUpCompleted}</p>}
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={authHandler} name="login">
                        <h1>Sign In</h1>
                        <input className={`${errors && 'error'}`}  name="email" type="email" placeholder="Email" />
                        <input className={`${errors && 'error'}`}  name="password" type="password" placeholder="Password" />
                        {authData?.detail && <p>{authData.detail} </p>}
                        {errors && <p>{errors} </p>}
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Click on the below button to log in</p>
                            <button className="hidden" name="login" onClick={handleSwipeSides}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Welcome!</h1>
                            <p>Register with your personal details to be able to access our platform.</p>
                            <button className="hidden" name="register" onClick={handleSwipeSides}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth