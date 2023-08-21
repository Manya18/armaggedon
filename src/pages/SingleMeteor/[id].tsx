import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from '@/styles/MeteorPage.module.css'
import Header from '@/components/Header';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

const SingleMeteor = () => {
    const router = useRouter()
    console.log(router.query);

    const [meteorData, setMeteorData] = useState({
        "id":0,
        "name": '',
        "diameter":0
    });
    const [approachArray, setApproachArray] = useState([{
        "date":'',
        'distance': '',
        'velocity': '',
        'orbita': ''
    }])

    async function getData(){
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${router.query.id}?api_key=w72K7LgVIHRXzd4b8VfGskoRL1FjgdQPPlhA5vGg`)
        .then((response) => response.json())
        .then((data) => {
            
            console.log("data", data)
            let meteor = {
                "id":data.id,
                "name": data.name,
                "diameter":Math.round(data.estimated_diameter.meters.estimated_diameter_min),
            } 
            setMeteorData(meteor);
            let app = []
            for(let tmp of data.close_approach_data) {
                let approach = {
                    "date": tmp.close_approach_date_full,
                    'distance': Math.round(tmp.miss_distance.kilometers).toLocaleString('ru'),
                    'velocity': Math.round(tmp.relative_velocity.kilometers_per_hour).toLocaleString('ru'),
                    'orbita': tmp.orbiting_body,
                }
                app.push(approach)
            }
            setApproachArray(app)
            console.log(approachArray)
           console.log(meteorData)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.body}>
            <div className={styles.flex}>
                <div className={styles.headerVisib}>
                    <Header />
                </div>
                <div className={styles.flex}>
                    <Image
                        src="/meteor.png"
                        alt="Meteorite"
                        width={150}
                        height={150}
                        className={styles.image}
                    />
                    <div className={styles.head}>
                        <h1>Метеорит {meteorData.name}</h1>
                        <h2>Ø {meteorData.diameter}</h2>
                    </div>
                </div>
            </div>
            <div className={styles.data}>
                <h1>Приближения метеорита:</h1>
                <ul>{approachArray.map(app => 
                    <li className={styles.li}>
                        <Table hideHeader>
                            <TableHeader>
                                <TableColumn> </TableColumn>
                                <TableColumn> </TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell><b>Дата максимального приближения: </b></TableCell>
                                    <TableCell>{app.date}</TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell><b>Расстояние до Земли:</b></TableCell>
                                    <TableCell>{app.distance} км</TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell><b>Скорость относительно Земли:</b></TableCell>
                                    <TableCell>{app.velocity} км/ч</TableCell>
                                </TableRow>
                                <TableRow key="4">
                                    <TableCell><b>По орбите вокруг</b></TableCell>
                                    <TableCell>{app.orbita}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </li>
                )}</ul>
            </div>
        </div>
    )
}

export default SingleMeteor;