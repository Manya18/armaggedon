import { Button } from '@nextui-org/react';
import Image from 'next/image'
import { useEffect } from 'react';

const Meteor = (props) => {

    return (
        < div className="meteor" key={props.meteor.id} style={{width:'30vw', marginTop: '3vh'}}>
            <div className="date" style={{fontSize:'20px', fontWeight:'bold'}}>{props.meteor.date}</div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'column'}}>                    
                    {props.unitsM===false? 
                        <div className="units">{props.meteor.units[0]} km</div>: 
                        <div className="units">{props.meteor.units[1]} </div>}
                    <Image
                        src="/Arrow.png"
                        alt="Arrow"
                        className={"meteor"}
                        width={90}
                        height={5}
                    />
                    <Button>Заказать</Button>
                </div>
                <Image
                    src="/meteor.png"
                    alt="Meteorite"
                    className={"meteor"}
                    width={props.meteor.absolute_magnitude_h*2}
                    height={props.meteor.absolute_magnitude_h*2}
                />
                <div>
                    <div className="name" style={{textDecoration: 'underline'}}>{props.meteor.name}</div>
                    <div className="width">Ø {props.meteor.absolute_magnitude_h} м</div>
                    {props.meteor.is_potentially_hazardous_asteroid &&<div className="type">⚠ Опасен</div>}
                </div>
            </div>
        </div>
    )
}


export default Meteor;