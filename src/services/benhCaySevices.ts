import axiosClient from ".";

const benhCaySevices = {
  fetchDataFromDatabase(data: 
    { 
      "cropTypeId": number,
      "loaiBenhId": number,
      "administrativeUnitId": number,
      "diaChi": string,
      "moTa": string,
      "hinhAnh": string,
      "dienTich": number,
      "ngayGhiNhan": string
    }) {
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_ALL}/benh-cay`,
      data
    );
  },
};

export default benhCaySevices;

