import axiosClient from ".";

const chuyenDoiSuDungDatSevices = {
    displayChuyenDoiSuDungDat(data:
        {
            moTa: string,
            diaChi: string,
            dienTich: number,
            ngayChuyenDoi: string,
        }) {
        return axiosClient.get(
            `${process.env.NEXT_PUBLIC_API_ALL}/chuyen-doi-su-dung-dat`,
        );
    },
    getChuyenDoiSuDungDatId(id: number) {
        return axiosClient.get(`${process.env.NEXT_PUBLIC_API_ALL}/chuyen-doi-su-dung-dat/${id}`);
    },
    createChuyenDoiSuDungDat(newItem: any) {
        return axiosClient.post(`${process.env.NEXT_PUBLIC_API_ALL}/chuyen-doi-su-dung-dat`, newItem);
    },
    updateChuyenDoiSuDungDat(id: number, editedData: any) {
        return axiosClient.put(`${process.env.NEXT_PUBLIC_API_ALL}/chuyen-doi-su-dung-dat/${id}`, editedData);
    },

    deleteChuyenDoiSuDungDat(id: number) {
        return axiosClient.delete(`${process.env.NEXT_PUBLIC_API_ALL}/chuyen-doi-su-dung-dat/${id}`);
    },
};

export default chuyenDoiSuDungDatSevices;

