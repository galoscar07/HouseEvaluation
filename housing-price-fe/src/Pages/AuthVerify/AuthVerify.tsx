import {useParams} from "react-router-dom";
import "./AuthVerify.scss"
import {useEffect, useState} from "react";

function AuthVerify() {
    let { token } = useParams();
    const [message, setMessage] = useState<String|null>(null)

    useEffect(() => {
        fetch(
            `http://localhost:8000/auth/email-verify/?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw Error
                }
                return response.json()
            })
            .then((data) => {
                setMessage("You're account has been activated. Now you can log in.")
            })
            .catch((err) => {
                setMessage("Something went wrong. Please contact the admin.")
            })
    }, [token])


    return (
        <div className="wrapper-authentication verify">
            <div className="container">
                <h2>{message}</h2>
            </div>
        </div>
    )
}

export default AuthVerify