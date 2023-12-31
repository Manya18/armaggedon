import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import GetMeteorsData from "@/components/getMeteorsData";
import Header from "@/components/Header";
import Basket from "@/components/Basket";

import { asterodData } from "@/utils/types";

export default function Home() {
  const [dataM, setDataM] = useState();
  const [meteors, setMeteors] = useState<asterodData[]>([]);

  const handleData = (data: any) => {
    setDataM(data);
    meteors.push(data);
    setMeteors(meteors);
  };

  return (
    <div className={styles.body}>
      <Head>
        <title>Armaggedon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
      </div>
      <div className={styles.meteors}>
        <GetMeteorsData onData={handleData} />
      </div>
      <div className={styles.basket}>
        <Basket data={meteors} />
      </div>
    </div>
  );
}
