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
    const [current, setCurrent] = useState(new Date())
    const [unitsM, setUnitsM] = useState(false);
    const [currentDate, setCurrentDate] = useState(formatDate(current))
    const[fetching, setFetching] = useState(true);
    console.log('as', current, currentDate);

    const apiToken = `w72K7LgVIHRXzd4b8VfGskoRL1FjgdQPPlhA5vGg`;
    console.log(currentDate)
    const apiURL= `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=${apiToken}`;

    function formatDate(curDate) {
        console.log('curDate',curDate)
        console.log('lalal', `${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`)
        return `${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`;
    }

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
                setMeteors([...meteors, ...startMeteors])
                setCurrent(new Date(current.setDate(current.getDate()+1)))
                setCurrentDate(formatDate(current))
            } console.log("meteors", meteors)
        })
        .finally(() => setFetching(false))
    }

    useEffect(() => {
        if(fetching)
            getData()
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    
      const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop+window.innerHeight)<100)
            setFetching(true)
    }

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