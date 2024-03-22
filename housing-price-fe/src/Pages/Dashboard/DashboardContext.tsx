import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {HouseModel, mapToServer} from "../../Models/HouseModel"
import useApi from "../../Hooks/useApi";
import {routesApi} from "../../Utils/Routes";


interface AddHouseResponse extends HouseModel{
    success: boolean
    message?: string
}

interface HouseContextType {
    houses: HouseModel[]
    addHouse: (newHouse: HouseModel) => Promise<AddHouseResponse>
}

const HouseContext = createContext<HouseContextType>({
    houses: [],
    addHouse: async () => ({ success: false, message: "addHouse function not implemented" }),
})

export const useHouseContext = () => useContext(HouseContext)

export const HouseProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [houses, setHouses] = useState<HouseModel[]>([])
    const { request, setError } = useApi()

    const fetchData = useCallback(async () => {
        try {
            const params = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
            await request(routesApi.HOUSE, params, (el) => {
                setHouses(el.map((e: any) => {return new HouseModel(e)}))
            })
        } catch (error: any) {
            setError(error.message || error);
        }
    }, [request, setError]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const addHouse = async (newHouse: HouseModel): Promise<AddHouseResponse> => {
        try {
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mapToServer(newHouse))
            }
            let serverResponseData: any;
            await request(routesApi.HOUSE, params, (el) => {
                serverResponseData = el
            }, (er) => {serverResponseData = er})

            if ("success" in serverResponseData) {
                return { success: true, message: `Prediction computed successfully. Added prediction with id: ${serverResponseData.id} and 
                    price: ${serverResponseData?.price_prediction}` }
            } else {
                return { success: false, message: Object.entries(serverResponseData).map(([key, value]) => `${key} - ${value}`).join(', ')}
            }

        } catch (error) {
            console.error("Error adding house:", error)
            return { success: false, message: "Failed to add house" }
        }
    }

    return (
        <HouseContext.Provider value={{ houses, addHouse }}>
            {children}
        </HouseContext.Provider>
    )
}
