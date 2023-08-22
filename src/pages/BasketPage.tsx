import Header from "@/components/Header"
import Meteor from "@/components/Meteor";
import { useRouter } from "next/router";
import styles from "../styles/BasketPage.module.css"
import React from 'react';

const BasketPage = () => {
    let arrQuery = [];
    const router = useRouter()
    const query = Object.values(router.query);
    for(let i=0; i< query.length; i++) {
        arrQuery.push(JSON.parse(query[i]))
    }

    return (
        <div className={styles.body}>
            <Header/>
            <h1 className={styles.h1}>Заказ отправлен!</h1>
            <div className={styles.list}>
            {Object.values(router.query).map(q => 
                <div key={JSON.parse(q).id} className={styles.meteor}>
                    <Meteor meteor={JSON.parse(q)} unitsM={JSON.parse(q).is_potentially_hazardous_asteroids}/>
                    {JSON.parse(q).dangerous && <div className={styles.type}>⚠ Опасен</div>}
                </div>
            )}
            </div>
            <p className={styles.footer}>© Все права и планета защищены</p>
        </div>
    )
}

export default BasketPage;