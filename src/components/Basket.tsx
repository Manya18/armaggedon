import { Button } from "@nextui-org/react";
import styles from "../styles/Basket.module.css";
import Link from "next/link";

const Basket = ({ data }) => {
  let arr: string[] = [];
  console.log(data);
  for (let dat of data) {
    arr.push(JSON.stringify(dat));
  }

  return (
    <div className={styles.body}>
      <div>
        <h2 className={styles.h2}>Корзина</h2>
        <div>{data.length} астероида</div>
      </div>
      <Link href={{ pathname: "/BasketPage", query: arr }}>
        <Button className={styles.btn}>Отправить</Button>
      </Link>
    </div>
  );
};

export default Basket;
