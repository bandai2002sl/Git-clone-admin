import { PageKey, PermissionID } from "~/constants/config/enum";

export interface PropsCheckPermission {
  children: React.ReactNode;
  permissionId: PermissionID;
  pageKey: PageKey;
}
