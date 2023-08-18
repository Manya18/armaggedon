import { Button } from '@nextui-org/react';
import styles from './Basket.module.css'
import Link from 'next/link';

const Basket = () => {
    return (
        <div className={styles.body}>
            <div>
                <h2 className={styles.h2}>Корзина</h2>
                <div>{} астероида</div>
            </div>
            <Link href='/BasketPage'><Button className={styles.btn}>Отправить</Button></Link>
        </div>
    )
}

export default Basket;