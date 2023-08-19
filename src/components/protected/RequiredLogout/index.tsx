//**********************
//* COMPONENT PROTECTED SCREEN THEN LOGIN
//**********************

import React, { useEffect } from "react";

import { RootState } from "~/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PATH } from "~/constants/config";

interface props {
  children: React.ReactNode;
}

function RequiredLogout({ children }: props) {
  const { replace } = useRouter();
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.site);

  useEffect(() => {
    if (isLogin && !loading) replace(PATH.HOME);
  }, [isLogin, loading, replace]);

  if (!isLogin && !loading) {
    return <>{children}</>;
  }

  return <div className="loading-page"></div>;
}

export default RequiredLogout;
