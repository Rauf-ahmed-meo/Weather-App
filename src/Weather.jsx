import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Favs from './Favs'
const Weather = () => {
    const [search, setsearch] = useState("")
    const [location, setlocation] = useState("multan")
    const [favs, setfavs] = useState(() => {
        let currentfavs = localStorage.getItem("myData")
        return currentfavs ? JSON.parse(currentfavs) : []
    })
    const [data, setdata] = useState({})

    function handleSearch() {
        setlocation(search)
        setsearch("")
        console.log(search);
    }

    function handleClick(name){
        setlocation(name)
    }

    function handleDelete(name){
        let cnam = name
        let nfavs = favs.filter(name=> name !== cnam )
        setfavs(nfavs)
    }

    function addFav(cloc) {
        setfavs(prevfavs => [...prevfavs, cloc])
    }

    useEffect(() => {
        localStorage.setItem("myData", JSON.stringify(favs))
    }, [favs])

    async function getWeather() {
        let d = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f5e61560c63730b885b8b5800a7ff46a`)
        let res = await d.json()
        setdata(res)
    }

    useEffect(() => {
        if (location) {
            getWeather()
        }
    }, [location])

    return (
        <div className='WholeWeatherApp'>
            <div style={{ border: "2px solid black", padding: "23px" }}>
                <Search
                    search={search}
                    setsearch={setsearch}
                    handleSearch={handleSearch}
                />

                <div>
                    {
                        location ?
                            <div>{location}
                                <button onClick={() => addFav(location)}>Add fav</button>
                            </div>
                            : null
                    }
                    {
                        data ?
                            data.main ? <div>
                                <div style={{border:"2px solid"}}><h1>temp</h1><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="54" height="54" color="#000000" fill="none">
    <path d="M16.5001 22C18.7092 22 20.5001 20.2091 20.5001 18C20.5001 16.9335 20.0827 15.9646 19.4024 15.2475C18.8957 14.7134 18.6424 14.4463 18.5712 14.2679C18.5001 14.0895 18.5001 13.8535 18.5001 13.3815V4C18.5001 2.89543 17.6046 2 16.5001 2C15.3955 2 14.5001 2.89543 14.5001 4V13.3815C14.5001 13.8535 14.5001 14.0895 14.4289 14.2679C14.3577 14.4463 14.1044 14.7134 13.5977 15.2475C12.9174 15.9646 12.5001 16.9335 12.5001 18C12.5001 20.2091 14.2909 22 16.5001 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.3133 15.8303C8.67792 15.5416 7.36329 14.104 7.20333 12.2607C7.01373 10.076 8.51806 8.14861 10.5634 7.95588C10.883 7.92576 11.197 7.9398 11.5 7.99327M10.2201 4L10.323 5.18677M6.04201 7.57572L5.18359 6.81058M4.611 12.505L3.5 12.6097M6.86776 17.0868L6.15499 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg> <h2>{Math.floor(data.main.temp - 273)}°C</h2></div>
                                <div>
                                    <h1>Feels like: {
                                        data.main?
                                        Math.floor(data.main.feels_like - 273) + "°C"
                                        :null
                                        }</h1>
                                </div>
                            </div> : null
                            : "loading"
                    }
                </div>
            </div>
            <Favs names={favs} handleClick={handleClick} handleDelete={handleDelete}/>
        </div>
    )
}

export default Weather
