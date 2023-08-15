import { useState, useEffect } from "react";
import Meteor from "./Meteor";
import {Button, Skeleton} from "@nextui-org/react";
import Image from 'next/image'

const GetMeteorsData = () => {

    const [meteors, setMeteors] = useState([{
        "id":0,
        "date":'',
        'units':[],
        "name":'',
        "is_potentially_hazardous_asteroid": false,
        "absolute_magnitude_h": 0
    }]);
    const [unitsM, setUnitsM] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const[fetching, setFetching] = useState(true);

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
            let startMeteors=[];
            for(const [key, value] of Object.entries(data.near_earth_objects)){
                console.log('This is your data', key, value) 
                if(value) {
                    for(const value1 of Object.values(value)){

                        // редачим имя
                        let name = ''
                        if(value1.name.substr(0,1)=="(") {
                            name = value1.name.substring(1);
                            if(value1.name.substr(value1.name.length-1)==")") name = name.substring(0, name.length-1);
                        }
                        else name = value1.name;
                        let meteor = {
                            "id":value1.id,
                            "date":new Date(value1.close_approach_data[0].close_approach_date).toLocaleDateString(),
                            'units':[Math.round(value1.close_approach_data[0].miss_distance.kilometers).toLocaleString('ru'), Math.round(value1.close_approach_data[0].miss_distance.lunar)],
                            "name":name,
                            "is_potentially_hazardous_asteroid": value1.is_potentially_hazardous_asteroid,
                            "absolute_magnitude_h": Math.round(value1.absolute_magnitude_h)                
                        }
                    startMeteors.push(meteor)
                    } 
                }
                setMeteors(startMeteors)
            } console.log("meteors", meteors)
        });
    }

    useEffect(() => {
        if(fetching)
            getData()
    }, [fetching])

    return (
        <div style={{color:'white'}}>
            <div>Ближайшие подлеты астероидов</div>
            <div style={{display:'flex'}}>
                <div onClick={() => setUnitsM(false)}> в километрах </div>
                <div onClick={() => setUnitsM(true)}>| в лунных орбитах</div>
            </div>
            {meteors.map(meteor => 
                <Meteor meteor={meteor} unitsM={unitsM}/>
            )}
        </div>
    )
}

export default GetMeteorsData;