import { PropsCheckPermission } from "./interfaces";
import { RootState } from "~/redux/store";
import styles from "./CheckPermission.module.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function CheckPermission({
  children,
  pageKey,
  permissionId,
}: PropsCheckPermission) {
  const { permissionList } = useSelector((state: RootState) => state.auth);

  const isDisplay: boolean = useMemo(
    () =>
      !!permissionList.find(
        (x) => x.permissionId == permissionId && x.pageKey == pageKey
      ),
    [pageKey, permissionId, permissionList]
  );
  return isDisplay ? children : null;
}

export default CheckPermission;
