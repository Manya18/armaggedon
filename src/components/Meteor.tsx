import Image from 'next/image'
import styles from '../styles/Meteor.module.css'
import Link from 'next/link';

const Meteor = (props) => {
    
    let sizeImg = 0;
    if(props.meteor.sizeImg<50) sizeImg = 50;
    else if(props.meteor.sizeImg<100) sizeImg = 70;
    else sizeImg = 90

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
                        width={100}
                        height={5}
                    />
                </div>
                <Image
                    src="/meteor.png"
                    alt="Meteorite"
                    className={styles.meteor}
                    width={sizeImg}
                    height={sizeImg}
                />
                <div className={styles.column}>
                    <Link href={{pathname:`/SingleMeteor/${props.meteor.id}`, query:props.id}}><h3 className={styles.name}>{props.meteor.name}</h3></Link>
                    <h4 className={styles.width}>Ø {props.meteor.size} м</h4> 
                </div>
               
            </div> 
        </div>
    )
}

export default Meteor;