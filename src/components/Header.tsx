import styles from "../styles/Header.module.css";
import React from 'react';

const Header = () => {
  return (
    <div className={styles.body}>
      <h1 className={styles.name}>ARMAGEDDON 2023</h1>
      <div>OOO &quot;Команда им. Б. Уиллиса&quot;.</div>
      <div>Взрываем астероиды с 1998 года</div>
      <img src="/earth.png" className={styles.image} />
    </div>
  );
};

export default Header;
