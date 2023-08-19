import { PropsHeader } from "./interfaces";
import styles from "./Header.module.scss";

function Header({}: PropsHeader) {
  return <div className={styles.container}></div>;
}

export default Header;
