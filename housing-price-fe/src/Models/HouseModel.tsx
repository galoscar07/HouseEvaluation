export class HouseModel {
    id?: any
    longitude?: any
    latitude?: any
    housingMedianAge?: any
    totalRooms?: any
    totalBedrooms?: any
    population?: any
    households?: any
    medianIncome?: any
    oceanProximity?: any
    timeStamp?: any
    price?: any

    constructor(house: any)
    {
        this.id = house.id
        this.latitude = house.latitude
        this.longitude = house.longitude
        this.households = house.households
        this.housingMedianAge = house.housing_median_age
        this.totalRooms = house.total_rooms
        this.totalBedrooms = house.total_bedrooms
        this.population = house.population
        this.medianIncome = house.median_income
        this.oceanProximity = house.ocean_proximity
        this.timeStamp = house.created_at
        this.price = house.price_prediction
    }
}

export function mapToServer(house: HouseModel) {
    return {
        latitude: house.latitude,
        longitude: house.longitude,
        households: house.households,
        housing_median_age: house.housingMedianAge,
        total_rooms: house.totalRooms,
        total_bedrooms: house.totalBedrooms,
        population: house.population,
        median_income: house.medianIncome,
        ocean_proximity: house.oceanProximity,
    }
}

export enum AuthActionEnum {
    id = 'Id',
    longitude = 'Longitude',
    latitude = 'Latitude',
    housingMedianAge = 'Housing Median Age',
    totalRooms = 'Total Rooms',
    totalBedrooms = 'Total Bedrooms',
    population = 'Population',
    households = 'Households',
    medianIncome = 'Median Income',
    oceanProximity = 'Ocean Proximity',
    timeStamp = 'TimeStamp',
    price = 'Price'
}