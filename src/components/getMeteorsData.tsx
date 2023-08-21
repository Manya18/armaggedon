import { useState, useEffect } from "react";
import Meteor from "./Meteor";
import {Button, Skeleton} from "@nextui-org/react";
import Image from 'next/image'
import styles from '../styles/GetMeteorsData.module.css'

interface asterodGen {
    id: number;
    date: string;
    units: number[];
    name: string;
    dangerous: boolean;
    size: number;
}

const GetMeteorsData = ({onData}) => {

    const [meteors, setMeteors] = useState<asterodGen[]>([]);
    const [chosen, setChosen] = useState<asterodGen[]>([]);

    const [current, setCurrent] = useState(new Date())
    const [unitsM, setUnitsM] = useState(false);
    const [currentDate, setCurrentDate] = useState(formatDate(current))
    const [fetching, setFetching] = useState(true);
    const apiToken = `w72K7LgVIHRXzd4b8VfGskoRL1FjgdQPPlhA5vGg`;
    const apiURL= `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=${apiToken}`;

    function formatDate(curDate) {
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
                            "dangerous": value1.is_potentially_hazardous_asteroid,
                            "size": Math.round((value1.estimated_diameter.meters.estimated_diameter_max - value1.estimated_diameter.meters.estimated_diameter_min)/2)                
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
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop+window.innerHeight)<200)
            setFetching(true)
    }

    return (
        <div>
            <h1 className={styles.title}>Ближайшие подлеты астероидов</h1>
            <div className={styles.flex}>
                <button className={styles.param1} onClick={() => setUnitsM(false)} autoFocus> в километрах </button>
                <button className={styles.param2} onClick={() => setUnitsM(true)}>| в лунных орбитах</button>
            </div>
            {meteors.map(meteor => 
            <div key={meteor.id} >
                <Meteor meteor={meteor} unitsM={unitsM}/>
                <div className={styles.flex}>
                    <Button className={styles.buttonOff} onClick={() => { onData(meteor); setChosen([...chosen, meteor])}}>ЗАКАЗАТЬ</Button>
                    {meteor.dangerous &&<div className={styles.type}>⚠ Опасен</div>}
                </div>
            </div>
            )}
        </div>
    )
}

export default GetMeteorsData;