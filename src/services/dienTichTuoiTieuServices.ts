import axiosClient from ".";

const dienTichTuoiTieuServices = {
    displayDienTichTuoiTieu(data:
        {
            "dienTich": number,
            "ngayThongKe": string,
            "hinhThuc": string,
            "administrativeUnitId": number,
            "cropTypeId": number
          }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu`,
        );
    },
    getDienTichTuoiTieuId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu/${id}`);
    },
    createDienTichTuoiTieu(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu`, newItem);
    },
    updateDienTichTuoiTieu(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu/${id}`, editedData);
    },

    deleteDienTichTuoiTieu(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/dien-tich-tuoi-tieu/${id}`);
    },
};

export default dienTichTuoiTieuServices;