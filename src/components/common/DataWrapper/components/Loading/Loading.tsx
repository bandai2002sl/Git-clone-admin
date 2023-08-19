import i18n from "~/locale/i18n";
import { PropsLoading } from "./interfaces";
import styles from "./Loading.module.scss";

function Loading({}: PropsLoading) {
  return (
    <div className={styles.container}>
      <div className={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 className={styles.text}>{i18n.t("Other.loading")} . . .</h3>
      <p>{i18n.t("Other.findData")}.</p>
    </div>
  );
}

export default Loading;
