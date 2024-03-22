import { Chart } from 'chart.js/auto'
import {HouseModel} from "../../Models/HouseModel"
import {FC, useEffect, useRef} from "react"

interface GraphProps {
    houseModels: HouseModel[]
    type: 'bar' | 'line' | 'stackedBar' | 'scatter'
    title: string
}

const Graph: FC<GraphProps> = ({ houseModels, type, title }) => {
    const canvasRef = useRef(null)
    let chart : Chart | null = null

    const renderChart = () => {
        if (!canvasRef.current || !houseModels.length) return

        // @ts-ignore
        const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D

        switch (type) {
            case 'bar':
                const roomsMap = new Map<number, number>()
                houseModels.forEach(house => {
                    const rooms = house.totalRooms || 0
                    roomsMap.set(rooms, (roomsMap.get(rooms) || 0) + 1)
                })

                const labelsBar: string[] = []
                const dataBar: number[] = []
                const backgroundColors: string[] = []

                roomsMap.forEach((count, rooms) => {
                    labelsBar.push(`${rooms} rooms`)
                    dataBar.push(count)
                    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
                    backgroundColors.push(randomColor)
                })

                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labelsBar,
                        datasets: [{
                            label: 'Number of Houses with Rooms',
                            data: dataBar,
                            backgroundColor: backgroundColors,
                            borderColor: backgroundColors.map(color => color.replace('0.2', '1')),
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                })
                break
            case 'line':
                const roomsPriceMap = new Map<number, number>()
                const roomsCountMap = new Map<number, number>()

                houseModels.forEach(house => {
                    const rooms = house.totalRooms || 0
                    const price = house.price || 0
                    roomsPriceMap.set(rooms, (roomsPriceMap.get(rooms) || 0) + price)
                    roomsCountMap.set(rooms, (roomsCountMap.get(rooms) || 0) + 1)
                })

                let labelsLine: string[] = []
                let dataLine: number[] = []

                roomsPriceMap.forEach((totalPrice, rooms) => {
                    const averagePrice = totalPrice / (roomsCountMap.get(rooms) || 1)
                    labelsLine.push(`${rooms} rooms`)
                    dataLine.push(averagePrice)
                })

                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labelsLine,
                        datasets: [{
                            label: 'Average Price',
                            data: dataLine,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                })
                break
            case 'scatter':
                const dataPoints: { x: number, y: number, label: string, price: number }[] = []
                const backgroundColorsScatter: string[] = []
                houseModels.forEach((house, index) => {
                    const latitude = house.latitude || 0
                    const longitude = house.longitude || 0
                    const price = house.price || 0
                    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
                    backgroundColorsScatter.push(randomColor)
                    dataPoints.push({
                        x: longitude,
                        y: latitude,
                        label: `House ${index + 1}`,
                        price: price
                    })
                })

                chart = new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'Position of Houses',
                            data: dataPoints.map(point => ({ x: point.x, y: point.y, label: point.label })),
                            backgroundColor: backgroundColorsScatter,
                            borderColor: 'rgba(255, 255, 255, 1)',
                            pointRadius: 10,
                            pointHoverRadius: 15
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom'
                            },
                            y: {
                                type: 'linear',
                                position: 'left'
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: (context: any) => {
                                        const dataPoint = dataPoints[context.dataIndex]
                                        return `${dataPoint.label}: (${dataPoint.x}, ${dataPoint.y}) - Price: $${dataPoint.price}`
                                    }
                                }
                            },
                            legend: {
                                display: false
                            }
                        }
                    }
                })
                break
            case 'stackedBar':
                const labels: string[] = ['Total Rooms', 'Total Bedrooms', 'Population']

                const totalRoomsData: number = houseModels.reduce((acc, house) => acc + (house.totalRooms || 0), 0)
                const totalBedroomsData: number = houseModels.reduce((acc, house) => acc + (house.totalBedrooms || 0), 0)
                const populationData: number = houseModels.reduce((acc, house) => acc + (house.population || 0), 0)

                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total',
                                data: [totalRoomsData, totalBedroomsData, populationData],
                                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)']
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: { stacked: true },
                            y: { stacked: true }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                    }
                })
                break
            default:
                break
        }
    }

    useEffect(() => {
        renderChart()
        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    })


    return (
        <div>
            <p style={{marginBottom: "20px"}}>{title}</p>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default Graph