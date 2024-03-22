import Graph from "../../../Components/Graph/Graph"
import "./Graphics.scss"
import {useHouseContext} from "../DashboardContext"
import React from "react"


const Graphics = () => {
    const { houses } = useHouseContext()

    const renderGraphs = () => {
        return (
            <React.Fragment>
                <div className="charts-grid">
                    <div className="chart-item">
                        <Graph houseModels={houses} type="bar" title="Number of houses grouped by rooms" />
                    </div>
                    <div className="chart-item">
                        <Graph houseModels={houses} type="stackedBar" title="Totals" />
                    </div>
                    <div className="chart-item">
                        <Graph houseModels={houses} type="scatter" title="Position of houses grouped with price" />
                    </div>
                </div>
                <Graph houseModels={houses} type="line" title="Average price depending on room" />
            </React.Fragment>
        )
    }

    return (
        <section className="graph-section">
            <h1>Graphics Section</h1>
            {
                houses.length === 0
                ? <h3>There is no data to display</h3>
                : renderGraphs()
            }
        </section>
    )
}

export default Graphics