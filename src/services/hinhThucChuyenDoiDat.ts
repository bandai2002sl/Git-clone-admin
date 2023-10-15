import axiosClient from ".";

const hinhThucChuyenDoiDatSevices = {
    displayHinhThucChuyenDoiDat(data:
        {
            tenHinhThuc: string,
            tamNgung: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chuyen-doi-dat`,
        );
    },
    getHinhThucChuyenDoiDatId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chuyen-doi-dat/${id}`);
    },
    createHinhThucChuyenDoiDat(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chuyen-doi-dat`, newItem);
    },
    updateHinhThucChuyenDoiDat(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chuyen-doi-dat/${id}`, editedData);
    },

    deleteHinhThucChuyenDoiDat(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/hinh-thuc-chuyen-doi-dat/${id}`);
    },
};

export default hinhThucChuyenDoiDatSevices;

