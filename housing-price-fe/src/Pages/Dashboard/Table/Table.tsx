import "./Table.scss"
import {useEffect, useRef, useState} from "react"
import {AuthActionEnum} from "../../../Models/HouseModel"
import {useHouseContext} from "../DashboardContext"

const Table = () => {
    const { houses } = useHouseContext()

    const tableRef = useRef<HTMLTableElement>(null)
    const [selectedRow, setSelectedRow] = useState(-1)
    const handleRowClick = (index: number) => {
        setSelectedRow(index)
    }

    const handleDocumentClick = (event: MouseEvent) => {
        if (!tableRef.current?.contains(event.target as Node)) {
            setSelectedRow(-1)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [])

    const renderTable = () => {
        return (
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {Object.values(AuthActionEnum).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {houses.map((house, index) => (
                    <tr
                        key={index}
                        className={selectedRow === index ? 'selected' : ''}
                        onClick={() => handleRowClick(index)}
                    >
                        <td>{house.id}</td>
                        <td>{house.longitude}</td>
                        <td>{house.latitude}</td>
                        <td>{house.housingMedianAge}</td>
                        <td>{house.totalRooms}</td>
                        <td>{house.totalBedrooms}</td>
                        <td>{house.population}</td>
                        <td>{house.households}</td>
                        <td>{house.medianIncome}</td>
                        <td>{house.oceanProximity}</td>
                        <td>{house.timeStamp}</td>
                        <td>{house.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    return (
        <section className="table-section">
            <h1>Table Section</h1>
            {
                houses.length === 0
                ? <h3>There is no data to display</h3>
                : renderTable()
            }
        </section>
    )
}

export default Table