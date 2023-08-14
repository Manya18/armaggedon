import { useState, useEffect } from "react";
import Image from 'next/image'

const GetMeteorsData = () => {

    const [meteors, setMeteors] = useState([]);
    const [unitsM, setUnitsM] = useState(false);

    const current = new Date();
    const dateStart = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const dateEnd = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()+1}`;
    const apiToken = `w72K7LgVIHRXzd4b8VfGskoRL1FjgdQPPlhA5vGg`;
    console.log(dateStart, dateEnd)
    const apiURL= `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateStart}&end_date=${dateEnd}&api_key=${apiToken}`;

    // useEffect(() => {
    // const getApi = () => {
    //     fetch(apiURL)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         for(const [key, value] of Object.entries(data.near_earth_objects))
    //         {
    //         console.log('This is your data', key, value) 
    //         if(value) {
    //             for(const value1 of Object.values(value))
    //             {
    //             meteors.push(value1)
    //             setMeteors(meteors)
    //             }
    //         }
    //         } console.log("meteors", meteors)
    //     });
    // }
    // }, [])

    useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
        document.removeEventListener('scroll', scrollHandler)
    }
    }, [])

    const scrollHandler = (e:any) => {
        console.log('scroll');
    }

    return (
        <div>
            <div>Ближайшие подлеты астероидов</div>
            <div onClick={() => setUnitsM(false)}> в километрах </div>
            <div onClick={() => setUnitsM(true)}>| в лунных орбитах</div>
            {meteors.map(meteor => 
                <div className="meteor" key={meteor.id}>
                    <Image
                        src="/meteor.png"
                        alt="Meteorite"
                        className={"meteor"}
                        width={100}
                        height={100}
                    />
                    <div className="date">{meteor.close_approach_data[0].close_approach_date}</div>
                        <div className="title">{meteor.name}</div>
                        <div className="width">{meteor.absolute_magnitude_h} м</div>
                        {meteor.is_potentially_hazardous_asteroid &&<div className="type">Опасен</div>}
                        {unitsM===false?
                        <div className="units">{meteor.close_approach_data[0].miss_distance.kilometers} </div>:
                        <div className="units">{meteor.close_approach_data[0].miss_distance.lunar} </div>}
                </div>
            )}
        </div>
    )
}

export default GetMeteorsData;