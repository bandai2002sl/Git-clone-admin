import axiosClient from ".";

const benhCaySevices = {
  displayBenhCay(data:
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
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/benh-cay`);
  },
  getBenhCayId(id: number) {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/benh-cay/${id}`);
  },
  createBenhCay(newItem: any) {
    return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/benh-cay`, newItem);
  },
  updateBenhCay(id: number, editedData: any) {
    return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/benh-cay/${id}`, editedData);
  },

  deleteBenhCay(id: number) {
    return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/benh-cay/${id}`);
  },
};

export default benhCaySevices;

