import { RootState } from "~/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PATH } from "~/constants/config";

interface IRequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth(props: IRequireAuthProps) {
  const { replace } = useRouter();

  const { loading } = useSelector((state: RootState) => state.site);
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isLogin && !loading) replace(PATH.LOGIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, loading]);

  if (isLogin && !loading) {
    return <>{props.children}</>;
  }

  return <></>;
}
