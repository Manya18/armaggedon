import { Button } from '@nextui-org/react';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from './Meteor.module.css'
import Link from 'next/link';

const Meteor = (props) => {
    const [clickBtn, setClickBtn] = useState(false);
    let size = 0;
    if(props.meteor.size<50) size = 50;
    else if(props.meteor.size<100) size = 70;
    else size = 90

    return (
        <>{props.meteor.id ? < div className={styles.body} key={props.meteor.id}>
            <h1 className={styles.date} >{props.meteor.date}</h1>
            <div className={styles.data}>
                <div className={styles.column}>                    
                    {props.unitsM===false? 
                        <h4 className={styles.units}>{props.meteor.units[0]} km</h4>: 
                        <h4 className={styles.units}>{props.meteor.units[1]} лунных орбит</h4>}
                    <Image
                        src="/Arrow.png"
                        alt="Arrow"
                        className={styles.arrow}
                        width={90}
                        height={5}
                    />
                </div>
                <Image
                    src="/meteor.png"
                    alt="Meteorite"
                    className={styles.meteor}
                    width={size}
                    height={size}
                />
                <div className={styles.column}>
                    <Link href={{pathname:`/SingleMeteor/${props.meteor.id}`, query:props.id}}><h3 className={styles.name}>{props.meteor.name}</h3></Link>
                    <h4 className={styles.width}>Ø {props.meteor.size} м</h4> 
                </div>
               
            </div> 
            <div className={styles.flex}>
                {clickBtn?<Button className={styles.buttonOn}>В КОРЗИНЕ</Button>:<Button className={styles.buttonOff} onClick={() => {setClickBtn(true)}}>ЗАКАЗАТЬ</Button>}
                {props.meteor.is_potentially_hazardous_asteroid &&<div className={styles.type}>⚠ Опасен</div>}
                </div>
        </div>:<></>}
        </>
    )
}


export default Meteor;