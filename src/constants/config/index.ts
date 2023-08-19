import { AiFillHome } from "react-icons/ai";

export const MAXIMUM_FILE = 10; //MB

export const allowFiles = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export enum PATH {
  Home = "/",
  Login = "/login",
  Farming = "/trong-trot",
  Cooperative = "/trong-trot/hop-tac-xa",
  BusinessCategory = "/trong-trot/loai-kinh-doanh",
}

export interface Imenu {
  title: string;
  group?: Imenu[];
  path?: string;
  Icon?: any;
}

export const menu: Imenu[] = [
  {
    title: "Trang chủ",
    path: "/",
    Icon: AiFillHome,
  },
  {
    title: "Trồng trọt",
    group: [
      {
        title: "Hợp tác xã",
        path: PATH.Cooperative,
      },
      {
        title: "Loại kinh doanh",
        path: PATH.BusinessCategory,
      },
    ],
  },
];

export const Languagese = [
  {
    title: "Vietnamese",
    code: "vi",
  },
  {
    title: "China",
    code: "zh-CN",
  },
];
