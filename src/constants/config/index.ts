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
  Login = "/auth/login",

  Administrativeunits = "/don-vi-hanh-chinh/don-vi-hanh-chinh",
  Administrativeunitregion = "/don-vi-hanh-chinh/vung-don-vi-hanh-chinh",
  Administrativeunitroad = "/don-vi-hanh-chinh/duong-don-vi-hanh-chinh",

  Farming = "/trong-trot",
  Seafood = "/thuy-san",
  Cooperative = "/trong-trot/hop-tac-xa",
  BusinessCategory = "/trong-trot/loai-kinh-doanh",
  BusinessEstablishment = "/trong-trot/co-so-kinh-doanh",
  DiseaseType = "/trong-trot/loai-benh",
  Crops = "/trong-trot/cay-trong",
  CultivationProduction = "/trong-trot/san-xuat-trong-trot",
  Hightechmodel = "/trong-trot/mo-hinh-cong-nghe-cao",
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

  //
  FishingVesselManagement = "/thuy-san/quan-ly-tau-ca",
  AquaticProductProduction = "/thuy-san/san-xuat-thuy-san",
  SeafoodBusinessEstablishments = "/thuy-san/co-so-kinh-doanh",

  Mechanization = "/pt-nong-thon/co-gioi-hoa",
  CraftVillageList = "/pt-nong-thon/danh-muc-lang-nghe",
  OcopProducts = "/pt-nong-thon/san-pham-ocop",

  PumpStation = "/pt-thuy-loi/tram-bom",
  Canal = "/pt-thuy-loi/kenh-muong",
  Reservoir = "/pt-thuy-loi/ho-chua",
  Drain = "/pt-thuy-loi/cong",
  IrrigatedArea = "/pt-thuy-loi/dien-tich-tuoi-tieu",

  ForestryData = "/lam-nghiep/du-lieu-lam-nghiep",
  GeneralInformation = "/lam-nghiep/thong-tin-chung",
  SlaughterHouse = "/ql-chat-luong/co-so-giet-mo",
  ProcessingFacilities = "/ql-chat-luong/co-so-che-bien",
}

export interface Imenu {
  title: string;
  group?: Imenu[];
  path?: string;
  Icon?: any;
  selected?: boolean;
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
        title: "Đơn vị hành chính",
        path: PATH.Administrativeunits,
      },
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
    title: "Quản lý trồng trọt",
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
  {
    title: "Quản lý thuỷ sản",
    group: [
      {
        title: "Cơ sở kinh doanh",
        path: PATH.SeafoodBusinessEstablishments,
      },
      {
        title: "Quản lý tàu cá",
        path: PATH.FishingVesselManagement,
      },
      {
        title: "Sản xuất thuỷ sản",
        path: PATH.AquaticProductProduction,
      },
    ]
  },
  {
    title: "Quản lý phát triển lâm nghiệp",
    group: [
      {
        title: "Thông tin chung",
        path: PATH.GeneralInformation,
      },
      {
        title: "Dữ liệu lâm nghiệp",
        path: PATH.ForestryData,
      },
    ]
  },
  {
    title: "Quản lý chất lượng thuỷ lợi",
    group:[
      {
        title: "Cống",
        path: PATH.Drain,
      },
      {
        title: "Hồ chứa",
        path: PATH.Reservoir,
      },
      {
        title: "Kênh mương",
        path: PATH.Canal,
      },
      {
        title: "Trạm bơm",
        path: PATH.PumpStation,
      },
      {
        title: "Diện tích tưới tiêu",
        path: PATH.IrrigatedArea,
      },
    ]
  },
  {
    title: "Quản lý phát triển nông thôn",
    group: [
      {
        title: "Cơ giới hoá",
        path: PATH.Mechanization,
      },
      {
        title: "Danh mục làng nghề",
        path: PATH.CraftVillageList,
      },
      {
        title: "Sản phẩm OCOP",
        path: PATH.OcopProducts,
      },
    ]
  },
  {
    title: "Quản lý chất lượng",
    group: [
      {
        title: "Cơ sở chế biến",
        path: PATH.ProcessingFacilities,
      },
      {
        title: "Cơ sở giết mổ",
        path: PATH.SlaughterHouse,
      },
      {
        title: "Cơ sở kinh doanh",
        path: PATH.BusinessEstablishment,
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
