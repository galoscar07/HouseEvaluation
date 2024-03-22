import React, {createContext, useReducer, useCallback, useEffect} from "react"
import { useNavigate } from "react-router-dom"

import authReducer, { AuthState, defaultAuthState } from "./AuthReducer"
import {AuthActionEnum} from "./AuthActions"
import {routesUi} from "../Utils/Routes"

type AuthProviderProps = {
    children: React.ReactElement
}

export type UserData = {
    access_token: string
    email: string
}

export interface AuthContext {
    authState: AuthState
    globalLogInDispatch: (props: UserData) => void
    globalLogOutDispatch: () => void
}


const authCtx = createContext<AuthContext>({
    authState: defaultAuthState,
    globalLogInDispatch: () => {},
    globalLogOutDispatch: () => {},
})

export const AuthContextProvider = (props: AuthProviderProps) => {
    const { children } = props

    const [authState, authDispatch] = useReducer(authReducer, defaultAuthState)
    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            const userData: UserData = JSON.parse(user)
            authDispatch({ type: AuthActionEnum.LOG_IN, payload: userData })
        }
    }, [])

    const globalLogInDispatch = useCallback(
        (props: UserData) => {
            const { access_token, email } = props
            authDispatch({
                "type": AuthActionEnum.LOG_IN,
                "payload": {
                    access_token,
                    email,
                },
            })
            navigate(routesUi.DASHBOARD)
        },
        [navigate]
    )

    const globalLogOutDispatch = useCallback(() => {
        authDispatch({ type: AuthActionEnum.LOG_OUT, payload: null })
        navigate(routesUi.AUTHENTICATION)
    }, [navigate])

    const ctx = {
        authState,
        globalLogInDispatch,
        globalLogOutDispatch,
    }

    return <authCtx.Provider value={ctx}>{children}</authCtx.Provider>
}

export default authCtx