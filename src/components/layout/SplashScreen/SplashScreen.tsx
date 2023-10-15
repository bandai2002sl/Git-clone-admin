import { Fragment, useEffect } from "react";
import { RootState, store } from "~/redux/store";
import { getItemStorage, setItemStorage } from "~/common/func/localStorage";
import {
  setPermissionList,
  setStateLogin,
  setToken,
} from "~/redux/reducer/auth";

import CryptoJS from "crypto-js";
import { PropsSplashScreen } from "./interfaces";
import clsx from "clsx";
import { setInfoUser } from "~/redux/reducer/user";
import { setLoading } from "~/redux/reducer/site";
import styles from "./SplashScreen.module.scss";
import { useSelector } from "react-redux";

function SplashScreen({}: PropsSplashScreen) {
  const { loading } = useSelector((state: RootState) => state.site);
  const { token, isLogin, permissionList } = useSelector(
    (state: RootState) => state.auth
  );
  const { infoUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      const state = await getItemStorage("map");
      if (!!state) {
        const bytes = CryptoJS.AES.decrypt(
          state,
          process.env.NEXT_PUBLIC_KEY_CERT!
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        store.dispatch(setToken(decryptedData.token));
        store.dispatch(setPermissionList(decryptedData.permissionList));
        store.dispatch(
          setInfoUser({
            ...decryptedData.infoUser,
          })
        );
        store.dispatch(setStateLogin(decryptedData.isLogin));
      }
      store.dispatch(setLoading(false));
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ciphertext = CryptoJS?.AES?.encrypt(
        JSON.stringify({
          token: token,
          isLogin: isLogin,
          infoUser: infoUser,
          permissionList: permissionList,
        }),
        process.env.NEXT_PUBLIC_KEY_CERT!
      ).toString();
      setItemStorage("map", ciphertext);
    }
  }, [token, isLogin, loading, infoUser]);

  return (
    <Fragment>
      <div className={clsx(styles.container, { [styles.close]: !loading })}>
        {/* <Logo className={styles.logo} /> */}
      </div>
    </Fragment>
  );
}

export default SplashScreen;
