import React, {FC, useState} from "react"
import "./NotificationPopup.scss"

interface NotificationPopupProps {
    response: string,
    isError: boolean,
}

const NotificationPopup: FC<NotificationPopupProps> = ({ response, isError }) => {
    const [state, setState] = useState(false)
    const onClose = () => {
        setState(!state)
    }

    if (state) {
        return null
    }

    return (
        <div className={`notification-popup ${isError ? 'error' : 'success'}`}>
            <div className="popup-content">
                <p>{response}</p>
                <div className="close-btn" onClick={() => onClose()}>×</div>
            </div>
        </div>
    )
}

export default NotificationPopup