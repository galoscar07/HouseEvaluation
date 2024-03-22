import { useState, useCallback, useContext } from "react"
import AuthContext from "../AuthHelpers/AuthProvider"

const BASE_URL = "http://localhost:8000"

const useApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { authState, globalLogOutDispatch } = useContext(AuthContext)

    const request = useCallback(
        async (
            endpoint: string,
            params: { [key: string]: any },
            handleSuccessResponse: (data: any) => void,
            handleErrorResponse?: (error: Error) => void
        ) => {
            setLoading(true)
            setError(null)

            try {
                if (authState.isLoggedIn) {
                    params.headers["Authorization"] = `Bearer ${authState.access_token}`
                }

                const response = await fetch(BASE_URL + endpoint, { ...params })
                const data = await response.json()
                if (!response.ok) {
                    handleErrorResponse && (await handleErrorResponse(data))
                }
                handleSuccessResponse && (await handleSuccessResponse(data))
            } catch (error: any) {
                if (error && error.message && error.message === "Unauthorized") {
                    globalLogOutDispatch()
                }

                if (handleErrorResponse) {
                    handleErrorResponse(error.message || error.error || error)
                } else {
                    setError(error.message || error.error || error)
                }
            }

            setLoading(false)
        },

        [authState.isLoggedIn, authState.access_token, globalLogOutDispatch]
    )

    return {
        loading: loading,
        error: error,
        request: request,
        setError: setError,
    }
}

export default useApi