import {routesUi} from "../../Utils/Routes"
import {Link, Route, Routes} from "react-router-dom"
import "./Dashboard.scss"
import React, {useContext} from "react";
import AuthContext from "../../AuthHelpers/AuthProvider"
import Table from "./Table/Table";
import AddHouse from "./AddHouse/AddHouse";
import Graphics from "./Graphics/Graphics";
import NotFoundPage from "../404/404";
import {HouseProvider} from "./DashboardContext";

const routeTabs = [
    {
        id: 1,
        name: 'Add House',
        route: routesUi.DASHBOARD_ADD_HOUSE,
    },
    {
        id: 2,
        name: 'Table',
        route: routesUi.DASHBOARD_TABLE,
    },
    {
        id: 3,
        name: 'Graphics',
        route: routesUi.DASHBOARD_GRAPHICS,
    },
]


const Dashboard = () => {
    const { authState } = useContext(AuthContext)

    return (
        <div className="wrapper-dashboard">
            <section about="Dashboard Wrapper" className="container">
                <h1>
                    Dashboard
                </h1>
                <h3>
                    Welcome back {authState.email}
                </h3>
                <div className="link-container">
                    {routeTabs.map((el) => {
                        return (
                            <Link className="button" to={el.route} key={el.id}
                            >{el.name}</Link>
                        )
                    })}
                </div>
                <HouseProvider>
                    <Routes>
                        <Route index element={<Table />} />
                        <Route path={'table'} element={<Table />} ></Route>
                        <Route path={'add-house'} element={<AddHouse />} ></Route>
                        <Route path={'graphics'} element={<Graphics />} ></Route>
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </HouseProvider>
            </section>
        </div>
    )
}

export default Dashboard