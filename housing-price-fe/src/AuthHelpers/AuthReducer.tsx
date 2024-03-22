import { Reducer } from "react"
import {AuthAction} from "./AuthActions"

export interface AuthState {
    isLoggedIn: boolean
    access_token?: string
    email?: string
}

export const defaultAuthState: AuthState = {
    isLoggedIn: false,
}

const authReducer: Reducer<AuthState, AuthAction> = (state, action) => {
    if (action.type === "LOG_IN") {
        localStorage.setItem("user", JSON.stringify(action.payload))
        return {
            ...state,
            isLoggedIn: true,
            access_token: action.payload.access_token,
            email: action.payload.email,
        }
    }

    if (action.type === "LOG_OUT") {
        localStorage.removeItem("user")
        return defaultAuthState
    }

    return defaultAuthState
}

export default authReducer