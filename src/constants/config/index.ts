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

  Administrativeunits = "/don-vi-hanh-chinh",
  Administrativeunitregion = "/don-vi-hanh-chinh/vung-don-vi-hanh-chinh",
  Administrativeunitroad = "/don-vi-hanh-chinh/duong-don-vi-hanh-chinh",

  Farming = "/trong-trot",
  Cooperative = "/trong-trot/hop-tac-xa",
  BusinessCategory = "/trong-trot/loai-kinh-doanh",
  BusinessEstablishment = "/trong-trot/co-so-kinh-doanh",
  DiseaseType = "/trong-trot/loai-benh",
  Crops = "/trong-trot/cay-trong",
  CultivationProduction = "/trong-trot/san-xuat-trong-trot",
  Hightechmodel = "/trong-trot/mo-hinh-cong-nghe-cao",
  Enterprise = "/trong-trot/doanh-nghiep",
  Link = "/trong-trot/lien-ket",
  Plantdisease = "/trong-trot/benh-cay",
  Formoflandconversion = "/trong-trot/hinh-thuc-chuyen-doi-dat",
  Landuseconversion = "/trong-trot/chuyen-doi-su-dung-dat",
  Drought = "/trong-trot/han-han",
  Processingfacilities = "/trong-trot/co-so-che-bien",

  Breed = "/chan-nuoi",
  Pet = "/chan-nuoi/vat-nuoi",
  Productionoflivestock = "/chan-nuoi/san-xuat-vat-nuoi",
  Formofanimalhusbandry = "/chan-nuoi/hinh-thuc-chan-nuoi",
  Livestockfacility = "/chan-nuoi/co-so-chan-nuoi",
  Safelivestockarea = "/chan-nuoi/vung-chan-nuoi-an-toan",
  Petdiseases = "/chan-nuoi/benh-vat-nuoi",
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
    title: "Đơn vị hành chính",
    group: [
      {
        title: "Vùng đơn vị hành chính",
        path: PATH.Administrativeunitregion,
      },
      {
        title: "Đường đơn vị hành chính",
        path: PATH.Administrativeunitroad,
      },
    ]
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
      {
        title: "Cơ sở kinh doanh",
        path: PATH.BusinessEstablishment,
      },
      {
        title: "Loại bệnh",
        path: PATH.DiseaseType,
      },
      {
        title: "Cây trồng",
        path: PATH.Crops,
      },
      {
        title: "Sản xuất trồng trọt",
        path: PATH.CultivationProduction,
      },
      {
        title: "Mô hình công nghệ cao",
        path: PATH.Hightechmodel,
      },
      {
        title: "Doanh nghiệp",
        path: PATH.Enterprise,
      },
      {
        title: "Liên kết",
        path: PATH.Link,
      },
      {
        title: "Bệnh cây",
        path: PATH.Plantdisease,
      },
      {
        title: "Hình thức chuyển đổi đất",
        path: PATH.Formoflandconversion,
      },
      {
        title: "Chuyển đổi đất sử dụng",
        path: PATH.Landuseconversion,
      },
      {
        title: "Hạn hán",
        path: PATH.Drought,
      },
      {
        title: "Cơ sở chế biến",
        path: PATH.Processingfacilities,
      },
    ],
  },
  {
    title: "Chăn nuôi",
    group: [
      {
        title: "Vật nuôi",
        path: PATH.Pet,
      },
      {
        title: "Sản xuất vật nuôi",
        path: PATH.Productionoflivestock,
      },
      {
        title: "Hình thức chăn nuôi",
        path: PATH.Formofanimalhusbandry,
      },
      {
        title: "Cơ sở chăn nuôi",
        path: PATH.Livestockfacility,
      },
      {
        title: "Vùng chăn nuôi an toàn",
        path: PATH.Safelivestockarea,
      },
      {
        title: "Bệnh vật nuôi",
        path: PATH.Petdiseases,
      },
    ]
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
