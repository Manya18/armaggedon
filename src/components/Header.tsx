import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.body}>
      <h1 className={styles.name}>ARMAGEDDON 2023</h1>
      <div>OOO "Команда им. Б. Уиллиса".</div>
      <div>Взрываем астероиды с 1998 года</div>
      <img src="/earth.png" className={styles.image} />
    </div>
  );
};

export default Header;
