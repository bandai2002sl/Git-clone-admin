import Form, { FormContext, Input } from "~/components/common/Form";
import { Fragment, useState } from "react";
import {
  setPermissionList,
  setStateLogin,
  setToken,
} from "~/redux/reducer/auth";

import Button from "~/components/common/Button";
import ImageFill from "~/components/common/ImageFill";
import Link from "next/link";
import Loading from "~/components/common/Loading";
import RequiredLogout from "~/components/protected/RequiredLogout";
import authSevices from "~/services/authSevices";
import clsx from "clsx";
import { httpRequest } from "~/services";
import { setInfoUser } from "~/redux/reducer/user";
import { store } from "~/redux/store";
import styles from "./Login.module.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    const res = await httpRequest({
      showMessageFailed: true,
      http: authSevices.login(form),
    });

    if (res) {
      store?.dispatch(setPermissionList(res?.permissionList || []));
      store?.dispatch(setToken(res?.access_token));
      store?.dispatch(setStateLogin(true));
      store?.dispatch(setInfoUser(res));
    }
  };

  return (
    <RequiredLogout>
      <div className={styles["container-auth"]}>
        <div className={clsx(styles.main, "effectShow")}>
          <div className={styles.form}>
            <h1 className={styles.title}>Chào mừng trở lại</h1>
            <p className={styles.note}>Đăng nhập để truy cập hệ thống.</p>
            <Form form={form} setForm={setForm} onSubmit={handleSubmit}>
              <Input
                bgGrey
                name="username"
                placeholder="Tài khoản đăng nhập"
                isRequired
              />
              <Input
                bgGrey
                name="password"
                type="password"
                placeholder="Mật khẩu"
                isRequired
              />
              {/* <Link
            className={clsx(styles.link, "link")}
            href={ROUTE_NAME.forgotPassword}
          >
            Quên mật khẩu?
          </Link> */}
              <FormContext.Consumer>
                {({ isDone }) => (
                  <div className={styles.btn}>
                    <Button disable={!isDone} primary bold rounded_8>
                      Đăng nhập
                    </Button>
                  </div>
                )}
              </FormContext.Consumer>
            </Form>
          </div>
        </div>
        <div
          className={styles.background}
          // style={{
          //   backgroundImage: `url(${background || backgrounds.login.src})`,
          // }}
        ></div>
      </div>
    </RequiredLogout>
  );
};

export default Login;
