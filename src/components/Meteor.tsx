import { Button } from '@nextui-org/react';
import Image from 'next/image'
import { useEffect } from 'react';
import styles from './Meteor.module.css'

const Meteor = (props) => {

    return (
        < div className={styles.body} key={props.meteor.id}>
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
                    width={props.meteor.absolute_magnitude_h*2}
                    height={props.meteor.absolute_magnitude_h*2}
                />
                <div className={styles.column}>
                    <h3 className={styles.name}>{props.meteor.name}</h3>
                    <h4 className={styles.width}>Ø {props.meteor.absolute_magnitude_h} м</h4> 
                </div>
               
            </div> 
            <div className={styles.flex}>
                <Button className={styles.button}>Заказать</Button>
                {props.meteor.is_potentially_hazardous_asteroid &&<div className={styles.type}>⚠ Опасен</div>}
                </div>
        </div>
    )
}


export default Meteor;