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
  Seafood = "/thuy-san",
  Cooperative = "/trong-trot/hop-tac-xa",
  BusinessCategory = "/trong-trot/loai-kinh-doanh",
  Linked = "/trong-trot/lien-ket",
  treeDisease = "/trong-trot/benh-cay",
  crops = "/trong-trot/cay-trong",
  landUseConversion = "/trong-trot/chuyen-doi-su-dung-dat",
  businessEstablishment = "/trong-trot/co-so-kinh-doanh",
  drought = "/trong-trot/han-han",
  conversionForm = "/trong-trot/hinh-thuc-chuyen-doi",
  typeOfDisease = "/trong-trot/loai-benh",
  highTechModel = "/trong-trot/mo-hinh-cong-nghe-cao",
  cropProduction = "/trong-trot/san-xuat-trong-trot",
  fishingVesselManagement = "/thuy-san/quan-ly-tau-ca",
  aquaticProductProduction = "/thuy-san/san-xuat-thuy-san",
  seafoodBusinessEstablishments = "/thuy-san/co-so-kinh-doanh",
  mechanization = "/pt-nong-thon/co-gioi-hoa",
  craftVillageList = "/pt-nong-thon/danh-muc-lang-nghe",
  ocopProducts = "/pt-nong-thon/san-pham-ocop",
  pumpStation = "/pt-thuy-loi/tram-bom",
  canal = "/pt-thuy-loi/kenh-muong",
  reservoir = "/pt-thuy-loi/ho-chua",
  drain = "/pt-thuy-loi/cong",
  forestryData = "/lam-nghiep/du-lieu-lam-nghiep",
  irrigatedArea = "/pt-thuy-loi/dien-tich-tuoi-tieu",
  generalInformation = "/lam-nghiep/thong-tin-chung",
  units = "/don-vi-hanh-chinh/don-vi-hanh-chinh",
  unitRoad = "/don-vi-hanh-chinh/duong-don-vi-hanh-chinh",
  unitArea = "/don-vi-hanh-chinh/vung-don-vi-hanh-chinh",
  processingFacilities = "/trong-trot/co-so-che-bien",
  slaughterHouse = "/ql-chat-luong/co-so-giet-mo",
  livestockDiseases = "/chan-nuoi/benh-vat-nuoi",
  livestockFacility = "/chan-nuoi/co-so-chan-nuoi",
  formOfLivestockFarming = "/chan-nuoi/hinh-thuc-chan-nuoi",
  livestockProduction = "/chan-nuoi/san-xuat-vat-nuoi",
  livestock = "/chan-nuoi/vat-nuoi",
  safeFarmingArea = "/chan-nuoi/vung-chan-nuoi-an-toan"
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
        title: "Liên kết",
        path: PATH.Linked, 
      },
      {
        title: "Bệnh cây",
        path: PATH.treeDisease,
      },
      {
        title: "Cây trồng",
        path: PATH.crops,
      },
      {
        title: "Chuyển đổi sử dụng đất",
        path: PATH.landUseConversion,
      },
      {
        title: "Cơ sở kinh doanh",
        path: PATH.businessEstablishment,
      },
      {
        title: "Hạn hán",
        path: PATH.drought,
      },
      {
        title: "Hình thức chuyển đổi",
        path: PATH.conversionForm,
      },
      {
        title: "Loại bệnh",
        path: PATH.typeOfDisease,
      },
      {
        title: "Mô hình công nghệ cao",
        path: PATH.highTechModel,
      },
      {
        title: "Sản xuất trồng trọt",
        path: PATH.cropProduction,
      },
      {
        title: "Cơ sở chế biến",
        path: PATH.processingFacilities,
      },

    ],
  },
  {
    title: "Quản lý thuỷ sản",
    group: [
      {
        title: "Cơ sở kinh doanh",
        path: PATH.businessEstablishment,
      },
      {
        title: "Quản lý tàu cá",
        path: PATH.fishingVesselManagement,
      },
      {
        title: "Sản xuất thuỷ sản",
        path: PATH.aquaticProductProduction,
      },
    ]
  },

  {
    title: "Quản lý phát triển lâm nghiệp",
    group: [
      {
        title: "Thông tin chung",
        path: PATH.generalInformation,
      },
      {
        title: "Dữ liệu lâm nghiệp",
        path: PATH.forestryData,
      },
    ]
  },

    {
    title: "Quản lý chất lượng thuỷ lợi",
    group:[
      {
        title: "Cống",
        path: PATH.drain,
      },
      {
        title: "Hồ chứa",
        path: PATH.reservoir,
      },
      {
        title: "Kênh mương",
        path: PATH.canal,
      },
      {
        title: "Trạm bơm",
        path: PATH.pumpStation,
      },
      {
        title: "Diện tích tưới tiêu",
        path: PATH.irrigatedArea,
      },
    ]
  },
  {
    title: "Quản lý phát triển nông thôn",
    group: [
      {
        title: "Cơ giới hoá",
        path: PATH.mechanization,
      },
      {
        title: "Danh mục làng nghề",
        path: PATH.craftVillageList,
      },
      {
        title: "Sản phẩm OCOP",
        path: PATH.ocopProducts,
      },
    ]

  },
  {
    title: "Quản lý đơn vị hành chính",
    group: [
      {
        title: "Đơn vị hành chính",
        path: PATH.units,
      },
      {
        title: "Đường đơn vị hành chính",
        path: PATH.unitRoad,
      },
      {
        title: "Vùng đơn vị hành chính",
        path: PATH.unitArea,
      },
    ]
  },
  {
    title: "Quản lý chất lượng",
    group: [
      {
        title: "Cơ sở chế biến",
        path: PATH.processingFacilities,
      },
      {
        title: "Cơ sở giết mổ",
        path: PATH.slaughterHouse,
      },
      {
        title: "Cơ sở kinh doanh",
        path: PATH.businessEstablishment,
      },
    ]
  },
  {
    title: "Quản lý chăn nuôi",
    group: [
      {
        title: "Bệnh vật nuôi",
        path: PATH.livestockDiseases,
      },
      {
        title: "Cơ sở chăn nuôi",
        path: PATH.livestockFacility,
      },
      {
        title: "Hình thức chăn nuôi",
        path: PATH.formOfLivestockFarming,
      },
      {
        title: "Sản xuất vật nuôi",
        path: PATH.livestockProduction,
      },
      {
        title: "Vật nuôi",
        path: PATH.livestock,
      },
      {
        title: "Vùng chăn nuôi an toàn",
        path: PATH.safeFarmingArea,
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
