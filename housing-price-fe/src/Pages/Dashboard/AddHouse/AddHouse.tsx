import {HouseModel} from "../../../Models/HouseModel"
import {ChangeEvent, FormEvent, useState} from "react"
import "./AddHouse.scss"
import {useHouseContext} from "../DashboardContext"
import NotificationPopup from "../../../Components/NotificationPopup/NotificationPopup"

const initialState = {
    longitude: "",
    latitude: "",
    housingMedianAge: "",
    totalRooms: "",
    totalBedrooms: "",
    population: "",
    households: "",
    medianIncome: "",
    oceanProximity: "NEAR OCEAN"
}

const AddHouse = () => {
    const [houseModel, setHouseModel] = useState<HouseModel>(initialState)
    const { addHouse } = useHouseContext()
    const [ serverResponse, setServerResponse ] = useState({
        loading: false,
        response: '',
        error: false,
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setServerResponse({...serverResponse, loading: true})
        const response = await addHouse(houseModel)
        if (response.success) {
            setServerResponse({...serverResponse, response: response.message || "Success", error: false})
            setHouseModel(initialState)
        } else {
            setServerResponse({...serverResponse, response: response.message || "Failed to add house. Please try again.", error: true})
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target

        if (name === "oceanProximity") {
            setHouseModel(prevState => ({
                ...prevState,
                [name]: value
            }))
            return
        }
        setHouseModel(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <div className="wrapper-add-house">
            <h1>Add a House Model</h1>
            <form className="add-house-form" onSubmit={handleSubmit}>
                {
                    serverResponse.response &&
                    <NotificationPopup response={serverResponse.response} isError={serverResponse.error} />
                }
                <div className="input-row">
                    <label>
                        Longitude:
                        <input type="number" name="longitude" value={houseModel.longitude} onChange={handleChange} required />
                    </label>
                    <label>
                        Latitude:
                        <input type="number" name="latitude" value={houseModel.latitude} onChange={handleChange} required />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Housing Median Age:
                        <input type="number" name="housingMedianAge" value={houseModel.housingMedianAge} onChange={handleChange} required />
                    </label>
                    <label>
                        Total Rooms:
                        <input type="number" name="totalRooms" value={houseModel.totalRooms} onChange={handleChange} required />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Total Bedrooms:
                        <input type="number" name="totalBedrooms" value={houseModel.totalBedrooms} onChange={handleChange} required />
                    </label>
                    <label>
                        Population:
                        <input type="number" name="population" value={houseModel.population} onChange={handleChange} required />
                    </label>
                </div>
                <div className="input-row">
                    <label>
                        Households:
                        <input type="number" name="households" value={houseModel.households} onChange={handleChange} required />
                    </label>
                    <label>
                        Median Income:
                        <input type="number" name="medianIncome" value={houseModel.medianIncome} onChange={handleChange} required />
                    </label>
                </div>
                <label>
                    Ocean Proximity:
                    <select name="oceanProximity" id="searching" onChange={handleChange} required>
                        <option value="NEAR OCEAN">Near Ocean</option>
                        <option value="<1H OCEAN">Less than 1 house to ocean</option>
                        <option value="INLAND">Inland</option>
                        <option value="NEAR BAY">Near Bay</option>
                        <option value="ISLAND">Island</option>
                    </select>
                </label>
                <div className="button-wrapper">
                    <button type="submit">Predict House Price</button>
                </div>
            </form>
        </div>
    )
}

export default AddHouse