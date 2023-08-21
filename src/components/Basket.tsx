import { Button } from '@nextui-org/react';
import styles from '../styles/Basket.module.css'
import Link from 'next/link';
import { useState } from 'react';

interface asterodGen {
    id: number;
    date: string;
    units: number[];
    name: string;
    dangerous: boolean;
    size: number;
}


const Basket = ({data}) => {
    let arr:string[]=[]
    console.log(data)
    for(let dat of data) {
        console.log(JSON.stringify(dat))
        arr.push(JSON.stringify(dat))
    }

    console.log(JSON.stringify(arr))
    return (
        <div className={styles.body}>
            <div>
                <h2 className={styles.h2}>Корзина</h2>
                <div>{data.length} астероида</div>
            </div>
            <Link href={{pathname:'/BasketPage', query: arr}}><Button className={styles.btn}>Отправить</Button></Link>
        </div>
    )
}

export default Basket;