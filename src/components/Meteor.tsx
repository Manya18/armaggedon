import { Button } from '@nextui-org/react';
import Image from 'next/image'

const Meteor = (props) => {
    console.log('aaa', props.meteor, props.unitsM)
    return (
        <div className="meteor" key={props.meteor.id} style={{marginTop: '3vh'}}>
            <div className="date" style={{fontSize:'20px', fontWeight:'bold'}}>{props.meteor.close_approach_data[0].close_approach_date}</div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>                    
                    {props.unitsM===false? 
                        <div className="units">{props.meteor.close_approach_data[0].miss_distance.kilometers} km</div>: 
                        <div className="units">{props.meteor.close_approach_data[0].miss_distance.lunar} </div>}
                    <Image
                        src="/Arrow.png"
                        alt="Arrow"
                        className={"meteor"}
                        width={90}
                        height={5}
                    />
                </div>
                <Image
                    src="/meteor.png"
                    alt="Meteorite"
                    className={"meteor"}
                    width={props.meteor.absolute_magnitude_h*2}
                    height={props.meteor.absolute_magnitude_h*2}
                />
                <div>
                    <div className="title" style={{textDecoration: 'underline'}}>{props.meteor.name}</div>
                    <div className="width">Ø {props.meteor.absolute_magnitude_h} м</div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <Button>Заказать</Button>
                {props.meteor.is_potentially_hazardous_asteroid &&<div className="type">⚠ Опасен</div>}
            </div>
        </div>

    )
}


export default Meteor;