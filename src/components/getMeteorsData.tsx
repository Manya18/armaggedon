import { useState, useEffect } from "react";
import Meteor from "./Meteor";
import {Button, Skeleton} from "@nextui-org/react";
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

    async function getData(){
        fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            for(const [key, value] of Object.entries(data.near_earth_objects))
            {
            console.log('This is your data', key, value) 
            if(value) {
                for(const value1 of Object.values(value))
                {
                meteors.push(value1)
                setMeteors(meteors)
                }
            }
            } console.log("meteors", meteors)
        });
    }

    useEffect(() => {
        getData()
    }, [])

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
        <div style={{color:'white'}}>
            <div>Ближайшие подлеты астероидов</div>
            <div style={{display:'flex'}}>
                <div onClick={() => setUnitsM(false)}> в километрах </div>
                <div onClick={() => setUnitsM(true)}>| в лунных орбитах</div>
            </div>
            {meteors.map(meteor => 
                <Meteor meteor={meteor} unitsM={unitsM} />
            )}
        </div>
    )
}

export default GetMeteorsData;